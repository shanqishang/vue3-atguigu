<template>
  <!-- 路由的出口位置 -->
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="settingStore.refresh" />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import useSettingStore from '@/pinia/modules/setting'

let settingStore = useSettingStore()
</script>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
