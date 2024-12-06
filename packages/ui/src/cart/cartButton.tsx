import { Button, ScrollView, Sheet, VirtualList, YStack } from '@t4/ui'
import { CartListItem } from '@t4/ui/src/cart/cartListItem'
import { X } from '@tamagui/lucide-icons'
import { atom, useAtom } from 'jotai'
import { useAtomValue, useSetAtom } from 'jotai'
import React, { useState } from 'react'

import { trpc } from 'app/utils/trpc'

import { addToCartAtom, cartAtom, cartTotalAtom, removeFromCartAtom } from '../../../app/atoms/cart'

export const Cart = (props): React.ReactNode => {
  const [position, setPosition] = useState(0)

  const [open, setOpen] = useState(false)

  const cart = useAtomValue(cartAtom)
  console.log(cart)

  const totalCartValue = useAtomValue(cartTotalAtom)

  return (
    <>
      <Button {...props} onPress={() => setOpen((x) => !x)} space='$2' />

      <Sheet
        modal
        open={open}
        onOpenChange={setOpen}
        snapPoints={[100]}
        position={position}
        onPositionChange={setPosition}
        dismissOnSnapToBottom
      >
        <Sheet.Overlay />
        <Sheet.Frame ai='center' space='$5'>
          <Sheet.Handle />
          <Button
            size='$6'
            alignSelf='end'
            br={35}
            mr='$8'
            circular
            icon={X}
            onPress={() => {
              setOpen(false)
            }}
          />
          <ScrollView flex='1' w='90%'>
            <YStack flex='1'>
              {cart?.length > 0 &&
                cart?.map(({ product, quantity }) => (
                  <CartListItem key={product.id} product={product} quantity={quantity} />
                ))}

              <PaymentButton alignSelf='end' total={totalCartValue} />
            </YStack>
          </ScrollView>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}

function PaymentButton({ total }) {
  const createPayment = trpc.paymentRouter.create.useMutation()

  const handlePayment = async () => {
    const result = await createPayment.mutateAsync({
      amount: total,
      currency: 'COP',
      order_id: Date.now() + Math.random(),
    })
    console.log(result)
  }

  return <Button onClick={handlePayment}>Pagar</Button>
}
