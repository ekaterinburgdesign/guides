module.exports = {
    api: {
        HOST: process.env.NEXT_PUBLIC_HOST,
    },
    images: {
        domains: [process.env.NEXT_PUBLIC_IMAGE_DOMAIN],
    },
    async rewrites() {
        return [
            {
                source: '/:pageUrl*',
                destination: '/manuals/:pageUrl*',
            },
        ]
    },
}
