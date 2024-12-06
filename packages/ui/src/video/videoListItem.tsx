import type { Video } from '@t4/api/src/db/schema'
import { formatNumber, formatPrice } from '@t4/ui/src/libs/number'
import { SolitoImage } from 'solito/image'
import { Paragraph, XStack } from 'tamagui'

export const VideoListItem = (item: Video): React.ReactElement => {
  return (
    <XStack flexDirection='row' paddingLeft='$2'>
      <iframe
        width='853'
        height='480'
        src={`https://www.youtube.com/embed/${item.url}`}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        title='Embedded youtube'
      />
    </XStack>
  )
}
