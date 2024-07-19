//导入request
import request from "@/utils/request";
import type { TrademarkResponseData } from './type'

//构建API
enum API { 
  //查询品牌信息
  TRADEMARK_SELECT = '/admin/product/baseTrademark',
  TRADEMARK_SAVE = '/admin/product/baseTrademark/save',
  TRADEMARK_DELETE = '/admin/product/baseTrademark/remove',
  TRADEMARK_UPDATE = '/admin/product/baseTrademark/update'
}

export const reqTrademarkSelect = (page: number, limit: number) => request.get<any, TrademarkResponseData>(API.TRADEMARK_SELECT + `/${page}/${limit}`)
export const reqTrademarkSave = (data: any) => request.post(API.TRADEMARK_SAVE, data)
export const reqTrademarkDelete = (id: number) => request.delete(API.TRADEMARK_DELETE + `/${id}`)
export const reqTrademarkUpdate = (data: any) => request.put(API.TRADEMARK_UPDATE, data)