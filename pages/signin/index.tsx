import { useState } from 'react'

const Signin = () => {
	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const signinHandler = async (e: any) => {
		e.preventDefault()
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
				<button
					type='submit'
					className='bg-black text-white px-4 py-3 hover:bg-gray-800 transition'>
					Signin
				</button>
			</form>
		</div>
	)
}

export default Signin
