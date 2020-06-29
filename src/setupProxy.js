const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/pensjon/opptjening/api/opptjening',
        createProxyMiddleware({
            target: 'http://localhost:4000/opptjening',
            changeOrigin: true,
            pathRewrite: {
                '^/pensjon/opptjening/' : '/'
            }
        })
    );
};
