import { Provider } from 'app/provider'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import { useEffect } from 'react'
import {
  AtkinsonHyperlegible_400Regular,
  AtkinsonHyperlegible_700Bold,
} from '@expo-google-fonts/atkinson-hyperlegible'
import { SpaceMono_400Regular, SpaceMono_700Bold } from '@expo-google-fonts/space-mono'

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router'

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync()

export default function RootLayout() {
  const [loaded, error] = useFonts({
    DmSans: require('@tamagui/font-dm-sans'),
    Silkscreen: require('@tamagui/font-silkscreen'),
    AtkinsonHyperlegible: AtkinsonHyperlegible_400Regular,
    AtkinsonHyperlegibleBold: AtkinsonHyperlegible_700Bold,
    SpaceMono: SpaceMono_400Regular,
    SpaceMonoBold: SpaceMono_700Bold,
  })

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <Provider initialSession={null}>
      <Stack />
    </Provider>
  )
}
