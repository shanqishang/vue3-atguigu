import request from '@/utils/request'

enum API {
  USER_SELECT = '/admin/acl/user',
  USER_ADD = '/admin/acl/user/save',
  USER_BATCH_REMOVE = '/admin/acl/user/batchRemove',
  USER_UPDATE = '/admin/acl/user/update',
  USER_GET_ROLE = '/admin/acl/user/toAssign',
  USER_ASSIGN_ROLE = '/admin/acl/user/doAssignRole',
  USER_DELETE = '/admin/acl/user/remove',
}

export const reqUserSelect = (
  pageNum: number,
  pageSize: number,
  username: string,
) =>
  request.get(API.USER_SELECT + `/${pageNum}/${pageSize}?username=${username}`)
export const reqUserAdd = (newUser: any) => request.post(API.USER_ADD, newUser)
export const reqUserBatchRemove = (ids: number[]) =>
  request.delete(API.USER_BATCH_REMOVE, { data: ids })
export const reqUserUpdate = (newUser: any) =>
  request.put(API.USER_UPDATE, newUser)
export const reqUserGetRole = (id: number) =>
  request.get(API.USER_GET_ROLE + `/${id}`)
export const reqUserAssignRole = (userId: number, roleIdList: number[]) =>
  request.post(API.USER_ASSIGN_ROLE, { userId, roleIdList })
export const reqUserDelete = (userId: number) =>
  request.delete(API.USER_DELETE + `/${userId}`)
