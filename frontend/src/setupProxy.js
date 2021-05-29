//백엔드 api 요청으로 넘겨주는 프록시 코드이다.
//처음엔 왜 있는지 몰랐는데, 없으니까 CORS policy 오류가 뜬다.

const proxy = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        proxy({
            target : 'http://localhost:8000', // hostname:3000/api로 들어온 요청을 이 주소로 연결한다
            changeOrigin : true,
            pathRewrite : {
                "^/api" : ""
            }
        })
    );
};
