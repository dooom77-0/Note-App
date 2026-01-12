import React from 'react'
import { Tabs } from 'expo-router'
import { Ionicons } from '@expo/vector-icons';
const TabsScreen = () => {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: '#f9f9f9',
      tabBarInactiveTintColor: '#818181',
      tabBarStyle: {
        borderTopWidth: 0,
        height: 60,
        backgroundColor: '#A7C7FF',
        display: 'none',
      }
     }}>
      <Tabs.Screen name="index" options={{
        title: 'ملاحظاتي',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="clipboard" size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'الإعدادات',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="settings" size={24} color={color} />
        )
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'الملف الشخصي',
        headerShown: false,
        tabBarIcon: ({ color }) => (
          <Ionicons name="person" size={24} color={color} />
        )
      }} />
    </Tabs>
  )
}

export default TabsScreen