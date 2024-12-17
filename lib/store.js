import { configureStore } from '@reduxjs/toolkit'
import brandReducer from './features/brand'
import categoryReducer from './features/category'
import productReducer from './features/product'

export const makeStore = () => {
  return configureStore({
    reducer: {
      brand: brandReducer,
      category: categoryReducer,
      product: productReducer,
    },
  })
}