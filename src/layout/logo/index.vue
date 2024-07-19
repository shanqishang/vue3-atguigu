<template>
  <div class="logo">
    <img :src="getImageUrl(setting.logo)" />
    <span v-if="!settingStore.fold">{{ setting.title }}</span>
  </div>
</template>

<script setup lang="ts">
import setting from '@/setting'
import useSettingStore from '@/pinia/modules/setting'

let settingStore = useSettingStore()

//根据图片构建url
function getImageUrl(path: string) {
  return new URL(`../../assets/images/${path}`, import.meta.url).href
}
</script>

<style scoped lang="scss">
.logo {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  color: #fff;
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 10px;
  img {
    height: 40px;
    width: 40px;
  }
  span {
    font-size: 25px;
    font-weight: 600;
  }
}
</style>
