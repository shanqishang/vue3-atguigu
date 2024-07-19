import request from '@/utils/request'

enum API {
  CATEGORY_FIRST = '/admin/product/getCategory1',
  CATEGORY_SECOND = '/admin/product/getCategory2',
  CATEGORY_THREE = '/admin/product/getCategory3',
}

export const reqCategoryFirst = () => request.get(API.CATEGORY_FIRST)
export const reqCategorySecond = (id: number) =>
  request.get(API.CATEGORY_SECOND + `/${id}`)
export const reqCategoryThree = (id: number) =>
  request.get(API.CATEGORY_THREE + `/${id}`)
