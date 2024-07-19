//将所有的图标组件注册为全局组件
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Category from '@/components/Category/index.vue'

const globalComponent: any = { Category }

export default {
  install(app: any) {
    //注册所有的图标组件为全局组件
    Object.keys(globalComponent).forEach((key) => {
      app.component(key, globalComponent[key])
    })
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
      app.component(key, component)
    }
  },
}
