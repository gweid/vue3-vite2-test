import { createApp } from 'vue'
import App from './App.vue'
import router from './routers'
import store from './store'

// element-plus
import { registerELCom, registerELPlugin } from './plugins/elementPlus'
import 'element-plus/packages/theme-chalk/src/base.scss'

const app = createApp(App)

// 注册 element-plus 的组件和插件
registerELCom(app)
registerELPlugin(app)

app.use(router)
app.use(store)
app.mount('#app')
