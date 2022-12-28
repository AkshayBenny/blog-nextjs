// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import generateToken from '../../../lib/generateToken'
import { hashPassword } from '../../../lib/hashPass'
import User from '../../../models/userModel'
// type Data = {
// 	fname: string
// 	lname: string
// 	phone: string
// 	email: string
// 	password: string
// }

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}
	await dbConnect()
	const { fname, lname, phone, email, password } = req.body
	const hashedPass = await hashPassword(password)
	const createdUser = await User.create({
		fname,
		lname,
		phone,
		email,
		password: hashedPass,
	})

	const token = await generateToken()

	res.status(201).json({ message: 'User registered', createdUser, token })
}
