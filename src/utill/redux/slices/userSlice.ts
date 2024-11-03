import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  email: string | null;
  name: string | null;
  role: string | null;
  isLoggedIn: boolean;
  id: number | null;
}
const initialState: UserState = {
  email: null,
  name: null,
  role: null,
  isLoggedIn: false,
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.email = action.payload.email;
      state.name = action.payload.name;
      state.role = action.payload.role;
      state.isLoggedIn = action.payload.isLoggedIn; 
      state.id = action.payload.id
    },
    clearUser: (state) => {
      state.email = null;
      state.name = null;
      state.role = null;
      state.isLoggedIn = false;
      state.id =  null
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
