import { Button, Heading, ListItem, Nav, Paragraph, XGroup, XStack } from '@t4/ui'
import { useState, useEffect } from 'react'

import { LinearGradient } from '@tamagui/linear-gradient'

import { ThemeToggle } from '@t4/ui/src/ThemeToggle'
import { Cart } from '@t4/ui/src/cart/cartButton'
import { Heart, ShoppingBag, User } from '@tamagui/lucide-icons'
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
      bc='rgba(0,0,0,0.05)' // Background color with transparency
      br='$8'
      m='$2'
      position='relative'
      f='1'
      jc='space-between' // Justify content to space between
      flexDirection='row' // Horizontal layout
      borderWidth='0.5px'
      borderColor='$color'
      style={{
        backdropFilter: 'blur(8px)', // Apply the blur effect
        WebkitBackdropFilter: 'blur(16px)', // Safari support
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Subtle shadow for visibility
      }}
    >
      <NavigationMenu />

      {/*

      <XStack flex='1'
        zIndex='15'
      >
        <Logo />
      </XStack>


      Wrap Logo in an absolute-positioned container */}

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

const NavigationMenu = () => {
  const [selected, setSelected] = useState('/') // Initial selection state

  // Define links
  const homeLink = useLink({ href: '/' })
  const storeLink = useLink({ href: '#store' })
  const videosLink = useLink({ href: '/videos' })
  const aboutUsLink = useLink({ href: '/about-us' })

  return (
    <XStack br='0' pl='$5' jc='flex-start' alignItems='center'>
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
      f={1}
      hoverStyle={{
        opacity: 0.9,
      }}
      pressStyle={{
        opacity: 0.8,
      }}
    >
      <XStack f={1} alignItems='center' position='relative'>
        {/* Text */}
        <Heading size='$1'>{children}</Heading>

        {/* Rasta Gradient Underline */}
        {mounted && (
          <XStack
            position='absolute'
            bottom={-2}
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
      </XStack>
    </ListItem>
  )
}

const RastaGradient = () => (
  <LinearGradient
    start={[0, 0]}
    end={[1, 1]}
    colors={['#ff0000', '#ffdd00', '#008000']} // Red, Yellow, Green for Rasta
    h='$0.5'
    w='100%'
    br='$2'
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
    <XStack as='end' jc='center' ai='center' space='$1.5' pr='$5'>
      <Button
        {...(user ? { ...profileLink } : { ...signUpLink })}
        bc='rgba(0,0,0,0.3)'
        icon={User}
        size='$2'
        br='$5'
        hoverTheme
      />
      <Cart bc='rgba(0,0,0,0.3)' icon={ShoppingBag} size='$2' br='$5' hoverTheme />
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
