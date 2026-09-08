module.exports = {
  images: {
    domains: ['raw.githubusercontent.com', 'avatars.githubusercontent.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "frame-src 'self' https://*.vercel.app https://*.railway.app https://numericle.space https://lang.tours https://shashwatraj.com",
          },
        ],
      },
    ]
  },
}
