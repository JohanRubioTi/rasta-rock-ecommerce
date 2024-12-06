import { useEffect, useState } from 'react'
import { ScrollView, Section, YStack, ZStack } from '@t4/ui'
import { LinearGradient } from '@tamagui/linear-gradient'

import { Navbar } from '@t4/ui/src/layout/navbar/navbar'
import { HeroBanner } from '@t4/ui/src/hero/heroBanner'
import { HeroBackground } from '@t4/ui/src/hero/heroBackground'
import { ProductsList } from '@t4/ui/src/products/productsList'
import { FloatingVideo } from '@t4/ui/src/video/FloatingVideo'

import { Scene } from '@t4/ui/src/r3f'
import { Loading } from '@t4/ui/src/Loading'

export function HomeScreen() {

  // Listen to scroll events to update scrollY
  return (
    <ZStack minHeight='200vh' flex={1}>
      {/* Background Layer */}
      <YStack position='absolute' zIndex={-1} width='100%' height='200vh'>
        <HeroBackground />
      </YStack>

      {/* Scrollable Content */}
      <ScrollView minHeight='200vh' mt='6vh' zIndex={1} flex={1}>
        {/* Hero Section */}
        <YStack>
          <HeroBanner />
        </YStack>

        {/* Products Section */}
        <YStack minHeight='100vh' space='$6'>
          <Section id='store'>
            <ProductsList />
          </Section>
        </YStack>
      </ScrollView>

      {/* Sticky Navbar */}
      <YStack position='sticky' top={0} zIndex={10} width='100%'>
        <Navbar />
      </YStack>

      {/* Floating Video */}
      <FloatingVideo />
      <LinearGradient
        start={[0, 0]}
        end={[0, 1]}
        colors={['#E53935', '#FF8C00', '#FFD700', '#32CD32', '$background']}
        locations={[0, 0.65, 0.75, 0.85, 0.95]}
        f={1}
        position='absolute'
        top='0'
        height='100vh'
        width='100vw'
        zIndex={-2}
      />
    </ZStack>
  )
}
