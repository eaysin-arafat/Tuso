import { createSlice } from '@reduxjs/toolkit';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: {
    isDrawerOpen: false
  },
  reducers: {
    toggleDrawer: state => {
      state.isDrawerOpen = !state.isDrawerOpen;
    }
  }
});

export const { toggleDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;