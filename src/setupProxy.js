const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
    app.use(
        '/pensjon/opptjening/api/opptjening',
        createProxyMiddleware({
            //target: 'http://localhost:8080/api/opptjening',
            target: 'http://localhost:4000/opptjening',
            changeOrigin: true,
            pathRewrite: {
                //'^/pensjon/opptjening/api/opptjening' : '/'
                '^/pensjon/opptjening/' : '/'
            }
        })
    );
    app.use(
        '/pensjon/opptjening/api/unleash',
        createProxyMiddleware({
            target: 'http://localhost:8080/api/unleash',
           // target: 'http://localhost:4000/unleash',
            changeOrigin: true,
            pathRewrite: {
                '^/pensjon/opptjening/api/unleash' : '/'
               // '^/pensjon/opptjening/' : '/'
            }
        })
    );
};
