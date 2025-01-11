import { LinearGradient } from '@tamagui/linear-gradient'
import { AnimatePresence, Button, Paragraph, Text, XStack } from 'tamagui'
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
        backgroundColor='#FFD700'
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

        <Paragraph
          opacity='1'
          p='$4'
          fontSize='$4'
          zIndex={2}
          style={{
            textShadow: '0px 1px 3px rgba(0, 0, 0, 0.8)',
          }}
          fontFamily='$accent'
        >
          {text}
        </Paragraph>
      </Button>
    </AnimatePresence>
  )
}
