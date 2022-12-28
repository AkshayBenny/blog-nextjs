import * as jose from 'jose'

const protect = async (token: string) => {
	try {
		const { payload: jwtData } = await jose.jwtVerify(
			token,
			new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
		)
		if (jwtData) {
			return true
		} else {
			return false
		}
	} catch (error) {
		return false
	}
}

export default protect
