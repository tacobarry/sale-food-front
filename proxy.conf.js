const proxy = [
  {
    "context": "/api",
    "target": "http://localhost:8080",
    "secure": true,
    "changeOrigin": true
  }
];

module.exports = proxy;