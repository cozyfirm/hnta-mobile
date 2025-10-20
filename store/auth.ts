import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface User {
  id: number;
  name: string;
  api_token: string;
  photo?: {
    hasPhoto: boolean;
    path: string;
    photo_uri: string;
  };
}

interface AuthStore {
  user: User | null;
  setUser: (user: User | null) => void;
  fcmToken: string | null;
  setFcmToken: (fcmToken: string | null) => void;
}

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      fcmToken: null,
      setFcmToken: (fcmToken: string | null) => set({ fcmToken }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
