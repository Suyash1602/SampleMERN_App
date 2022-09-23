import { configureStore } from '@reduxjs/toolkit'
import userLoginSlice from './slices/userLoginSlice'
import cartSlice from './slices/cartSlice'


export const store = configureStore({
    reducer: {
        userLogin: userLoginSlice,
        cart: cartSlice
    }
})