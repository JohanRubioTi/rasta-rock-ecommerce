import { StyleSheet } from 'react-native'
import { YStack, ZStack } from '@t4/ui'
import { lazy, useRef, useEffect, Suspense } from 'react'
import { View, Center, Text3D } from '@react-three/drei'
import { Common, Model as Guitar } from '@t4/ui/src/r3f'
import { RastaShaderMaterial } from '@t4/ui/src/r3f'
import { SpotLight } from '@react-three/drei'
import { useTexture } from '@react-three/drei'

import { AnimatedRastaGradient } from '@t4/ui/src/hero/AnimatedRastaGradient'
//const SpotLight = lazy(() => import('@react-three/drei').then((module) => module.SpotLight))

export const HeroBackground = ({ scrollY }) => {
  return (
    <>
      <YStack position='absolute' zIndex={-2} width='100%' height='100vh'>
        <AnimatedRastaGradient />
      </YStack>
      <YStack position='absolute' zIndex={-1} width='100%' height='100vh'>
        <View style={styles.view}>
          <Guitar scale={5} position={[2, -2, 2]} />
          <Common />

          <pointLight color='#FFD700' intensity={3} position={[1, 2, 5]} />

          <pointLight color='#78C800' intensity={3} position={[1, 1.5, 5]} />
          <pointLight color='#FC4A1A' intensity={3} position={[1, 1, 5]} />
        </View>
      </YStack>
    </>
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
    zIndex: '1',
  },
})
