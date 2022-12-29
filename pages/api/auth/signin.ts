// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import dbConnect from '../../../lib/dbConnect'
import generateToken from '../../../lib/generateToken'
import { matchPassword } from '../../../lib/hashPass'
import User from '../../../models/userModel'

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== 'POST') {
		return res.status(405).json({ message: 'Method not allowed' })
	}
	await dbConnect()
	const { email, password } = req.body

	if (!email || !password) {
		res.status(401).send('Incorrect username or password')
	}

	let user
	try {
		user = await User.findOne({
			email: email.toString(),
		})
	} catch (error) {
		console.log(error)
	}

	if (!user) {
		return res.status(404).json({ message: 'User not found.' })
	}

	const hashedPass = user.password
	const correctPass = await matchPassword(password, hashedPass)

	if (!correctPass) {
		return res.status(404).json({ message: 'Incorrect email or password.' })
	}

	const token = await generateToken()

	res.status(201).json({ message: 'Signin successfull', token, user })
}
