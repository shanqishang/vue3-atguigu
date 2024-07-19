<template>
  <el-drawer v-model="isOpen" direction="rtl">
    <template #header>
      <h4>分配角色（职位）</h4>
    </template>
    <template #default>
      <el-form :model="userRoleForm" label-width="100" label-position="left" ref="userFormRef">
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userRoleForm.username" disabled/>
        </el-form-item>
        <el-form-item label="职位列表">
          <el-checkbox
            v-model="checkAll"
            :indeterminate="isIndeterminate"
            @change="handleCheckAllChange"
          >
            全选
          </el-checkbox>
          <el-checkbox-group
            v-model="checkedRoles"
            @change="handleCheckedRolesChange"
          >
            <el-checkbox v-for="role in roles" :key="role.id" :label="role.roleName" :value="role">
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="closeDrawer">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, defineExpose } from 'vue'
import { reqUserGetRole,reqUserAssignRole} from '@/api/acl/user/index'
import { ElMessage } from 'element-plus';

let isOpen = ref(false)
let userRoleForm:any = ref({})
let username = ref('')
let userId = ref(0)
let allRolesList: any = ref()
let assignRoles: any = ref()

let checkAll = ref(false)
let isIndeterminate = ref(true)
let checkedRoles:any = ref([])
let roles: any = ref([])

//父组件通信
let $emit = defineEmits(['selectUser'])

const handleCheckAllChange = (val: any) => { 
  //全部的角色
  checkedRoles.value = val ? roles.value : []
  isIndeterminate.value = false
}

const handleCheckedRolesChange = (val:any) => {
  const checkedCount = val.length
  checkAll.value = checkedCount === roles.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < roles.value.length
}

const closeDrawer = () => { 
  isOpen.value = false
}

// createTime: "2021-05-31 18:09:18"
// id: 1
// remark: null
// roleName: "超级管理员"
// updateTime: "2023-04-28 11:03:38"

const openDrawer = async (data: any) => {
  //清空数据
  userId.value = data.id
  username.value = data.username
  let res: any = await reqUserGetRole(data.id)
  if (res.code === 200) { 
    allRolesList.value = res.data.allRolesList
    assignRoles.value = res.data.assignRoles

    //获取全部的角色
    roles.value = allRolesList.value
    //获取已经选中的角色
    checkedRoles.value = assignRoles.value
    isOpen.value = true
  }
}

const confirmClick = async () => { 
  //保存
  let roleIdList = ref<number[]>([])
  checkedRoles.value.forEach((item: any) => roleIdList.value.push(item.id))
  let res: any = await reqUserAssignRole(userId.value, roleIdList.value)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '更新用户角色成功'
    })
    //触发父组件的查询
    $emit('selectUser')
    closeDrawer()
  } else { 
    ElMessage({
      type: 'error',
      message: '更新用户角色失败'
    })
    closeDrawer()
  }
}



defineExpose({ closeDrawer, openDrawer })



</script>

<style scoped>

</style>