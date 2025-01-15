import { StyleSheet } from 'react-native'
import { lazy, useRef, useEffect, Suspense } from 'react'
import { View, Center, Text3D } from '@react-three/drei'
import { Common, Model as Guitar } from '@t4/ui/src/r3f'
import { RastaShaderMaterial } from '@t4/ui/src/r3f'
import { SpotLight } from '@react-three/drei'
import { useTexture } from '@react-three/drei'
//const SpotLight = lazy(() => import('@react-three/drei').then((module) => module.SpotLight))

export const HeroBackground = ({ scrollY }) => {
  return (
    <View style={styles.view}>
      <Guitar scale={2} position={[1, 0.2, 4]} />
      <Common />

      <pointLight color='#FFD700' intensity={3} position={[1, 2, 5]} />

      <pointLight color='#78C800' intensity={3} position={[1, 1.5, 5]} />
      <pointLight color='#FC4A1A' intensity={3} position={[1, 1, 5]} />
    </View>
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
