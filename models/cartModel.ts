import mongoose from 'mongoose'

const CartSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},

		cartItems: [
			{
				product: {
					type: mongoose.Schema.Types.ObjectId,
					required: true,
					ref: 'Product',
				},
				quantity: {
					type: Number,
					default: 1,
				},
				price: {
					type: Number,
					required: true,
					default: 0,
				},
			},
		],
	},
	{
		timestamps: true,
	}
)

export default mongoose.models.CartSchema || mongoose.model('Cart', CartSchema)
