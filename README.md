# vue3 + vite2 上手



## 1、vite 快速搭建项目



 ### 1-1、vite 快速初始化项目

具体可参考：https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project



执行命令：

```js
npm init @vitejs/app
```

按照终端提示：

1、输入项目名

![](/imgs/img1.png)

2、选择项目模板

![](/imgs/img2.png)

3、选择类型检查

![](/imgs/img3.png)

到此，vite 就初始还好了一个 vue3 + ts 的项目



### 1-2、vite.config.ts 文件简单配置

具体配置可参考：https://cn.vitejs.dev/config/



> vite.config.ts

```js
// 提示找不到模块 path，安装：npm i @types/node -D
import path from 'path'

// defineConfig 主要是为了获得 ts 类型提示
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import styleImport from 'vite-plugin-style-import'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue()
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

```



### 1-3、集成 scss

使用 scss 只需要安装 sass 即可，Vite 内部已经提供了对 `.scss` 的支持，可参考：https://cn.vitejs.dev/guide/features.html#css-pre-processors

```js
npm install -D sass
```



### 1-4、集成 vue-router4.x

具体可参考：https://next.router.vuejs.org/zh/guide/



1、安装 vue-router4.x：

```js
npm i vue-router@4
```

2、配置路由文件：

```js
src
├── router
│   ├── index.ts
```

```js
import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Home from '@/modules/Home/index.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/mine',
    name: 'Mine',
    component: () => import('@/modules/Mine/index.vue'),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router
```

- 路由创建改为 createRouter 的形式
- 之前的 mode=‘hash’ 改成函数定义形式 `history: createWebHashHistory()`

3、在 main.ts 中使用路由

```js
import { createApp } from 'vue'
import router from './routers'

const app = createApp(App)

app.use(router)
```



### 1-5、集成 vuex4.x

具体可参考：https://next.vuex.vuejs.org/zh/index.html



1、安装：

```js
npm i vuex@next
```

2、基本配置：在 store 目录下，但是目前 vuex4.x 的 modules 形式对 ts 支持十分有限，vuex5.x 会对 vuex 进行重写，那将会更好地支持 ts



## 2、vue3 的使用







