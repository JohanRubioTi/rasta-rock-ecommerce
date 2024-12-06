import { AdminScreen } from 'app/features/admin/screen'
import { Stack } from 'expo-router'

export default function Screen() {
  return (
    <>
      <Stack.Screen
        options={{
          title: 'Admin',
        }}
      />
      <AdminScreen />
    </>
  )
}
