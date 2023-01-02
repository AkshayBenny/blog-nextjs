import axios from 'axios'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

const Cart = () => {
	const router = useRouter()
	const [user, setUser] = useState({
		_id: '',
		fname: '',
		lname: '',
		email: '',
		phone: '',
		isAdmin: '',
	})
	const [token, setToken] = useState('')
	useEffect(() => {
		const myToken = localStorage.getItem('token')
		const unparsedUserInfo = localStorage.getItem('userInfo')
		const userInfo = unparsedUserInfo && JSON.parse(unparsedUserInfo)
		userInfo && setUser(userInfo)
		myToken ? setToken(myToken) : router.push('/signin')
	}, [])

	useEffect(() => {
		const fetchUserCart = async () => {
			if (user) {
				try {
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
					console.log(data)
				} catch (error) {
					console.log(error)
				}
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
