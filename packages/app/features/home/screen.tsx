import { useEffect, useState, useMemo } from 'react'
import { ScrollView, Section, YStack, ZStack } from '@t4/ui'
import { WithSkiaWeb } from '@shopify/react-native-skia/lib/module/web'
import { Text } from 'react-native'

import { Navbar } from '@t4/ui/src/layout/navbar/navbar'
import { HeroBanner } from '@t4/ui/src/hero/heroBanner'
import { HeroBackground } from '@t4/ui/src/hero/heroBackground'
import { ProductsList } from '@t4/ui/src/products/productsList'
import { FloatingVideo } from '@t4/ui/src/video/FloatingVideo'

import { Scene } from '@t4/ui/src/r3f'
import { Loading } from '@t4/ui/src/Loading'

const SkiaBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const grainTexture = useImage(require('@t4/ui/src/assets/grain.png'))

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout
    setDimensions({ width, height })
  }

  return (
    <Canvas
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: -2 }}
      onLayout={onLayout}
    >
      <Group>
        {/* Base Gradient Layer */}
        <Rect x={0} y={0} width={dimensions.width} height={dimensions.height}>
          <LinearGradient
            start={vec(0, 0)}
            end={vec(0, dimensions.height)}
            colors={['#78C800', '#FDE74C', '#FC4A1A']}
            positions={[0, 0.5, 1]}
          />
        </Rect>

        {/* Depth Layer */}
        <Rect x={0} y={0} width={dimensions.width} height={dimensions.height}>
          <Fill color='rgba(0, 0, 0, 0.15)' />
        </Rect>

        {/* Radial Glow */}
        <Rect x={0} y={0} width={dimensions.width} height={dimensions.height}>
          <RadialGradient
            c={vec(dimensions.width / 2, dimensions.height / 2)}
            r={Math.max(dimensions.width, dimensions.height) * 0.7}
            colors={['rgba(255, 255, 255, 0.1)', 'rgba(255, 255, 255, 0)']}
          />
        </Rect>

        {/* Grain Texture */}
        <Image
          image={grainTexture}
          x={0}
          y={0}
          width={dimensions.width}
          height={dimensions.height}
          blendMode='overlay'
          opacity={0.07}
        />
      </Group>
    </Canvas>
  )
}

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

      {/* Skia Gradient Background with Code Splitting 
      <WithSkiaWeb
        getComponent={() => <SkiaBackground />}
        fallback={<Text style={{ textAlign: 'center' }}>Loading Skia...</Text>}
      />
*/}
    </ZStack>
  )
}
