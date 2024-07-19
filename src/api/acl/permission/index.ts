import request from '@/utils/request'

enum API {
  PERMISSION_SELECT = '/admin/acl/permission',
  PERMISSION_ADD = '/admin/acl/permission/save',
  PERMISSION_UPDATE = '/admin/acl/permission/update',
  PERMISSION_DELETE = '/admin/acl/permission/remove',
}

export const permission_select = () => request.get(API.PERMISSION_SELECT)
export const permission_add = (data: any) =>
  request.post(API.PERMISSION_ADD, data)
export const permission_update = (data: any) =>
  request.put(API.PERMISSION_UPDATE, data)
export const permission_delete = (id: number) =>
  request.delete(API.PERMISSION_DELETE + `/${id}`)
