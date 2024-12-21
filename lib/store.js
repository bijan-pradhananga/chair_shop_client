import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './features/brand'
import cartReducer from './features/cart'
import categoryReducer from './features/category'
import productReducer from './features/product'

export const makeStore = () => {
  return configureStore({
    reducer: {
      brand: brandReducer,
      cart:cartReducer,
      category: categoryReducer,
      product: productReducer,
    },
  })
}