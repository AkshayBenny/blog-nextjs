// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { hashPassword } from '../../../lib/hashPass'
import User from '../../../models/userModel'
type Data = {
	fname: string
	lname: string
	phone: string
	email: string
	password: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}

	const { fname, lname, phone, email, password } = req.body
	const hashedPass = await hashPassword(password)
	const createdUser = await User.create({
		fname,
		lname,
		phone,
		email,
		password: hashedPass,
	})
	console.log(createdUser)

	res.json({ fname, lname })
}