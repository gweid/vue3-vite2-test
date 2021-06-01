// 提示找不到模块 path，安装：npm i @types/node -D
import path from 'path'

// defineConfig 主要是为了获得 ts 类型提示
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // element-plus 按需引入
    styleImport({
      libs: [{
        libraryName: 'element-plus',
        esModule: true,
        ensureStyleFile: true,
        resolveStyle: (name) => {
          name = name.slice(3)
          return `element-plus/packages/theme-chalk/src/${name}.scss`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        }
      }]
    })
  ],
  // 打包基础路径，类似 publicPath
  base: './',
  resolve: {
    // 配置路径别名
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    // open: true, // 是否自动打开浏览器
    port: 3000, // 端口号
    cors: true, // 允许跨域
    // hmr: true, // 使用 hmr
    // 配置代理
    // proxy: {
    //   '/api': {
    //     target: 'http://xx.xx.xxx:9000',
    //     changeOrigin: true,
    //     rewrite: (path) => path.replace(/^\/api/, '')
    //   }
    // }
  }
})
