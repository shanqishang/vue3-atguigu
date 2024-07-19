<template>
  <div class="login">
    <div class="login-div">
      <h2>欢迎来到鼓励商城</h2>
      <el-form
        class="login-form"
        :model="form"
        label-width="auto"
        :rules="rules"
        ref="ruleFormRef"
      >
        <el-form-item label="用户名：" prop="username">
          <el-input :prefix-icon="User" v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码：" prop="password">
          <el-input
            type="password"
            :prefix-icon="Lock"
            v-model="form.password"
            show-password
          />
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            class="login-button"
            size="default"
            @click="login"
          >
            登录
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import type { loginForm } from '@/api/user/type'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/pinia/modules/user'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getTime } from '@/utils/time'
//常见登录表单
let form = reactive<loginForm>({
  username: 'admin',
  password: '111111',
})
let loading = ref<boolean>(false)

let $router = useRouter()
let $route = useRoute()

const ruleFormRef = ref() //表单实例

// const rules = reactive({
//   username: [
//     { required: true, min: 5, max: 10, message: '用户名长度在5-10之间', trigger: 'blur' },
//   ],
//   password: [
//     { required: true, min: 6, max: 10, message: '密码长度在6-10之间', trigger: 'change' },
//   ]
// })
const validateUsername = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('用户名不能为空'))
  } else {
    if (value.length >= 5 && value.length <= 10) {
      callback()
    } else {
      callback(new Error('用户名的长度范围在5-10之间'))
    }
  }
}

const validatePassword = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('密码不能为空'))
  } else {
    if (value.length >= 6 && value.length <= 10) {
      callback()
    } else {
      callback(new Error('密码的长度范围在6-10之间'))
    }
  }
}

//自定义检验规则
const rules = reactive({
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'change' }],
})

//登录
let useStore = useUserStore()
const login = async () => {
  //登录请求，将登录获取到的token保存到localStorage
  loading.value = true
  try {
    //首先检验格式
    await ruleFormRef.value.validate()
    //登录
    await useStore.userLogin(form)
    //跳转路由 / 判断当前路径是否含有redirect
    let redirect: any = $route.query.redirect
    console.log('333333', redirect)
    $router.push({ path: redirect || '/' })
    //提示登录成功
    ElNotification({
      type: 'success',
      title: `${getTime()}，好`,
      message: '欢迎回来',
    })
    //加载动画结束
    loading.value = false
  } catch (e) {
    loading.value = false
    ElNotification({
      type: 'error',
      title: (e as Error).message,
    })
  }
}
</script>

<style scoped lang="scss">
.login {
  height: 100%;
  width: 100%;
  background: url('../../assets/images/background.jpg') no-repeat;
  background-size: cover;
  h2 {
    font-size: 25px;
    margin: 20px 0;
  }
  .login-div {
    position: absolute;
    left: 55%;
    top: 50%;
    transform: translateY(-50%);
    border-radius: 10px;
    background-color: #e8e6e655;
    padding: 20px;
    width: 40%;
    .login-form {
      :deep(.el-form-item__label) {
        color: #000;
      }
      .login-button {
        width: 100%;
      }
    }
  }
}
</style>
