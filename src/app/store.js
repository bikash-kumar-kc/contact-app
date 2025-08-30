import {configureStore} from '@reduxjs/toolkit'
import updateReducer from'../updateslice/updateSlice'
export const store = configureStore({
    reducer:updateReducer
})