import axios from 'axios'
import React, { useState } from 'react'

const Signin = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const signinHandler = async (e: any) => {
		e.preventDefault()
		try {
			const { data } = await axios.post('/api/auth/signin', userData, {
				headers: {
					'Content-Type': 'application/json',
				},
			})
			localStorage.setItem('userInfo', JSON.stringify(data.user))
			localStorage.setItem('token', data.token)
		} catch (error) {
			console.log(error)
			window.alert('Something went wrong.')
		}
	}

	return (
		<div className='flex items-center justify-center w-screen h-screen'>
			<form
				onSubmit={signinHandler}
				className='border p-5 flex flex-col items-center justify-center'>
				<input
					type='email'
					onChange={(e) =>
						setUserData((prev) => ({
							...prev,
							email: e.target.value,
						}))
					}
				/>
				<input
					type='password'
					onChange={(e) =>
						setUserData((prev) => ({
							...prev,
							password: e.target.value,
						}))
					}
				/>
				<button>Signin</button>
			</form>
		</div>
	)
}

export default Signin
