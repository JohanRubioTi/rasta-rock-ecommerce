import { Button, Heading, Input, ListItem, Nav, Paragraph, XGroup, XStack } from '@t4/ui'
import { useState, useEffect } from 'react'

import { LinearGradient } from '@tamagui/linear-gradient'

import { ThemeToggle } from '@t4/ui/src/ThemeToggle'
import { Cart } from '@t4/ui/src/cart/cartButton'
import { Heart, ShoppingCart, User, Search } from '@tamagui/lucide-icons'
import { StyleSheet } from 'react-native'
import { SolitoImage } from 'solito/image'
import { useLink } from 'solito/link'

import { View } from '@react-three/drei'
import { Center, Text3D } from '@react-three/drei'

import { Common } from '@t4/ui/src/r3f'
import { RastaShaderMaterial } from '@t4/ui/src/r3f'

import { useUser } from 'app/utils/auth/useUser'

export function Navbar() {
  return (
    <Nav
      br='$12'
      position='sticky'
      top='0'
      jc='space-between'
      fd='row'
      ai='center'
      height='$8'
      $xs={{ height: '$6', padding: '$2', bc: 'rgba(0,0,0,0.3)' }}
      $gtXs={{ height: '$6', padding: '$2', bc: 'rgba(0,0,0,0.3)' }}
      $sm={{ height: '$6', padding: '$2', bc: 'rgba(0,0,0,0.3)' }}
      $md={{ height: '$7', padding: '$3', bc: 'rgba(0,0,0,0.3)' }}
      $lg={{ height: '$8', padding: '$4', bc: 'rgba(0,0,0,0.3)' }}
      $gtLg={{ height: '$8', padding: '$4', bc: 'rgba(0,0,0,0.3)' }}
      $xl={{ height: '$8', padding: '$4' }}
      $xxl={{ height: '$8', padding: '$4' }}
      borderWidth='$0.5'
      borderColor='$gray4'
      style={{
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(16px)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
      zIndex='10'
    >
      <XStack zIndex='15'>
        <Logo />
      </XStack>

      <NavigationMenu
        position='relative'
        top='0'
        left='0'
        right='0'
        bottom='0'
        $xs={{ display: 'none' }}
        $sm={{ display: 'none' }}
        $md={{ display: 'flex' }}
        ai='center'
        jc='center'
      />

      {/* 
        <SearchBar
          $xs={{ display: 'none' }}
          $sm={{ display: 'none' }}
          $md={{ width: '50%' }}
          $lg={{ width: '60%', justifyContent: 'center' }}
        />
        */}
      <UserMenu />
    </Nav>
  )
}

const Logo = () => {
  return (
    <View style={styles.view}>
      <Center>
        <Text3D scale={3.5} position={[0, 0, 0.1]} font={'fonts/Reggae_One/ReggaeOne_Regular.json'}>
          Rasta Rock
          <primitive object={RastaShaderMaterial} attach='material' />
        </Text3D>
        <Text3D
          scale={3.5}
          position={[-0.6, 0, 0]}
          font={'fonts/Reggae_One/ReggaeOne_Regular.json'}
          size={1.05}
        >
          Rasta Rock
          <meshBasicMaterial color='#FFFFFF' />
        </Text3D>
      </Center>
    </View>
  )
}
/*
 */

const NavigationMenu = (props) => {
  const [selected, setSelected] = useState('/') // Initial selection state

  // Define links
  const homeLink = useLink({ href: '/' })
  const storeLink = useLink({ href: '#store' })
  const videosLink = useLink({ href: '/videos' })
  const aboutUsLink = useLink({ href: '/about-us' })

  return (
    <XStack {...props}>
      <NavItem linkProps={homeLink} isSelected={selected === '/'} onClick={() => setSelected('/')}>
        Inicio
      </NavItem>
      <NavItem
        linkProps={storeLink}
        isSelected={selected === '#store'}
        onClick={() => setSelected('#store')}
      >
        Tienda
      </NavItem>
      <NavItem
        linkProps={videosLink}
        isSelected={selected === '/videos'}
        onClick={() => setSelected('/videos')}
      >
        Videos
      </NavItem>
      <NavItem
        linkProps={aboutUsLink}
        isSelected={selected === '/about-us'}
        onClick={() => setSelected('/about-us')}
      >
        Sobre Nosotros
      </NavItem>
    </XStack>
  )
}

const NavItem = ({ linkProps, children, isSelected, onClick }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <ListItem
      {...linkProps}
      onPress={() => {
        onClick() // Update selected state on click
        linkProps.onPress?.() // Call Solito's `onPress` if available, for navigation
      }} // Call `onClick` to update selected state
      bc='transparent'
      maxWidth='fit-content'
      hoverStyle={{
        opacity: 0.9,
      }}
      pressStyle={{
        opacity: 0.8,
      }}
    >
      <XStack alignItems='center' position='relative'>
        {/* Text */}
        {/* Rasta Gradient Underline */}
        {mounted && (
          <XStack
            position='absolute'
            zIndex={-1}
            ai='center'
            jc='center'
            width='100%'
            backgroundColor='transparent'
            opacity={isSelected ? 1 : 0} // Show the underline if selected
            scaleX={isSelected ? 1 : 0} // Scale underline in/out on selection
            pressStyle={{
              opacity: 1,
              scaleX: 0.5, // Slightly reduce scale on press
            }}
            animation='bouncy'
          >
            <RastaGradient />
          </XStack>
        )}
        <Heading p='$3' size='$4'>
          {children}
        </Heading>
      </XStack>
    </ListItem>
  )
}

const RastaGradient = () => (
  <LinearGradient
    start={[0, 0]}
    end={[1, 1]}
    colors={['#ff0000', '#ffdd00', '#008000']} // Red, Yellow, Green for Rasta
    position='absolute'
    top='$2.5'
    h='$0.5'
    minWidth='80%'
    br='$4'
  />
)

const UserMenu = () => {
  const { user } = useUser()
  const profileLink = useLink({
    href: '/profile',
  })

  const signUpLink = useLink({
    href: '/sign-up',
  })
  const cartLink = useLink({
    href: '/cart',
  })

  return (
    <XStack jc='center' ai='center' pr='$5'>
      <Cart
        bc='black'
        color='white'
        opacity={0.65}
        icon={<ShoppingCart size='$1.5' />}
        br='$12'
        hoverTheme
      />
    </XStack>
  )
}

const SearchBar = (props) => {
  return (
    <XStack {...props}>
      <Input
        placeholder='Buscar...'
        focusStyle={{
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
        }}
        icon={<Search />}
      />
    </XStack>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
})
