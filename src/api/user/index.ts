// 统一管理项目用户相关的接口
import request from "@/utils/request";
import type { loginForm, loginResponseData, userResponseData } from './type'

//请求的URL
enum API { 
  LOGIN_URL = '/admin/acl/index/login',
  USERINFO_URL = '/admin/acl/index/info',
  LOGOUT_URL = '/admin/acl/index/logout',
}

//请求
//登录接口
export const reqLogin = (data: loginForm) => request.post<any, loginResponseData>(API.LOGIN_URL, data)
//获取用户信息接口
export const reqUserInfo = () => request.get<any, userResponseData>(API.USERINFO_URL)
//退出登录
export const reqLogout = () => request.post<any, any>(API.LOGOUT_URL)