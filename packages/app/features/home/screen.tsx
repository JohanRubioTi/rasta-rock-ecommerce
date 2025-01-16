import { useEffect, useState, useMemo } from 'react'
import { ScrollView, YStack, ZStack } from '@t4/ui'
import { Text } from 'react-native'

import { Navbar } from '@t4/ui/src/layout/navbar/navbar'
import { HeroBanner } from '@t4/ui/src/hero/heroBanner'
import { AnimatedRastaGradient } from '@t4/ui/src/hero/AnimatedRastaGradient'
import { ProductsList } from '@t4/ui/src/products/productsList'
import { FeaturedCategoriesSection } from '@t4/ui/src/products/featuredCategories'
import { FloatingVideo } from '@t4/ui/src/video/FloatingVideo'

import { Scene } from '@t4/ui/src/r3f'
import { Loading } from '@t4/ui/src/Loading'

import { HeroBackground } from '@t4/ui/src/hero/heroBackground'
export function HomeScreen() {
  // Listen to scroll events to update scrollY
  return (
    <ZStack minHeight='250vh' maxWidth='100vw' overflos>
      <Navbar />
      {/* Hero Section */}
      {/* Products Section */}
      <YStack>
        <HeroBanner />

        <HeroBackground />

        <FeaturedCategoriesSection />
        <ProductsList />
      </YStack>
      {/* Sticky Navbar */}
    </ZStack>
  )
}
