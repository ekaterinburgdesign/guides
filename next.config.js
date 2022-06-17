module.exports = {
  api: {
    HOST: 'https://guides-api-test.ekaterinburg.design',
  },
  images: {
    domains: ['guides-api-test.ekaterinburg.design'],
  },
  async rewrites() {
    return [
      {
        source: '/:pageUrl*',
        destination: '/manuals/:pageUrl*',
      },
    ];
  },
};