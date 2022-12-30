import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

type Product = {
	_id: string
	user: string
	name: string
	image: string
	brand: string
	category: string
	description: string
	rating: number
	numReviews: number
	price: number
	countInStock: number
	reviews: any[]
	createdAt: Date
	updatedAt: Date
	__v: number
}

export type ProductState = {
	value: Array<Product>
}

const initialState: ProductState = {
	value: [],
}

export const getProduct = createAsyncThunk('product/getProduct', async (id) => {
	const { data } = await axios.get(`http://localhost:5000/api/products/${id}`)
	return data
})

export const productSlice = createSlice({
	name: 'counter',
	initialState,

	reducers: {
		// increment: (state) => {
		// 	state.value++
		// },
		// decrement: (state) => {
		// 	state.value--
		// },

		incrementByAmount: (state, action: PayloadAction<number>) => {
			// state.value += action.payload
		},
	},
	extraReducers: {
		[getProduct.pending]: (state) => {
			state.isLoading = true
		},
		[getProduct.fulfilled]: (state, action: PayloadAction<number>) => {
			state.isLoading = false
			state.product = action.payload
		},
		[getProduct.rejected]: (state, action: PayloadAction<number>) => {
			state.isLoading = false
			state.error = action.payload
		},
	},
})

export default productSlice.reducer
