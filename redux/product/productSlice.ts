// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
// import { useDispatch } from 'react-redux'
// import type { RootState } from '../../store'

// export type ProductState = {
// 	value: Array
// }
// type FetchTodosError = {
// 	value: string
// }
// const initialState: ProductState = {
// 	value: [],
// }

// export const fetchTodos = createAsyncThunk,
// 	{ rejectValue: FetchTodosError }
// >(
// 	'todos/fetch',
// 	// The second argument, `thunkApi`, is an object
// 	// that contains all those fields
// 	// and the `rejectWithValue` function:
// 	async (limit: number, thunkApi) => {
// 		const response = await fetch(/*...*/)

// 		// Check if status is not okay:
// 		if (response.status !== 200) {
// 			// Return the error message:
// 			return thunkApi.rejectWithValue({
// 				message: 'Failed to fetch todos.',
// 			})
// 		}

// 		return data
// 	}
// )

// export const counterSlice = createSlice({
// 	name: 'counter',
// 	initialState,

// 	reducers: {
// 		increment: (state) => {
// 			state.value++
// 		},
// 		decrement: (state) => {
// 			state.value--
// 		},

// 		incrementByAmount: (state, action: PayloadAction<number>) => {
// 			state.value += action.payload
// 		},
// 	},
// })
// export const { increment, decrement, incrementByAmount } = counterSlice.actions

// export const selectCount = (state: RootState) => state.counter.value

// export default counterSlice.reducer
