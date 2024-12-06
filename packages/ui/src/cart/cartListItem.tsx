import {
  Anchor,
  Button,
  Group,
  H1,
  H3,
  Paragraph,
  ScrollView,
  Separator,
  Sheet,
  XStack,
  YStack,
} from '@t4/ui'

import { Trash } from '@tamagui/lucide-icons'

import { atom, useAtom } from 'jotai'
import { useAtomValue, useSetAtom } from 'jotai'

import { formatNumber, formatPrice } from '@t4/ui/src/libs/number'
import { SolitoImage } from 'solito/image'
import {
  addToCartAtom,
  cartAtom,
  cartTotalAtom,
  decreaseCartAtom,
  removeFromCartAtom,
} from '../../../app/atoms/cart'

export const CartListItem = ({
  product,
  quantity,
}: { product: any; quantity: number }): React.ReactElement => {
  const addToCart = useSetAtom(addToCartAtom)
  const decreaseCart = useSetAtom(decreaseCartAtom)
  const removeFromCart = useSetAtom(removeFromCartAtom)

  return (
    <YStack>
      <Separator />
      <XStack jc='space-between'>
        <XStack py='$4' px='$3'>
          <SolitoImage
            src='/t4-logo.png'
            width='128'
            height='128'
            alt='T4 Logo'
            style={{
              borderRadius: 25,
            }}
          />
          <YStack py='$4' jc='space-between' height='100%'>
            <Paragraph pl='$3' fontSize={24}>
              {`${product.name} `}
            </Paragraph>
            <XStack pl='$3'>
              <Paragraph fontSize={16} opacity={0.8} color='green'>
                {'Product state'}
              </Paragraph>
              <Paragraph pl='$2' fontSize={12} opacity={0.8}>
                {'|'}
              </Paragraph>
              <Paragraph pl='$2' fontSize={16} opacity={0.8} color='red'>
                {'product'}
              </Paragraph>
            </XStack>

            <Paragraph paddingLeft='$3' fontSize={16} opacity={0.6}>
              {product.category}
            </Paragraph>
          </YStack>
        </XStack>
        <YStack space='$4' jc='space-between' ai='end' py='$6' px='$4'>
          <Paragraph fontSize={28}>{formatPrice(product.price)}</Paragraph>

          <XStack space='$4'>
            <Group orientation='horizontal'>
              <Group.Item>
                <Button onPress={() => decreaseCart(product)} fontSize={24}>
                  -
                </Button>
              </Group.Item>
              <Group.Item>
                <Button bc='black' disabled>
                  {quantity}
                </Button>
              </Group.Item>
              <Group.Item>
                <Button onPress={() => addToCart(product)} fontSize={24}>
                  +
                </Button>
              </Group.Item>
            </Group>
            <Button
              icon={Trash}
              circular
              onPress={() => removeFromCart({ id: product.id })}
              space='$2'
            />
          </XStack>
        </YStack>
      </XStack>
    </YStack>
  )
}
