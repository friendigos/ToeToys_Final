import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productId: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: []
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action: PayloadAction<{ items: CartItem[] }>) => {
            state.items = action.payload.items;
        },
        clearCart: (state) => {
            state.items = [];
        }
    }
});

export const { updateCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
