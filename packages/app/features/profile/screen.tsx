import {
  AnimatePresence,
  Button,
  Card,
  H5,
  Heading,
  Paragraph,
  ScrollView,
  SizableText,
  Separator,
  Sheet,
  styled,
  Tab,
  Tabs,
  VirtualList,
  XStack,
  YStack,
} from '@t4/ui'
import { Cog, PackageCheck, PackageSearch, Truck, X } from '@tamagui/lucide-icons'

import { CartListItem } from '@t4/ui/src/cart/cartListItem'
import { Settings } from '@t4/ui/src/profile/settings.tsx'
import { atom, useAtom } from 'jotai'
import { useAtomValue, useSetAtom } from 'jotai'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'

import { addToCartAtom, cartAtom, cartTotalAtom, removeFromCartAtom } from '../../../app/atoms/cart'

export const ProfileScreen = (props): React.ReactNode => {
  const homeScreenLink = useLink({
    href: '/',
  })

  return (
    <YStack f={1} ai='center' jc='center' p='$6' space>
      <Button {...homeScreenLink} size='$6' alignSelf='end' br={35} mr='$8' circular icon={X} />
      <Card elevate bordered animation='bouncy' jc='center' ai='center' width='50%' p='$6' pt='$3'>
        <Settings
          size='$3'
          alignSelf='end'
          circular
          icon={Cog}
          onPress={() => {
            setOpenSettings(true)
          }}
        />
        <SolitoImage src='/t4-logo.png' alig width={128} height={128} alt='T4 Logo' />

        <YStack f={1} width="100%" p="$1">
          <Heading pb='$2'>Mis Órdenes</Heading>
          <Separator />
          <TabsAdvancedBackground />
        </YStack>
      </Card>

      <ScrollView flex='1' w='90%' />
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
    currentTab: 'tab1',
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
          value='tab1'
          onInteraction={handleOnInteraction}
          space
        >
          <PackageSearch />
          <SizableText>Pendiente</SizableText>

        </Tabs.Tab>
        <Tabs.Tab
          unstyled
          jc='space-between'
          paddingVertical='$2'
          paddingHorizontal='$3'
          value='tab2'
          onInteraction={handleOnInteraction}
        >
          <PackageCheck />
          <SizableText>Procesando</SizableText>
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
          <SizableText>Enviado</SizableText>
        </Tabs.Tab>
      </Tabs.List>

      <AnimatePresence exitBeforeEnter custom={{ direction }} initial={false}>
        <AnimatedYStack key={currentTab}>
          <Tabs.Content value={currentTab} forceMount flex={1} justifyContent='center'>
            <H5 textAlign='center'>{currentTab}</H5>
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
