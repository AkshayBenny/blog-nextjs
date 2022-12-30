// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { jwtVerify } from 'jose'
import type { NextApiRequest, NextApiResponse } from 'next'
import { isConstructorDeclaration } from 'typescript'
import dbConnect from '../../lib/dbConnect'
import Cart from '../../models/cartModel'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}
	await dbConnect()

	const token = req.headers.authorization?.split(' ')[1]
	if (token) {
		const secret = new TextEncoder().encode(
			process.env.NEXT_PUBLIC_JWT_SECRET
		)
		try {
			// verify token
			const { payload, protectedHeader } = await jwtVerify(
				token,
				secret,
				{
					issuer: 'iss', // issuer
					audience: 'aud', // audience
				}
			)
			// log values to console
			console.log(payload)
			console.log(protectedHeader)
		} catch (e) {
			// token verification failed
			console.log('Token is invalid')
		}
	}

	const { uid } = req.body
	let userCart
	try {
		const cartExists = await Cart.findOne({
			user: uid,
		})
		if (cartExists) {
			res.status(201).json({ userCart })
		}
	} catch (error) {
		console.log(error)
		res.status(404).json({
			message: 'Failed to fetch cart associated with the uid',
		})
	}

	res.json({ userCart })
}
