export interface UiState {
  theme: 'light' | 'dark';
  density: 'compact' | 'comfortable';
  toggleTheme: () => void;
  toggleDensity: () => void;
}