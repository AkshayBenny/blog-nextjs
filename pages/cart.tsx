import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const Cart = () => {
	const router = useRouter()
	const [user, setUser] = useState({})
	const [token, setToken] = useState(null)
	useEffect(() => {
		const myToken = localStorage.getItem('token')
		const userInfo = JSON.parse(localStorage.getItem('userInfo'))
		userInfo && setUser(userInfo)
		myToken ? setToken(myToken) : router.push('/signin')
	}, [])

	useEffect(() => {
		const fetchUserCart = async () => {
			if (user) {
				const { data } = await axios.post(
					'/api/cart',
					{ uid: user._id },
					{
						headers: {
							'Content-Type': 'application/json',
							Accept: 'application/json',
							Authorization: `Bearer ${token}`,
						},
					}
				)
				// console.log(user)
			}
		}
		try {
			fetchUserCart()
		} catch (error) {
			window.alert('Error fetching cart')
		}
	}, [token, user])
	return (
		<div>
			<Navbar userData={user} />
			Cart
		</div>
	)
}

export default Cart
