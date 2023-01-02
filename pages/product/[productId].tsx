import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import dbConnect from '../../lib/dbConnect'
import Product from '../../models/productModel'

const ProductId = ({ product }: any) => {
	const [qty, setQty] = useState(1)
	const [user, setUser] = useState({
		_id: '',
		fname: '',
		lname: '',
		email: '',
		phone: '',
		isAdmin: '',
	})
	const router = useRouter()
	const productData = JSON.parse(product)

	useEffect(() => {
		const unpatsedUserInfo = localStorage.getItem('userInfo')
		const userInfo = unpatsedUserInfo && JSON.parse(unpatsedUserInfo)
		if (userInfo) setUser(userInfo)
	}, [router, user])

	const addToCartHandler = async () => {
		const token = localStorage.getItem('token')
		if (!token) router.push('/signin')

		try {
			const { data } = await axios.post(
				'/cart',
				{
					pid: router.query.productId,
					quantity: qty,
					uid: user._id,
				},
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
	return (
		<div>
			<h1>{productData?.name}</h1>
			{/* <Image
				src={productData?.image}
				height={100}
				width={100}
				alt={productData?.name}
			/> */}
			<div className='flex items-center justify-center gap-3 my-6'>
				<button
					className='bg-black text-white hover:bg-gray-800 transition px-4 py-2'
					onClick={() => setQty((prev): any => prev > 1 && prev - 1)}>
					-
				</button>
				<input
					className='border px-4 py-2 w-fit'
					type='number'
					value={qty}
				/>
				<button
					className='bg-black text-white hover:bg-gray-800 transition px-4 py-2'
					onClick={() => setQty((prev: any) => prev + 1)}>
					+
				</button>
			</div>
			<button
				onClick={addToCartHandler}
				className='bg-black px-3 py-2 text-white cursor-pointer hover:bg-gray-700 transition'>
				Add to cart
			</button>
		</div>
	)
}

export default ProductId

export async function getStaticProps({ params }: any) {
	await dbConnect()
	const { productId: id } = params

	const product = await Product.findById(id)

	return {
		props: {
			product: JSON.stringify(product),
		},
	}
}

export async function getStaticPaths() {
	await dbConnect()
	const params: any = []
	const result = await Product.find({})
	const products = result.map((doc) => {
		const product = doc.toObject()
		product._id = product._id.toString()
		return product
	})
	products &&
		products.forEach((product: any) => {
			params.push({ params: { productId: product._id.toString() } })
		})
	return {
		paths: params,
		fallback: 'blocking',
	}
}
