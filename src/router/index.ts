import { createRouter, createWebHashHistory } from "vue-router";
//引入路由配置项
import { constantRoute } from './router'

//创建路由
let router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoute,
  //滚动行为
  scrollBehavior() { 
    return {
      left: 0,
      top: 0
    }
  }

})

export default router;