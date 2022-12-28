import Image from 'next/image'
import dbConnect from '../../lib/dbConnect'
import Product from '../../models/productModel'

const ProductId = ({ product }: any) => {
	const productData = JSON.parse(product)
	return (
		<div>
			<h1>{productData?.name}</h1>
			{/* <Image
				src={productData?.image}
				height={100}
				width={100}
				alt={productData?.name}
			/> */}
		</div>
	)
}

export default ProductId

export async function getStaticProps({ params }) {
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
