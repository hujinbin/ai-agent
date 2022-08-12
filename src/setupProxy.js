const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(
        proxy.createProxyMiddleware(
            '/api', {
                target: 'https://ops.ydctml.top',
                changeOrigin: true,
            }
        )
    )
}