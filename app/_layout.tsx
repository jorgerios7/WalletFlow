import RouteAddress from '@/components/RouteAdress'
import { Stack } from 'expo-router'

export default function MainLayout() {
  return (
    <Stack>
      <Stack.Screen
        name='index'
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name={RouteAddress.Login}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name='(painel)/home/appNavigator'
        options={{ headerShown: false }}
      />
    </Stack>
  )
}