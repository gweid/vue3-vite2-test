import { App } from 'vue'
import {
  ElButton,
  ElLoading,
  ElMessage,
} from 'element-plus'

const ELComponents = [
  ElButton,
]
export const registerELCom = (app: App<Element>)  => {
  ELComponents.forEach(com => {
    app.component(com.name, com)
  })
}

const ELPlugins = [
  ElLoading,
  ElMessage,
]
export const registerELPlugin = (app: App<Element>)  => {
  ELPlugins.forEach((plugin) => {
    app.use(plugin)
  })
}