import { createProxyMiddleware } from 'http-proxy-middleware';

export default defineEventHandler((event) => {
  createProxyMiddleware({
    target: 'https://graphql.datocms.com',
    changeOrigin: true,
    pathRewrite: { '^/api': '' },
  });
});
