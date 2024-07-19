import request from '@/utils/request'

enum API {
  ROLE_SELECT = '/admin/acl/role',
  ROLE_ADD = '/admin/acl/role/save',
  ROLE_UPDATE = '/admin/acl/role/update',
  ROLE_ASSIGN = '/admin/acl/permission/toAssign',
  ROLE_ASSIGN_UPDATE = '/admin/acl/user/doAssignRole',
  ROLE_DELETE = '/admin/acl/role/remove',
}

export const reqRoleSelect = (page: number, size: number, roleName: string) =>
  request.get(API.ROLE_SELECT + `/${page}/${size}/?roleName=${roleName}`)

export const reqRoleAdd = (data: any) => request.post(API.ROLE_ADD, data)

export const reqRoleUpdate = (data: any) => request.put(API.ROLE_UPDATE, data)

export const reqRoleAssign = (roleId: number) =>
  request.get(API.ROLE_ASSIGN + `/${roleId}`)

export const reqRoleAssignUpdate = (data: any) =>
  request.post(API.ROLE_ASSIGN_UPDATE, data)

export const reqRoleDelete = (roleId: any) =>
  request.delete(API.ROLE_DELETE + `/${roleId}`)
