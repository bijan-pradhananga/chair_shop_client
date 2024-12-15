import { configureStore } from '@reduxjs/toolkit'
import categoryReducer from './features/category'

export const makeStore = () => {
  return configureStore({
    reducer: {
        category:categoryReducer
    },
  })
}