const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/api/opptjening',
        createProxyMiddleware({
            target: 'http://localhost:4000/opptjening',
            changeOrigin: true,
        })
    );
};
