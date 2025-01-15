import { useEffect, useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { AnimatePresence, Stack, styled, useControllableState, isWeb } from '@t4/ui'

const GradientContainer = styled(Stack, {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  zIndex: -1,
  overflow: 'hidden',
  backgroundColor: '#000',
})

const GradientLayer = styled(Stack, {
  position: 'absolute',
  width: '150%',
  height: '150%',
  opacity: 1,
  animation: 'bouncy',
  enterStyle: {
    opacity: 0,
  },
})

export const AnimatedRastaGradient = () => {
  const [positionI, setPositionI] = useControllableState({
    strategy: 'most-recent-wins',
    defaultProp: 0,
  })

  const gradients = [
    {
      colors: ['rgba(0,0,0,0)', '#78C800', 'rgba(0,0,0,0)'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 1 },
    },
    {
      colors: ['rgba(0,0,0,0)', '#FDE74C', 'rgba(0,0,0,0)'],
      start: { x: 1, y: 0 },
      end: { x: 0, y: 1 },
    },
    {
      colors: ['rgba(0,0,0,0)', '#FC4A1A', 'rgba(0,0,0,0)'],
      start: { x: 0.5, y: 0 },
      end: { x: 0.5, y: 1 },
    },
  ]

  const positions = [
    [
      { x: 0, y: 0, rotate: '0deg' },
      { x: -0.5, y: -0.5, rotate: '45deg' },
      { x: 0.5, y: 0.5, rotate: '-45deg' },
    ],
    [
      { x: -0.5, y: -0.5, rotate: '45deg' },
      { x: 0.5, y: 0.5, rotate: '-45deg' },
      { x: 0, y: 0, rotate: '0deg' },
    ],
    [
      { x: 0.5, y: 0.5, rotate: '-45deg' },
      { x: 0, y: 0, rotate: '0deg' },
      { x: -0.5, y: -0.5, rotate: '45deg' },
    ],
  ]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionI((x) => (x + 1) % gradients.length)
    }, 15000)
    return () => clearInterval(interval)
  }, [setPositionI])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <GradientContainer>
      {/* Web-only radial highlight */}
      {isWeb && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background:
              'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)',
            pointerEvents: 'none',
          }}
        />
      )}

      <AnimatePresence>
        {gradients.map((gradient, index) => (
          <GradientLayer
            key={index}
            animation={positionI === index ? 'bouncy' : 'quick'}
            animateOnly={['transform']}
            {...positions[index][positionI]}
          >
            <LinearGradient
              colors={gradient.colors}
              start={gradient.start}
              end={gradient.end}
              style={{
                width: '100%',
                height: '100%',
              }}
            />
          </GradientLayer>
        ))}
      </AnimatePresence>
    </GradientContainer>
  )
}
