import Link from 'next/link'
import dbConnect from '../lib/dbConnect'
import Product from '../models/productModel'

export default function Home({ products }: any) {
	if (!products) return <div>Loading...</div>
	return (
		<div>
			<h1>Home Page</h1>
			<div className='flex items-center justify-center flex-wrap gap-4'>
				{products &&
					JSON.parse(products).map((product: any) => {
						return (
							<div
								key={product._id}
								className='border p-4 cursor-pointer'>
								<p>{product.name}</p>
								<Link
									className=''
									href={`/product/${product._id}`}>
									See more
								</Link>
							</div>
						)
					})}
			</div>
		</div>
	)
}

export async function getServerSideProps() {
	await dbConnect()

	const result = await Product.find({})
	const products = result.map((doc) => {
		const product = doc.toObject()
		product._id = product._id.toString()
		return product
	})
	return { props: { products: JSON.stringify(products) } }
}
