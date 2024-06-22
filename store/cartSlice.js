import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addtocart: (state, action) => {
            state.push(action.payload);
        },
        removetocart: (state, action) => {
            const newState = state.filter((item) => item.id !== action.payload);
            return newState;
        },
    }
});

export const { addtocart, removetocart } = cartSlice.actions;
export default cartSlice.reducer;