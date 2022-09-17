/** @type {import('next').NextConfig} */
const nextConfig = {
	// reactStrictMode: true,
	swcMinify: true,
	// webpack: (config) => {
	// 	config.resolve.fallback = {
	// 		fs: false,
	// 		net: false,
	// 		tls: false,
	// 		cardinal: false,
	// 	};
	// 	return config;
	// },
};

module.exports = nextConfig;
