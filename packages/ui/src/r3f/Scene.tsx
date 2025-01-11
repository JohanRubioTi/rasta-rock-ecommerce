import { Preload, View, AdaptiveDpr } from '@react-three/drei'
import { Canvas, addEffect } from '@react-three/fiber'
import Lenis from 'lenis'
import { useEffect, useState, useRef } from 'react'

import { Appearance, StyleSheet } from 'react-native'

export function Scene() {
  const [scrollY, setScrollY] = useState(0)
  const lenisRef = useRef<Lenis | null>(null)
  // Use lenis to control scrolling
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, syncTouch: true })
    const removeEffect = addEffect((time: number) => {
      lenis.raf(time)
      setScrollY(lenis.scroll) // Update `scrollY` for the 3D scene
    })
    lenis.on('scroll', (e) => {
      console.log(e)
    })
    return () => {
      lenis.destroy()
      removeEffect()
    }
  }, [])

  const [docEnv, setDocEnv] = useState(false)

  useEffect(() => {
    if (typeof document !== 'undefined') {
      setDocEnv(true)
    }
  }, [])

  // Everything defined in here will persist between route changes, only children are swapped
  return docEnv ? (
    <Canvas shadows eventSource={document.body} style={styles.scene} eventPrefix='client'>
      <View.Port />
      <Preload all />
      <AdaptiveDpr pixelated />
    </Canvas>
  ) : null
}

const styles = StyleSheet.create({
  scene: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  },
})
