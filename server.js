const express = require('express');
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const app = express();

// 创建反向代理
const proxy = createProxyMiddleware('/api/', {
    target: 'https://mianshuixing.com/',
    changeOrigin: true,
    secure: false,
});

// 将代理附加到 Express 应用
app.use('/api/', proxy);

// 静态文件服务器
app.use(express.static(__dirname + '/'));

// 启动服务器
const port = 8080;
app.listen(port, () => {
    console.log(`服务器已启动在 http://localhost:${port}`);
});
