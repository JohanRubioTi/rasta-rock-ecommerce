import { H1, H2, Paragraph, Text, YStack } from '@t4/ui'
import { CTAButton } from '@t4/ui/src/hero/cTAButton'

export const HeroBanner = () => {
  return (
    <YStack
      ai='center'
      jc='space-evenly'
      width='100%'
      height='100vh'
      $xs={{ p: '$6' }}
      $sm={{ p: '$6' }}
      $md={{ p: '$7' }}
      $gtMd={{ p: '$8' }}
    >
      {/* Hero Section */}
      <H1
        ta='center'
        color='#FFFFFF'
        lineHeight={'$16'}
        $xs={{ fontSize: '$8', lineHeight: '$8', pb: '$2' }}
        $sm={{ fontSize: '$10', lineHeight: '$10', pb: '$2.5' }}
        $md={{ fontSize: '$16', lineHeight: '$12', pb: '$3' }}
        $lg={{ fontSize: '$16', lineHeight: '$14', pb: '$3.5' }}
        $xl={{ fontSize: '$16', lineHeight: '$16', pb: '$4' }}
        $xxl={{ fontSize: '$16', lineHeight: '$16', pb: '$4' }}
        $gtLg={{ fontSize: '$16', lineHeight: '$16' }}
      >
        Compra Online Productos Únicos Rasta Rock
      </H1>
      <H2 ta='center' fontSize='$10'>
        Estilo Rasta único. Envío gratis.
      </H2>
      <YStack
        $xs={{ width: '90%', px: '$2' }}
        $sm={{ width: '80%', px: '$3' }}
        $md={{ width: '30%' }}
        pt='$4'
        ai='center'
      >
        <CTAButton text='Comprar Ya' />
      </YStack>

      {/* Band Section - Commented for now 
      <YStack
        $xs={{ position: 'hidden', width: '90%', p: '$1' }}
        $sm={{ position: 'absolute', top: '$1.5', right: '$1.5', width: '18%', p: '$1.5' }}
        $md={{ position: 'absolute', top: '$2', right: '$2', width: '16%', p: '$2' }}
        $gtMd={{ position: 'absolute', top: '$2.5', right: '$2.5', width: '14%', p: '$2.5' }}
        ai='center'
        space='$0.75'
        bc='rgba(0, 0, 0, 0.5)'
        br='$3'
        elevation='$0.25
      >
        <H2
          $xs={{ fontSize: '$6', lineHeight: '$6', pb: '$1.5' }}
          $sm={{ fontSize: '$7', lineHeight: '$7', pb: '$2' }}
          $md={{ fontSize: '$8', lineHeight: '$8', pb: '$2.5' }}
          $lg={{ fontSize: '$9', lineHeight: '$9', pb: '$3' }}
          $xl={{ fontSize: '$10', lineHeight: '$10', pb: '$3.5' }}
          $xxl={{ fontSize: '$10', lineHeight: '$10', pb: '$3.5' }}
          ta='center'
          color='rgba(255, 255, 255, 0.8)'
        >
          Rasta Rock
        </H2>
        <Paragraph
          $xs={{ fontSize: '$4', lineHeight: '$4', pb: '$1' }}
          $sm={{ fontSize: '$5', lineHeight: '$5', pb: '$1.5' }}
          $md={{ fontSize: '$6', lineHeight: '$6', pb: '$2' }}
          $lg={{ fontSize: '$7', lineHeight: '$7', pb: '$2.5' }}
          $xl={{ fontSize: '$8', lineHeight: '$8', pb: '$3' }}
          $xxl={{ fontSize: '$8', lineHeight: '$8', pb: '$3' }}
          ta='center'
          color='rgba(255, 255, 255, 0.8)'
        >
          Reggae & Rock
        </Paragraph>
        <CTAButton text='Escuchar' size='$1.5' />
      </YStack>
*/}
    </YStack>
  )
}
