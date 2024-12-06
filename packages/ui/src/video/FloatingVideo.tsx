import type { Video } from '@t4/api/src/db/schema'
import { formatNumber, formatPrice } from '@t4/ui/src/libs/number'
import { SolitoImage } from 'solito/image'
import { Paragraph, XStack } from 'tamagui'
import {LmYoutubeEmbed} from '@tamagui-extras/youtube'

export const FloatingVideo = (item: Video): React.ReactElement => {
  return (
    <XStack
      bc='rgba(0,0,0,0.5)'
      position='fixed'
      top='$16'
      right='$6'
      br='$3'
      p='$2.5'
      maxWidth='fit-content'
      maxHeight='fit-content'
      zIndex={20}
    >
      <LmYoutubeEmbed youtubeId='ytmxlc23m0Q'/>
    </XStack>
  )
}
