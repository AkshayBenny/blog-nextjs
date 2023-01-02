/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	// async rewrites() {
	//     return [
	//         {
	//             source: '/api/:path*',
	//             destination: 'http://localhost:3000/:path*',
	//         },
	//     ]
	// },
	typescript: {
		// !! WARN !!
		// Dangerously allow production builds to successfully complete even if
		// your project has type errors.
		// !! WARN !!
		ignoreBuildErrors: true,
	},
	reactStrictMode: true,
	swcMinify: true,
}

module.exports = nextConfig
