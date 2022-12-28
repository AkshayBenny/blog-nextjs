import axios from 'axios'
import React, { useState } from 'react'

const RegisterPage = () => {
	const [userData, setUserData] = useState({
		fname: '',
		lname: '',
		phone: '',
		email: '',
		password: '',
	})
	const [confirmPassword, setConfirmPassword] = useState('')

	const registerHandler = async (e: any) => {
		e.preventDefault()
		if (userData.password !== confirmPassword) {
			alert('Password does not match')
			return
		}

		const { data } = await axios.post('/api/auth/register', userData, {
			headers: {
				'Content-Type': 'application/json',
			},
		})
		console.log('register Response>>>>>>>>>>>', data)
	}

	return (
		<form
			onSubmit={registerHandler}
			className='flex flex-col items-center justify-center gap-3'>
			<input
				type='text'
				name='fname'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, fname: e.target.value }))
				}
			/>
			<input
				type='text'
				name='lname'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, lname: e.target.value }))
				}
			/>
			<input
				type='number'
				name='phone'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, phone: e.target.value }))
				}
			/>

			<input
				type='email'
				name='email address'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, email: e.target.value }))
				}
			/>
			<input
				type='password'
				name='password'
				onChange={(e) =>
					setUserData((prev) => ({
						...prev,
						password: e.target.value,
					}))
				}
			/>
			<input
				type='password'
				name='confirm password'
				onChange={(e) => setConfirmPassword(e.target.value)}
			/>
			<button
				type='submit'
				className='bg-black text-white'>
				Register
			</button>
		</form>
	)
}

export default RegisterPage
