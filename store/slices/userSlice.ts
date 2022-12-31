import {
	createSlice,
	Draft,
	PayloadAction,
	createAsyncThunk,
} from '@reduxjs/toolkit'

export interface UserState {
	status: 'idle' | 'loading' | 'failed'
	user: object
	error: string | null | object
}

// Default state object with initial values.
const initialState: UserState = {
	status: 'idle',
	user: {},
	error: null,
} as const

// Thunks
export const getUser = createAsyncThunk('user/fetch', async () => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/todos`)
	const data = await response.json()

	return data
})

//Slice
export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(getUser.pending, (state) => {
			state.status = 'loading'
			state.error = null
		})

		builder.addCase(getUser.fulfilled, (state, { payload }) => {
			state.status = 'idle'
			state.user = payload
		})

		builder.addCase(getUser.rejected, (state, { payload }) => {
			if (payload) state.error = payload
			state.status = 'failed'
		})
	},
})

export const getUserState = (state: { user: UserState }) => state.user
// export const { setName, setEmail } = userSlice.actions
export default userSlice.reducer
