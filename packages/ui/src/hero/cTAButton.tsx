import { LinearGradient } from '@tamagui/linear-gradient'
import { AnimatePresence, Button, Heading, Paragraph, XStack } from 'tamagui'
import { useState, useEffect } from 'react'

export function CTAButton({ text }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <AnimatePresence>
      <Button
        position='relative'
        animation='quick'
        hoverStyle={{
          scale: 1.25,
          rotate: '2deg',
        }}
        pressStyle={{
          scale: 0.95,
          rotate: '-1deg',
        }}
        overflow='hidden'
        br='$8'
      >
        <XStack
          position='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          backgroundColor='rgba(0, 0, 0, 0.3)'
          zIndex={1}
        />

        <Heading
          opacity='1'
          color='white'
          p='$4'
          size='$4'
          zIndex={2}
          style={{
            textShadow: '0px 1px 3px rgba(0, 0, 0, 0.8)',
          }}
        >
          {text}
        </Heading>

        <LinearGradient
          colors={['#FF0000', '#FFFF00', '#00FF00']}
          start={[0, 0]}
          end={[1, 1]}
          br='$8'
          position='absolute'
          top='0'
          left='0'
          right='0'
          bottom='0'
          opacity='0.8'
          zIndex={0}
        />
      </Button>
    </AnimatePresence>
  )
}
