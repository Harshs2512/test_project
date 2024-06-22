import { createSlice } from "@reduxjs/toolkit";

export const bookmarkSlice = createSlice({
    name: 'Bookmark',
    initialState: [],
    reducers: {
        addtobookmark: (state, action) => {
            state.push(action.payload);
        },
        removetobookmark: (state, action) => {
            const newState = state.filter((item) => item.id !== action.payload);
            return newState;
        },
    }
});

export const { addtobookmark, removetobookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
