import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  theme: 'light' | 'dark';
  currency: string;
  language: string;
}

interface UserState {
  preferences: UserPreferences;
}

const initialState: UserState = {
  preferences: {
    theme: 'light',
    currency: 'USD',
    language: 'en',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<'light' | 'dark'>) => {
      state.preferences.theme = action.payload;
    },
    setCurrency: (state, action: PayloadAction<string>) => {
      state.preferences.currency = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.preferences.language = action.payload;
    },
  },
});

export const { setTheme, setCurrency, setLanguage } = userSlice.actions;
export default userSlice.reducer;
