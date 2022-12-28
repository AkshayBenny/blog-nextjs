import axios from 'axios'
import React, { useState } from 'react'

const inputClassnames = 'border-2 border-gray-300 p-2 rounded-md w-96'

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
			className='flex flex-col items-center justify-center gap-3 p-6 border'>
			<input
				type='text'
				name='fname'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, fname: e.target.value }))
				}
				placeholder='First Name'
				className={inputClassnames}
			/>
			<input
				type='text'
				name='lname'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, lname: e.target.value }))
				}
				placeholder='Last Name'
				className={inputClassnames}
			/>
			<input
				type='number'
				name='phone'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, phone: e.target.value }))
				}
				placeholder='Phone Number'
				className={inputClassnames}
			/>

			<input
				type='email'
				name='email address'
				onChange={(e) =>
					setUserData((prev) => ({ ...prev, email: e.target.value }))
				}
				placeholder='Email Address'
				className={inputClassnames}
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
				placeholder='Password'
				className={inputClassnames}
			/>
			<input
				type='password'
				name='confirm password'
				onChange={(e) => setConfirmPassword(e.target.value)}
				placeholder='Confirm Password'
				className={inputClassnames}
			/>
			<button
				type='submit'
				className='bg-black text-white p-2'>
				Register
			</button>
		</form>
	)
}

export default RegisterPage
