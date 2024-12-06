import { H1, H2, Paragraph, View, YStack } from '@t4/ui'

import { CTAButton } from '@t4/ui/src/hero/cTAButton'
import { HeroBackground } from '@t4/ui/src/hero/HeroBackground'

export const HeroBanner = () => {
  return (
    <YStack f={1} width='100vw' height='100vh' ai='center' jc='center'>
      <YStack position='absolute' f={1} top='0' left='0' ai='start' mt='$6' p='$1'>
        <H1
          ta='center'
          px='$5'
          size='$12'
          pb='$2'
          textShadowColor='rgba(0, 0, 0, 0.8)'
          textShadowOffset={{ width: 2, height: 2 }}
          textShadowRadius={4}
        >
          Compra Online Productos Únicos Rasta Rock
        </H1>
        <YStack f={1} width='30%' ai='center'>
          <Paragraph
            pb='$4'
            px='$3'
            fontSize='$6'
            lineHeight={16}
            ta='left'
            textShadowColor='rgba(0, 0, 0, 0.6)'
            textShadowOffset={{ width: 1, height: 1 }}
            textShadowRadius={2}
          >
            Estilo Rasta único. Envío gratis.
          </Paragraph>
          <CTAButton text='Comprar Ya' /> {/* Enlace a la página de la tienda */}
        </YStack>
      </YStack>

      {/* Sección de la Banda */}
      <YStack position='absolute' f={1} alignSelf='end' width='30%' ai='center' p='$2'>
        <H2
          size='$9'
          fontWeight='bold'
          pb='$4'
          textShadowColor='rgba(0, 0, 0, 0.7)'
          textShadowOffset={{ width: 1, height: 1 }}
          textShadowRadius={3}
        >
          Rasta Rock: Reggae & Rock Fusión
        </H2>
        <Paragraph
          pb='$4'
          px='$3'
          size='$6'
          lineHeight={12}
          ta='left'
          textShadowColor='rgba(0, 0, 0, 0.6)'
          textShadowOffset={{ width: 1, height: 1 }}
          textShadowRadius={2}
        >
          Música reggae-rock. Vibra Rasta.
        </Paragraph>
        <CTAButton text='¡Escucha ahora!' />
      </YStack>
    </YStack>
  )
}
