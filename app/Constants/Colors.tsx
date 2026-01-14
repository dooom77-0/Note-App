import { StatusBarStyle } from 'expo-status-bar';

export const Colors = {
    light: {
        background: '#F9FAFB',
        card: '#ffffff',
        primary: '#111827',
        secondary: '#6B7280',
        headerBackground: '#A7C7FF',  // Changed to a color string
        borders: '#E5E7EB',
        StatusBar: 'dark' as StatusBarStyle,  // Typed as StatusBarStyle
    },
    dark: {
        background: '#121212',
        card: '#1E1E1E',
        primary: '#f9f9f9',
        secondary: '#9CA3AF',
        headerBackground: '#1E1E1E',  // Changed to a color string
        borders: '#2D2D2D', 
        StatusBar: 'light' as StatusBarStyle,  // Typed as StatusBarStyle
    }
}