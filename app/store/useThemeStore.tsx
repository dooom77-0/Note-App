import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

// 1. تعريف مصفوفة الألوان كأنواع ثابتة
export type ColorKey = 'blue' | 'purple' | 'green' | 'yellow';

const themeColors: Record<ColorKey, string> = {
  blue: '#3B82F6',
  purple: '#8B5CF6',
  green: '#10B981',
  yellow: '#F59E0B',
};

// 2. تعريف شكل البيانات داخل الـ Store (TypeScript Interface)
interface ThemeState {
  mainColor: string;
  isDarkMode: boolean;
  setMainColor: (colorName: ColorKey) => void;
  toggleDarkMode: () => void;
}

// 3. إنشاء الـ Store مع ربط الأنواع
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      mainColor: themeColors.blue,
      isDarkMode: false,

      setMainColor: (colorName) => 
        set({ mainColor: themeColors[colorName] }),

      toggleDarkMode: () => 
        set((state) => ({ isDarkMode: !state.isDarkMode })),
    }),
    {
      name: 'app-theme-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);