import { MotiView } from 'moti'
import { styled } from 'tamagui'

const AnimatedText = styled(MotiView, {
  opacity: 0,
  translateY: 20,
})

export const HeroAnimation = ({ children, delay = 0 }) => {
  return (
    <AnimatedText
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        type: 'timing',
        duration: 800,
        delay,
      }}
    >
      {children}
    </AnimatedText>
  )
}
