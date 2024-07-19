<template>
  <div class="top">
    <div class="left">
      <div class="left-button" @click="goHome">
        <span>首 页</span>
      </div>
    </div>
    <div class="center">
      <span>智慧旅游可视化大数据平台</span>
    </div>
    <div class="right">
      <div class="right-button">
        <span>统 计 报 告</span>
      </div>
      <div class="right-time">
        <span>当前时间：{{ time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetDate } from '@/utils/time'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'

let time = ref()

let $router = useRouter()

const goHome = () => {
  $router.push({ path: '/home' })
}

onMounted(() => {
  time.value = GetDate('YYYY年MM月DD日 HH:mm:ss')
  setInterval(() => {
    time.value = GetDate('YYYY年MM月DD日 HH:mm:ss')
  }, 1000)
})
</script>

<style scoped lang="scss">
.top {
  height: 100%;
  width: 100%;
  .left {
    width: 30%;
    height: 50px;
    background: url(../../images/dataScreen-header-left-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: end;
    .left-button {
      width: 150px;
      height: 100%;
      background: url(../../images/dataScreen-header-btn-bg-l.png);
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29fcff;
      font-size: 18px;
      &:hover {
        cursor: pointer;
      }
    }
  }
  .center {
    width: 40%;
    height: 70px;
    background: url(../../images/dataScreen-header-center-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #29fcff;
    font-size: 26px;
  }
  .right {
    width: 30%;
    height: 50px;
    background: url(../../images/dataScreen-header-right-bg.png) no-repeat;
    background-size: cover;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .right-button {
      width: 150px;
      height: 100%;
      background: url(../../images/dataScreen-header-btn-bg-r.png);
      background-size: cover;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29fcff;
      font-size: 18px;
      &:hover {
        cursor: pointer;
      }
    }
    .right-time {
      width: 330px;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #29fcff;
      font-size: 18px;
    }
  }
}
</style>
