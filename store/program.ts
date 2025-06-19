import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface Program {
  id: number;
  title: string;
  icon: any;
}

interface ProgramStore {
  selectedProgram: Program;
  setSelectedProgram: (program: Program) => void;
}

const defaultProgram: Program = {
  id: 6,
  title: 'Muzička produkcija',
  icon: require('../assets/images/muzika.png'),
};

export const useProgramStore = create<ProgramStore>()(
  persist(
    (set) => ({
      selectedProgram: defaultProgram,
      setSelectedProgram: (program) => set({ selectedProgram: program }),
    }),
    {
      name: 'program-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
); 