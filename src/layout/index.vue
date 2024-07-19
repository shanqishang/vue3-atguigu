<template>
  <div class="layout" :class="{ fold: settingStore.fold ? true : false }">
    <div class="right-menu" :class="{ fold: settingStore.fold ? true : false }">
      <div class="logo">
        <Logo></Logo>
      </div>
      <div class="menu">
        <!-- 路由菜单 -->
        <el-scrollbar class="scrollbar">
          <!-- 递归路由 单节点就是el- -->
          <el-menu
            :default-active="$route.path"
            background-color="#001529"
            text-color="white"
            active-text-color="yellowgreen"
            :collapse="settingStore.fold ? true : false"
          >
            <Menu :menuList="userStore.menuRoutes"></Menu>
          </el-menu>
        </el-scrollbar>
      </div>
    </div>
    <div
      class="left-content"
      :class="{ fold: settingStore.fold ? true : false }"
    >
      <div class="top-tabbar">
        <Tabbar></Tabbar>
      </div>
      <div class="bottom-main">
        <Main></Main>
      </div>
    </div>
  </div>
</template>

<script setup>
import Logo from '@/layout/logo/index.vue'
import useUserStore from '@/pinia/modules/user.ts'
import Menu from '@/layout/menu/index.vue'
import Tabbar from '@/layout/tabbar/index.vue'
import Main from '@/layout/main/index.vue'
import useSettingStore from '@/pinia/modules/setting.ts'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'
//用户小仓库
let userStore = useUserStore()
//设置小仓库
let settingStore = useSettingStore()
let $route = useRoute()

//挂载数据
onMounted(() => {
  userStore.userInfo()
})
</script>

<style lang="scss" scoped>
.layout {
  height: 100%;
  width: 100%;
  display: flex;
  .right-menu {
    width: $menu-base-width;
    height: 100%;
    background-color: $menu-background-color;
    &.fold {
      width: $menu-min-width !important;
    }
    .logo {
      height: 50px;
      width: 100%;
    }
    .menu {
      height: calc(100% - 50px);
      width: 100%;
    }
  }
  .left-content {
    width: calc(100% - $menu-base-width);
    height: 100%;
    &.fold {
      width: calc(100% - $menu-min-width) !important;
    }
    .top-tabbar {
      height: $tabbar-height;
      width: 100%;
    }
    .bottom-main {
      height: calc(100% - $tabbar-height);
      width: 100%;
    }
  }
}
.fold {
}
</style>
