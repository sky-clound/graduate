// ref: https://umijs.org/config/
import { resolve } from 'path';

export default {
  treeShaking: true,

  // 取消配置式路由
  // routes: [
  //   {
  //     path: '/',
  //     component: '../layouts/index',
  //     routes: [
  //       { path: '/', component: '../pages/index' }
  //     ]
  //   }
  // ],
  plugins: [
    // ref: https://umijs.org/plugin/umi-plugin-react.html
    [
      'umi-plugin-react',
      {
        antd: true,
        dva: true,
        dynamicImport: false,
        title: 'community',
        dll: false,

        routes: {
          // 用于忽略某些路由，比如使用 dva 后，通常需要忽略 models、components、services 等目录
          exclude: [
            /models\//,
            /services\//,
            /model\.(t|j)sx?$/,
            /service\.(t|j)sx?$/,
            /components\//,
          ],
        },
      },
    ],
  ],
  proxy: {
    '/api': {
      target: 'http://localhost:3000/',
      changeOrigin: true,
      pathRewrite: { '^/api': '' },
    },
  },
  alias: {
    components: resolve(__dirname, './src/components/'),
    const: resolve(__dirname, './src/const/'),
    i18n: resolve(__dirname, './src/i18n/'),
    services: resolve(__dirname, './src/services/'),
    utils: resolve(__dirname, './src/utils/'),
    patch: resolve(__dirname, './src/patch/'),
    pages: resolve(__dirname, './src/pages/'),
    assets: resolve(__dirname, './src/assets'),
  },
};
