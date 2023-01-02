import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from '../../store/slices/userSlice'

const Signin = () => {
	const dispatch = useDispatch()

	const [userData, setUserData] = useState({
		email: '',
		password: '',
	})

	const signinHandler = async (e: any) => {
		e.preventDefault()
		dispatch(getUser({ userData }))
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
