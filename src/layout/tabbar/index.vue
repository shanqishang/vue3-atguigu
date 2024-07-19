<template>
  <div class="tabbar">
    <div class="left-content">
      <!-- 左侧展开收起 -->
      <el-icon
        style="margin-right: 10px"
        height="20px"
        width="20px"
        @click="settingStore.fold = !settingStore.fold"
      >
        <component :is="settingStore.fold ? 'Expand' : 'Fold'" />
      </el-icon>
      <!-- 左侧面包屑 -->
      <el-breadcrumb :separator-icon="ArrowRight" v-if="isShow">
        <el-breadcrumb-item
          v-for="(item, index) in routeList"
          :key="index"
          v-show="item.meta.title"
          :to="item.path"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span>{{ item.meta.title }}</span>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="right-content">
      <el-button
        size="small"
        icon="Refresh"
        circle
        @click="refresh"
      ></el-button>
      <el-button
        size="small"
        icon="FullScreen"
        circle
        @click="fullScreen"
      ></el-button>
      <el-popover
        placement="bottom"
        title="切换主题色"
        :width="200"
        trigger="click"
        content="this is content, this is content, this is content"
      >
        <div>
          <span class="demonstration">主题色：</span>
          <el-color-picker
            v-model="color"
            @change="changeColor"
            show-alpha
            :predefine="predefineColors"
            :teleported="false"
          />
        </div>
        <div>
          <span>模式切换：</span>
          <el-switch
            @change="changeDark"
            v-model="dark"
            inline-prompt
            class="ml-2"
            active-icon="Moon"
            inactive-icon="Sunny"
          />
        </div>

        <template #reference>
          <el-button size="small" icon="Setting" circle></el-button>
        </template>
      </el-popover>
      <img
        :src="(userStore.avatar as string)"
        style="
          width: 20px;
          height: 20px;
          margin: 0 10px;
          border: 1px solid black;
        "
      />
      <!-- 下拉菜单 -->
      <el-dropdown>
        <span class="el-dropdown-link">
          {{ userStore.username }}
          <el-icon class="el-icon--right">
            <arrow-down />
          </el-icon>
        </span>
        <template #dropdown>
          <el-dropdown-menu @click="loginOut">
            <el-dropdown-item>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import useSettingStore from '@/pinia/modules/setting'
import { reqLogout } from '@/api/user'
//获取当前路由
import { useRouter, useRoute } from 'vue-router'
import { watch, reactive, ref, nextTick } from 'vue'
import useUserStore from '@/pinia/modules/user'

let userStore = useUserStore()
let settingStore = useSettingStore()

let routeList = reactive<any>({})
let isShow = ref(true)

let $router = useRouter()
let $route = useRoute()

//暗黑风格
let dark = ref(false)

const changeDark = () => {
  let html = document.documentElement
  dark.value ? (html.className = 'dark') : (html.className = '')
}

const changeColor = () => {
  //获取
  let html = document.documentElement
  //改变属性
  html.style.setProperty('--el-color-primary', color.value)
}

const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])

watch(
  () => $router.currentRoute.value,
  (newRoute: any) => {
    routeList = newRoute.matched
    isShow.value = false
    nextTick(() => {
      isShow.value = true
    })
  },
  { immediate: true },
)

const refresh = () => {
  settingStore.refresh = false
  nextTick(() => {
    settingStore.refresh = true
  })
}

const fullScreen = () => {
  //判断当前是否为全屏状态
  let isFullScreen = document.fullscreenElement
  if (isFullScreen) {
    document.exitFullscreen()
  } else {
    document.documentElement.requestFullscreen()
  }
}

const loginOut = async () => {
  //1.向服务器发请求退出登录
  await reqLogout()
  //2.清空仓库的数据
  userStore.loginOut()
  //3.跳转到登录页面
  $router.push({ path: '/login', query: { redirect: $route.path } })
}

function getImageUrl(path: string) {
  return new URL(`../../assets/images/${path}`, import.meta.url).href
}
</script>

<style lang="scss" scoped>
.tabbar {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  .left-content {
    width: 70%;
    height: 100%;
    display: flex;
    align-items: center;
    .el-icon {
      font-size: 20px;
    }
    .el-breadcrumb {
      font-size: 16px;
      display: flex;
      align-items: center;
      :deep(.el-breadcrumb__inner) {
        display: flex;
        align-items: center;
      }
    }
  }
  .right-content {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: right;
  }
}
</style>
