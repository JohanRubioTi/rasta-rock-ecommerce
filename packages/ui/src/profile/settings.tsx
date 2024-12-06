import { Button, Heading, Paragraph, Separator, Sheet, XStack, YGroup, YStack } from '@t4/ui'
import { ChevronRight, PackageCheck, PackageSearch, Truck, X } from '@tamagui/lucide-icons'
import { useSupabase } from 'app/utils/supabase/hooks/useSupabase'
import { trpc } from 'app/utils/trpc'
import React, { useState } from 'react'

import { SolitoImage } from 'solito/image'

export const Settings = (props): React.ReactNode => {
  const [position, setPosition] = useState(0)
  const [open, setOpen] = useState(false)
  const supabase = useSupabase()
  const utils = trpc.useContext()

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
        <Sheet.Frame f='1' ai='center' space='$5'>
          <Sheet.Handle />
          <Button
            size='$6'
            alignSelf='end'
            mr='$8'
            circular
            icon={X}
            onPress={() => {
              setOpen(false)
            }}
          />

          <YGroup borderWidth={1} width='30%' separator={<Separator />} space>
            <YGroup.Item>
              <XStack f='1' p='$3' jc='space-between'>
                <Paragraph fontSize='$5'>Ajustes de Usuario</Paragraph>
                <ChevronRight size='$2' />
              </XStack>
            </YGroup.Item>
            <YGroup.Item>
              <XStack f='1' p='$3' jc='space-between'>
                <Paragraph fontSize='$5'>Direcciones</Paragraph>
                <ChevronRight size='$2' />
              </XStack>
            </YGroup.Item>
          </YGroup>

          <YGroup borderWidth={1} width='30%' separator={<Separator />} space>
            <YGroup.Item>
              <XStack f='1' p='$3' jc='space-between'>
                <Paragraph fontSize='$5'>Ajustes de Notificaciones</Paragraph>
                <ChevronRight size='$2' />
              </XStack>
            </YGroup.Item>
            <YGroup.Item>
              <XStack f='1' p='$3' jc='space-between'>
                <Paragraph fontSize='$5'>Política de Privacidad</Paragraph>
                <ChevronRight size='$2' />
              </XStack>
            </YGroup.Item>
          </YGroup>

          <Button
            onPress={async () => {
              supabase.auth.signOut()
              // Clear tanstack query cache of authenticated routes
              utils.auth.secretMessage.reset()
            }}
          >
            Cerrar Sesión
          </Button>
        </Sheet.Frame>
      </Sheet>
    </>
  )
}
