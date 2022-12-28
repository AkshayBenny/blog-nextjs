import * as jose from 'jose'

const generateToken = async () => {
	const secret = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET)
	const alg = 'HS256'

	const jwt = await new jose.SignJWT({ 'urn:example:claim': true })
		.setProtectedHeader({ alg })
		.setIssuedAt()
		.setIssuer('iss')
		.setAudience('aud')
		.setExpirationTime('2h')
		.sign(secret)

	return jwt
}

export default generateToken
