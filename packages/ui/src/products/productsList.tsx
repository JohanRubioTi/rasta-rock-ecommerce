import { Button, H3, Input, Paragraph, Spinner, Section, XStack, YStack } from '@t4/ui'
import { ProductListItem } from '@t4/ui/src/products/productListItem'
import { LinearGradient } from '@tamagui/linear-gradient'
import { trpc } from 'app/utils/trpc'
import { empty, error, loading, success } from 'app/utils/trpc/patterns'
import React, { useState } from 'react'
import { Select } from 'tamagui' // or '@tamagui/select'
import { match } from 'ts-pattern'

export const CategorytListItem = ({ key, category }): React.ReactNode => {
  return (
    <Select.Item value={category.id}>
      <Select.ItemText>{category.name}</Select.ItemText>
    </Select.Item>
  )
}

export const ProductsList = (): React.ReactNode => {
  const [category, setCategory] = useState<string | undefined>()
  const [minPrice, setMinPrice] = useState<number | undefined>()
  const [maxPrice, setMaxPrice] = useState<number | undefined>()
  const [sortBy, setSortBy] = useState<'price' | 'name' | 'stock_quantity' | undefined>('price')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

  const categoryList = trpc.product.categories.useQuery()

  // Query products with filters using trpc.product.filter
  const productsList = trpc.product.filter.useQuery({
    category,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
  })

  const productsListLayout = match(productsList)
    .with(error, () => <Paragraph>Error loading products</Paragraph>)
    .with(loading, () => (
      <YStack jc='center' ai='center'>
        <Paragraph>Loading...</Paragraph>
        <Spinner />
      </YStack>
    ))
    .with(empty, () => <Paragraph>No products found.</Paragraph>)
    .with(success, () =>
      productsList.data.map((product) => <ProductListItem key={product.id} product={product} />)
    )
    .otherwise(() => <Paragraph>Error loading products</Paragraph>)

  const categoryListLayout = match(categoryList)
    .with(error, () => <Paragraph>Error loading categories</Paragraph>)
    .with(loading, () => (
      <YStack jc='center' ai='center'>
        <Paragraph>Loading...</Paragraph>
        <Spinner />
      </YStack>
    ))
    .with(empty, () => <Paragraph>No categories found.</Paragraph>)
    .with(success, () =>
      categoryList.data.map((category) => (
        <CategorytListItem key={category.id} category={category} />
      ))
    )
    .otherwise(() => <Paragraph>Error loading categories</Paragraph>)

  return (
    <YStack minHeight='100vh' space ai='start' borderRadius='$10'>
      <Section id='store'>
        <YStack mx='$6' flex={0.2} space='$2'>
          {/* Category Select */}
          <XStack space='$3' jc='start' ai='center' maxWidth='fit-content' flex={1}>
            <Select defaultValue='' onValueChange={(value) => setCategory(value || undefined)}>
              <Select.Trigger bc='#E53935' maxWidth='fit-content'>
                <Select.Value placeholder='Categorías' />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Categories</Select.Label>
                    {categoryListLayout}
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>

            {/* Sort Order Select */}
            <Select
              defaultValue='asc'
              onValueChange={(value) => setSortOrder(value as 'asc' | 'desc')}
            >
              <Select.Trigger bc='#FF8C00' maxWidth='fit-content'>
                <Select.Value placeholder='Orden' />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Order</Select.Label>
                    <Select.Item value='asc'>
                      <Select.ItemText>Ascending</Select.ItemText>
                    </Select.Item>
                    <Select.Item value='desc'>
                      <Select.ItemText>Descending</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>

            <Select
              maxWidth='fit-content'
              defaultValue='price'
              onValueChange={(value) => setSortBy(value as 'price' | 'name' | 'stock_quantity')}
            >
              <Select.Trigger bc='#31CD32' maxWidth='fit-content'>
                <Select.Value placeholder='Sort By' />
              </Select.Trigger>
              <Select.Content>
                <Select.ScrollUpButton />
                <Select.Viewport>
                  <Select.Group>
                    <Select.Label>Sort By</Select.Label>
                    <Select.Item value='price'>
                      <Select.ItemText>Price</Select.ItemText>
                    </Select.Item>
                    <Select.Item value='name'>
                      <Select.ItemText>Name</Select.ItemText>
                    </Select.Item>
                    <Select.Item value='stock_quantity'>
                      <Select.ItemText>Stock Quantity</Select.ItemText>
                    </Select.Item>
                  </Select.Group>
                </Select.Viewport>
                <Select.ScrollDownButton />
              </Select.Content>
            </Select>

            {/* Min and Max Price Inputs */}
            <Input
              maxWidth='$12'
              placeholder='Min Price'
              keyboardType='numeric'
              onChangeText={(text) => setMinPrice(Number.parseFloat(text) || undefined)}
            />
            <Input
              width='$12'
              placeholder='Max Price'
              keyboardType='numeric'
              onChangeText={(text) => setMaxPrice(Number.parseFloat(text) || undefined)}
            />
          </XStack>
          <XStack
            space
            flexWrap='wrap' // Allows wrapping of cards
          >
            {productsListLayout}
          </XStack>
        </YStack>
      </Section>
    </YStack>
  )
}
