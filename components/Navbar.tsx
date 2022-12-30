import { useRouter } from 'next/router'
import React from 'react'

const Navbar = ({ userData }: any) => {
	const router = useRouter()
	const logoutHandler = () => {
		localStorage.removeItem('token')
		router.reload()
	}
	return (
		<div className='flex items-center justify-between w-full h-12 bg-black text-white px-6 lg:px-16 '>
			<p className=''>
				{userData?.fname} {userData?.lname}
			</p>
			<button
				className='border border-white px-4 py-2'
				onClick={logoutHandler}>
				Log out
			</button>
		</div>
	)
}

export default Navbar
