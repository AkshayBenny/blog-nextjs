import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import dbConnect from '../../lib/dbConnect'
import axios from 'axios'

export interface UserState {
	status: 'idle' | 'loading' | 'failed'
	user: object
	error: string | null | object
}

interface SigninParams {
	email: string
	password: string
}

// Default state object with initial values.
const initialState: UserState = {
	status: 'idle',
	user: {},
	error: null,
} as const

// Thunks
export const getUser = createAsyncThunk(
	'user/signin',
	async (params: SigninParams) => {
		await dbConnect()
		const { email, password } = params
		
		const config = {
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
			},
		}
		const { data } = await axios.post(
			'/api/signin',
			{ email, password },
			config
		)

		localStorage.setItem('userInfo', JSON.stringify(data))
		localStorage.setItem('token', data.token)

		return data
	}
)

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
