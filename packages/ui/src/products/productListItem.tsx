import React, { useState } from 'react'

import type { CardProps } from 'tamagui'

import { Card, Group, Heading, Image, Paragraph, Separator, XStack, YStack } from 'tamagui'

import type { Product } from '@t4/api/src/db/schema'
import { Button, Sheet } from '@t4/ui'
import { formatNumber, formatPrice } from '@t4/ui/src/libs/number'
import { ShoppingCart, X } from '@tamagui/lucide-icons'
import { SolitoImage } from 'solito/image'

import { useSetAtom } from 'jotai'
import { addToCartAtom } from '../../../app/atoms/cart'
import { useSheetOpen } from '../../../app/atoms/sheet'

export const ProductListItem = ({ product }: { product: Product }): React.ReactElement => {
  const [open, setOpen] = useState(false)
  const [quantity, setQuantity] = useState(1)
  const addToCart = useSetAtom(addToCartAtom)
  const [position, setPosition] = useState(0)

  return (
    <>
      <Card
        elevate
        bordered
        animation='bouncy'
        size='$4'
        p='$4'
        scale={0.9}
        hoverStyle={{ scale: 0.925 }}
        pressStyle={{ scale: 0.875 }}
        onPress={() => {
          setOpen((x) => !x)
        }}
      >
        <Card.Header w={250} h={250} ai='end' jc='end' f='1' px='$2' py='$1'>
          <SolitoImage src='/t4-logo.png' alt='T4 Logo' fill />
          <Button
            icon={ShoppingCart}
            onPress={(e) => {
              if (e?.stopPropagation) e.stopPropagation()
              return addToCart(product)
            }}
            circular
          />
        </Card.Header>

        <Card.Footer height='50' px='$2.5' pb='$2' pt='$1.5'>
          <YStack f='1'>
            <Separator />
            <Paragraph pt='$1' fontSize='$5'>{`${product.name} `}</Paragraph>
            <Paragraph fontSize='$6' fontWeight='600'>
              {formatPrice(product.price)}
            </Paragraph>
          </YStack>
        </Card.Footer>

        <Card.Background>
          {/*
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: '',
          }}
        />
        */}
        </Card.Background>
      </Card>

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[90]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame f='1'>
          <Sheet.Handle />
          <Button
            size='$6'
            alignSelf='end'
            br={35}
            mr='$4'
            circular
            icon={X}
            onPress={() => {
              setOpen(false)
            }}
          />
          <YStack f='0.5' px='$10'>
            <XStack f='1' jc='space-between' space='$2' p='$2'>
              <Card flex='0.5' elevate bordered p='$6'>
                <XStack f='1' ai='center'>
                  <YStack height='100%' jc='space-evenly' f='0.5'>
                    <Heading>{formatPrice(product.price)}</Heading>
                    <Paragraph>{product.name}</Paragraph>
                    <XStack>
                      <Paragraph size='4'>Color: {'current color'}</Paragraph>
                      {/*Product Colors Map*/}
                    </XStack>
                  </YStack>
                  <YStack height='100%' ai='center' jc='space-between' f='0.5'>
                    <YStack f='1' width='100%' ai='center' jc='center'>
                      <Paragraph>{product.description}</Paragraph>
                      <Separator />
                    </YStack>

                    <YStack alignSelf='end' space='$4'>
                      <Group orientation='horizontal' alignSelf='end'>
                        <Group.Item>
                          <Button
                            onPress={() => {
                              /*decreaseCart(product)*/
                              if (quantity > 1) {
                                setQuantity(quantity - 1)
                              }
                              if (quantity === 1) {
                                setQuantity(quantity)
                              }
                            }}
                            fontSize={24}
                          >
                            -
                          </Button>
                        </Group.Item>
                        <Group.Item>
                          <Button bc='black' disabled>
                            {quantity}
                          </Button>
                        </Group.Item>
                        <Group.Item>
                          <Button
                            onPress={() => {
                              /*addToCart(product)*/
                              if (quantity < product.stock_quantity) {
                                setQuantity(quantity + 1)
                              }
                            }}
                            fontSize={24}
                          >
                            +
                          </Button>
                        </Group.Item>
                      </Group>

                      <Button
                        alignSelf='end'
                        mr='$2'
                        icon={ShoppingCart}
                        onPress={() => addToCart(product)}
                        size='$6'
                        circular
                      />
                    </YStack>
                  </YStack>
                </XStack>
              </Card>

              <YStack f='0.5'>
                <XStack f='0.8'>
                  <SolitoImage src='/t4-logo.png' alt='T4 Logo' fill />
                </XStack>
                <XStack f='0.2' jc='start'>
                  <XStack f='0.1'>
                    <SolitoImage src='/t4-logo.png' alt='T4 Logo' fill />
                  </XStack>
                </XStack>
              </YStack>
            </XStack>
          </YStack>
          <XStack f='0.5' px='$10' py='$6'>
            {/* scroll products */}

            <Card
              elevate
              bordered
              animation='bouncy'
              size='$4'
              width={300}
              height={300}
              scale={0.9}
              hoverStyle={{ scale: 0.925 }}
              pressStyle={{ scale: 0.875 }}
              onPress={() => {
                setOpen((x) => !x)
              }}
            >
              <Card.Header w={250} h={250} ai='end' jc='end' f='1' px='$2' py='$1'>
                <SolitoImage src='/t4-logo.png' alt='T4 Logo' fill />
              </Card.Header>

              <Card.Footer height='50' px='$2.5' pb='$2' pt='$1.5'>
                <YStack f='1'>
                  <Separator />
                  <Paragraph pt='$1' fontSize='$5'>{`${product.name} `}</Paragraph>
                  <Paragraph fontSize='$6' fontWeight='600'>
                    {formatPrice(product.price)}
                  </Paragraph>
                </YStack>
              </Card.Footer>

              <Card.Background>
                {/*
        <Image
          resizeMode="contain"
          alignSelf="center"
          source={{
            width: 300,
            height: 300,
            uri: '',
          }}
        />
        */}
              </Card.Background>
            </Card>
          </XStack>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
