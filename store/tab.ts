import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface TabStore {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
}

export const useTabStore = create<TabStore>()(
  persist(
    (set) => ({
      currentTab: 'index',
      setCurrentTab: (tab) => set({ currentTab: tab }),
    }),
    {
      name: 'tab-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
