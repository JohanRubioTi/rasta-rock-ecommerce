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
  backgroundColor: '$backgorund',
})

const GradientLayer = styled(Stack, {
  position: 'absolute',
  width: '100%',
  height: '100%',
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
      end: { x: 1, y: 0 },
    },
    {
      colors: ['rgba(0,0,0,0)', '#FDE74C', 'rgba(0,0,0,0)'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
    {
      colors: ['rgba(255,255,255,0)', '#FC4A1A', 'rgba(0,0,0,0)'],
      start: { x: 0, y: 0 },
      end: { x: 1, y: 0 },
    },
  ]

  const positions = [
    [{ x: '-55%' }, { x: '-50%' }, { x: '-45%' }],
    [{ x: '0%' }, { x: '-5%' }, { x: '5%' }],
    [{ x: '55%' }, { x: '50%' }, { x: '45%' }],
  ]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setPositionI((x) => (x + 1) % gradients.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [setPositionI])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <GradientContainer>
      {/* Web-only radial highlight */}

      <AnimatePresence>
        {gradients.map((gradient, index) => (
          <GradientLayer
            key={index}
            animation={'lazy'}
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
