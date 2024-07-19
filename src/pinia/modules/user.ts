//创建用户小仓库
import { loginForm, loginResponseData } from '@/api/user/type'
import { SET_TOKEN, GET_TOKEN, REMOVE_TOKEN } from '@/utils/token'
import { reqLogin, reqUserInfo } from '@/api/user'
import { defineStore } from 'pinia'
import type { UserState } from './type'
import { constantRoute } from '@/router/router'

const useUserStore = defineStore('user', {
  state: (): UserState => {
    return {
      token: GET_TOKEN(),
      menuRoutes: constantRoute,
      username: '',
      avatar: '', //头像
    }
  },
  actions: {
    //用户登录的方法
    async userLogin(data: loginForm) {
      //1.登录请求
      const result: loginResponseData = await reqLogin(data)
      if (result.code === 200) {
        //2.设置token
        SET_TOKEN(result.data as string)
        return 'ok'
      } else {
        return Promise.reject(new Error(result.message))
      }
    },
    //用户获取信息的方法
    async userInfo() {
      //登录信息
      const userInfo = await reqUserInfo()
      this.username = userInfo.data.name
      this.avatar = userInfo.data.avatar
    },
    loginOut() {
      //清楚仓库信息
      ;(this.menuRoutes = null),
        (this.username = null),
        (this.avatar = null), //头像
        REMOVE_TOKEN() //清楚token
    },
  },
  getters: {},
})

export default useUserStore
