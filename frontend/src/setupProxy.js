const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  // Proxy Java Servlets requests.
  app.use(
    '/api/v1',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
  app.use(
    '/_ah',
    createProxyMiddleware({
      target: 'http://localhost:8080',
      changeOrigin: true,
    })
  );
};
