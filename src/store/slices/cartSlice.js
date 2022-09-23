import { createSlice } from '@reduxjs/toolkit'


export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        selectedProducts: []
    },
    reducers: {

        addProducts: (state, action) => {
            state.selectedProducts.push(action.payload)
        },

        clearCart: (state, action) => {
            state.selectedProducts = []
        }
    }
})

//create action creator function
export let { addProducts, clearCart } = cartSlice.actions

export default cartSlice.reducer