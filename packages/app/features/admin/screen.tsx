import React, { useEffect, useState } from 'react'
import {
  AnimatePresence,
  ScrollView,
  Section,
  Spinner,
  YStack,
  ZStack,
  Button,
  Card,
  H5,
  Heading,
  Paragraph,
  SizableText,
  Separator,
  Sheet,
  styled,
  Tab,
  Tabs,
  VirtualList,
  XStack,
} from '@t4/ui'
import { LinearGradient } from '@tamagui/linear-gradient'
import {
  Navbar,
  HeroBanner,
  HeroBackground,
  ProductListItem,
  FloatingVideo,
  Loading,
  CartListItem,
} from '@t4/ui/src'
import { Scene } from '@t4/ui/src/r3f'
import { Settings } from '@t4/ui/src/profile/settings'
import { Cog, PackageCheck, PackageSearch, Truck, X } from '@tamagui/lucide-icons'
import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'
import { useQueryClient } from 'react-query'
import { trpc } from 'app/utils/trpc'
import { match } from 'ts-pattern'
import { addToCartAtom, cartAtom, cartTotalAtom, removeFromCartAtom } from '../../../app/atoms/cart'

export function AdminScreen() {
  // Listen to scroll events to update scrollY
  return (
    <YStack>
      <TabsAdvancedBackground />
    </YStack>
  )
}

export const ProductManagement = (): React.ReactElement => {
  const [isAdding, setIsAdding] = useState(false)
  const [newProduct, setNewProduct] = useState<any>({
    name: '',
    description: '',
    price: '',
    category: '',
    imageUrl: '',
    stockQuantity: 1,
    isActive: true,
  })

  const productsQuery = trpc.product.all.useQuery()
  const categoriesQuery = trpc.product.categories.useQuery()

  const createProductMutation = trpc.product.create.useMutation({
    onSuccess: () => {
      productsQuery.refetch()
      setIsAdding(false)
    },
  })

  const updateProductMutation = trpc.product.updateProduct.useMutation({
    onSuccess: () => productsQuery.refetch(),
  })

  const deleteProductMutation = trpc.product.deleteProduct.useMutation({
    onSuccess: () => productsQuery.refetch(),
  })

  const handleCreateProduct = () => {
    createProductMutation.mutate(newProduct)
  }

  const handleUpdateProduct = (product) => {
    updateProductMutation.mutate(product)
  }

  const handleDeleteProduct = (productId) => {
    deleteProductMutation.mutate({ id: productId })
  }

  const productsLayout = match(productsQuery)
    .with({ status: 'loading' }, () => (
      <YStack>
        <Spinner />
        <Paragraph>Loading Products...</Paragraph>
      </YStack>
    ))
    .with({ status: 'error' }, () => <Paragraph>Error loading products</Paragraph>)
    .with({ status: 'success' }, () => (
      <>
        {productsQuery.data.map((product) => (
          <Card key={product.id} padding='$3' marginBottom='$2'>
            <ProductListItem
              product={product}
              onEdit={() => handleUpdateProduct(product)}
              onDelete={() => handleDeleteProduct(product.id)}
            />
          </Card>
        ))}
      </>
    ))
    .otherwise(() => <Paragraph>Unexpected state</Paragraph>)

  return (
    <YStack padding='$4' space='$4'>
      <Button onPress={() => setIsAdding(!isAdding)}>Add New Product</Button>

      {isAdding && (
        <Card padding='$4' bordered>
          <Input
            placeholder='Name'
            value={newProduct.name}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, name: text }))}
          />
          <Input
            placeholder='Description'
            value={newProduct.description}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, description: text }))}
          />
          <Input
            placeholder='Price'
            value={newProduct.price}
            keyboardType='numeric'
            onChangeText={(text) =>
              setNewProduct((prev) => ({ ...prev, price: Number.parseFloat(text) }))
            }
          />
          {/* Category Select */}
          <Input
            placeholder='Category'
            value={newProduct.category}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, category: text }))}
          />
          <Input
            placeholder='Image URL'
            value={newProduct.imageUrl}
            onChangeText={(text) => setNewProduct((prev) => ({ ...prev, imageUrl: text }))}
          />
          <Button onPress={handleCreateProduct}>Save Product</Button>
        </Card>
      )}

      <YStack>
        <Paragraph fontSize='$6' fontWeight='bold'>
          Product List
        </Paragraph>
        {productsLayout}
      </YStack>
    </YStack>
  )
}

const TabsAdvancedBackground = () => {
  const [tabState, setTabState] = React.useState<{
    currentTab: string
    /**
     * Layout of the Tab user might intend to select (hovering / focusing)
     */
    intentAt: TabLayout | null
    /**
     * Layout of the Tab user selected
     */
    activeAt: TabLayout | null
    /**
     * Used to get the direction of activation for animating the active indicator
     */
    prevActiveAt: TabLayout | null
  }>({
    activeAt: null,
    currentTab: 'products',
    intentAt: null,
    prevActiveAt: null,
  })

  const setCurrentTab = (currentTab: string) => setTabState({ ...tabState, currentTab })
  const setIntentIndicator = (intentAt) => setTabState({ ...tabState, intentAt })
  const setActiveIndicator = (activeAt) =>
    setTabState({ ...tabState, prevActiveAt: tabState.activeAt, activeAt })
  const { activeAt, intentAt, prevActiveAt, currentTab } = tabState

  // 1 = right, 0 = nowhere, -1 = left
  const direction = (() => {
    if (!activeAt || !prevActiveAt || activeAt.x === prevActiveAt.x) {
      return 0
    }
    return activeAt.y > prevActiveAt.y ? -1 : 1
  })()

  const handleOnInteraction: TabsTabProps['onInteraction'] = (type, layout) => {
    if (type === 'select') {
      setActiveIndicator(layout)
    } else {
      setIntentIndicator(layout)
    }
  }

  return (
    <Tabs
      value={currentTab}
      onValueChange={setCurrentTab}
      orientation='vertical'
      size='$4'
      padding='$2'
      height={150}
      flexDirection='row'
      activationMode='manual'
      backgroundColor='$background'
      position='relative'
    >
      <AnimatePresence>
        {intentAt && (
          <TabsRovingIndicator
            borderRadius='$2'
            width={intentAt.width}
            height={intentAt.height}
            x={intentAt.x}
            y={intentAt.y}
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {activeAt && (
          <TabsRovingIndicator
            borderRadius='$2'
            theme='active'
            width={activeAt.width}
            height={activeAt.height}
            x={activeAt.x}
            y={activeAt.y}
          />
        )}
      </AnimatePresence>

      <Tabs.List
        disablePassBorderRadius
        loop={false}
        aria-label='Manage your account'
        gap='$1'
        backgroundColor='transparent'
      >
        <Tabs.Tab
          unstyled
          jc='space-between'
          paddingVertical='$2'
          paddingHorizontal='$3'
          value='products'
          onInteraction={handleOnInteraction}
          space
        >
          <PackageSearch />
          <SizableText>Productos</SizableText>
        </Tabs.Tab>
        <Tabs.Tab
          unstyled
          jc='space-between'
          paddingVertical='$2'
          paddingHorizontal='$3'
          value='categories'
          onInteraction={handleOnInteraction}
        >
          <PackageCheck />
          <SizableText>Categorías</SizableText>
        </Tabs.Tab>
        <Tabs.Tab
          unstyled
          jc='space-between'
          paddingVertical='$2'
          paddingHorizontal='$3'
          value='tab3'
          onInteraction={handleOnInteraction}
        >
          <Truck />
          <SizableText>Reembolsos</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content value={currentTab} forceMount flex={1} justifyContent='center'>
            <H5 textAlign='center'>{currentTab}</H5>
            {currentTab === 'products' && <ProductManagement />}
          </Tabs.Content>
        </AnimatedYStack>
      </AnimatePresence>
    </Tabs>
  )
}

const TabsRovingIndicator = ({ active, ...props }: { active?: boolean } & StackProps) => {
  return (
    <YStack
      position='absolute'
      backgroundColor='$color5'
      opacity={0.7}
      animation='quick'
      enterStyle={{
        opacity: 0,
      }}
      exitStyle={{
        opacity: 0,
      }}
      {...(active && {
        backgroundColor: '$color8',
        opacity: 0.6,
      })}
      {...props}
    />
  )
}

const AnimatedYStack = styled(YStack, {
  flex: 1,
  x: 0,
  opacity: 1,

  animation: 'quick',
  variants: {
    // 1 = right, 0 = nowhere, -1 = left
    direction: {
      ':number': (direction) => ({
        enterStyle: {
          y: direction > 0 ? -25 : 25,
          opacity: 0,
        },
        exitStyle: {
          zIndex: 0,
          y: direction < 0 ? -25 : 25,
          opacity: 0,
        },
      }),
    },
  } as const,
})
