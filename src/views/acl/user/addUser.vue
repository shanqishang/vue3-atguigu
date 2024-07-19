<template>
  <el-drawer v-model="isOpen" direction="rtl">
    <template #header>
      <h4>{{ props.option }}用户</h4>
    </template>
    <template #default>
      <el-form
        :model="userForm"
        label-width="100"
        :rules="rules"
        label-position="left"
        ref="userFormRef"
      >
        <el-form-item label="用户姓名" prop="username">
          <el-input v-model="userForm.username" />
        </el-form-item>
        <el-form-item label="用户昵称" prop="name">
          <el-input v-model="userForm.name" />
        </el-form-item>
        <el-form-item
          label="用户密码"
          prop="password"
          v-if="props.option !== '修改'"
        >
          <el-input v-model="userForm.password" />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="closeDrawer">取消</el-button>
        <el-button type="primary" @click="confirmClick(userFormRef)">
          确认
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { reqUserAdd, reqUserUpdate } from '@/api/acl/user/index'
import { ElMessage } from 'element-plus'

let isOpen = ref(false)
let userFormRef: any = ref()

let props = defineProps(['option'])

let userForm = ref({
  id: 0,
  name: '',
  password: '',
  username: '',
})

let $emit = defineEmits(['selectUser'])

const confirmClick = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      //关闭

      //校验通过
      let res: any = await reqUserAdd(userForm.value)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: `${props.option}成功`,
        })
        $emit('selectUser')
        closeDrawer()
      } else {
        ElMessage({
          type: 'error',
          message: `${props.option}失败`,
        })
        closeDrawer()
      }
    } else {
      console.log('error submit!', fields)
    }
  })
}

const rules = reactive({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, message: '用户名最少5个字符', trigger: 'blur' },
  ],
  name: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
    { min: 5, message: '昵称最少5个字符', trigger: 'blur' },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, message: '密码最少6个字符', trigger: 'change' },
  ],
})

const openDrawer = (data?: any) => {
  if (data) {
    //更新表单
    userForm.value = data
  } else {
    //重置表单
    userForm.value = {
      id: 0,
      name: '',
      password: '',
      username: '',
    }
  }
  isOpen.value = true
}

const closeDrawer = () => {
  //清除表单校验
  userFormRef.value.clearValidate()
  isOpen.value = false
}

defineExpose({ openDrawer, closeDrawer })
</script>

<style scoped lang="scss"></style>
