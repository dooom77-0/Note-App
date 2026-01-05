import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
const TabsScreen = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarStyle: {
        height: 60
      }
     }}>
      <Tabs.Screen name="index" options={{
        title: 'Notes',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="clipboard" size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Settings',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="settings" size={24} color={color} />
        )
      }} />
    </Tabs>
  )
}

export default TabsScreen