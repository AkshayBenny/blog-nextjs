import bcrypt from 'bcryptjs'

export const hashPassword = async (unHashPass: string) => {
	return bcrypt.hashSync(unHashPass, 10)
}

export const matchPassword = async (password: string, hash: string) => {
	return bcrypt.compareSync(password, hash)
}
