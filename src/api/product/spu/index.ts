import request from '@/utils/request'

enum API { 
  SPU_SELECT = '/admin/product/list',
  SPU_INFO = '/admin/product/getSkuInfo',
  SPU_DELETE = '/admin/product/deleteSku'
}

export const reqSpuSelect = (page: number, size: number) => request.get(API.SPU_SELECT + `/${page}/${size}`)
export const reqSpuInfo = (id:number) => request.get(API.SPU_INFO+`/${id}`) 
export const reqSpuDelete = (id:number) => request.delete(API.SPU_DELETE+`/${id}`)