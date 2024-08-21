import { createSlice } from '@reduxjs/toolkit';

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState: {
        isSidebarOpen: false,
    },
    reducers: {
        toggleSidebar: (state) => {
            state.isSidebarOpen = !state.isSidebarOpen;
        },
    },
});

export const { toggleSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
