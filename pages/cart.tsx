import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const Cart = () => {
	const router = useRouter()
	const [user, setUser] = useState()
	useEffect(() => {
		const token = JSON.stringify(localStorage.getItem('token'))
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		if (userInfo) setUser(userInfo)
		if (!token) {
			router.replace('/')
		}
		console.log('>>>>>>>>>>>>>>>>>>>>>', token)
	}, [router])
	return (
		<div>
			<Navbar userData={user} />
			Vart
		</div>
	)
}

export default Cart
