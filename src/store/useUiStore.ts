import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { UiState } from '../types';

export const useUiStore = create<UiState>()(
  persist(
    (set) => ({
      theme: 'light',
      density: 'comfortable',
      toggleTheme: () => 
        set((state) => ({ theme: state.theme === 'light' ? 'dark' : 'light' })),
      toggleDensity: () => 
        set((state) => ({ density: state.density === 'compact' ? 'comfortable' : 'compact' })),
    }),
    {
      name: 'shelfApp-storage', // Data will appear in localStorage under this key
      storage: createJSONStorage(() => localStorage),
    }
  )
);