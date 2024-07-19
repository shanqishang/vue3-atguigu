<template>
  <div class="screen">
    <div class="content" ref="content">
      <div class="top">
        <Top></Top>
      </div>
      <div class="bottom">
        <div class="bottom-left">
          <div class="water">
            <Water></Water>
          </div>
          <div class="gender">
            <Gender></Gender>
          </div>
          <div class="age">
            <Age></Age>
          </div>
        </div>
        <div class="bottom-center">
          <div class="map">
            <Map></Map>
          </div>
          <div class="line">
            <Line></Line>
          </div>
        </div>
        <div class="bottom-right">
          <div class="bar">
            <Bar></Bar>
          </div>
          <div class="scotter">
            <Scotter></Scotter>
          </div>
          <div class="radar">
            <Radar></Radar>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Top from '@/views/screen/components/Top/index.vue'
import Water from '@/views/screen/components/Water/index.vue'
import Gender from '@/views/screen/components/Gender/index.vue'
import Age from '@/views/screen/components/Age/index.vue'
import Bar from '@/views/screen/components/Bar/index.vue'
import Radar from '@/views/screen/components/Radar/index.vue'
import Scotter from '@/views/screen/components/Scotter/index.vue'
import Map from '@/views/screen/components/Map/index.vue'
import Line from '@/views/screen/components/Line/index.vue'

let content = ref()

//计算缩放比例
function getScale(h = 1080, w = 1920) {
  let ww = window.innerWidth / w
  let wh = window.innerHeight / h
  return ww < wh ? ww : wh
}

//拉取图片
onMounted(() => {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
  console.log('111', content.value.style)
})

//监听窗口变化
window.onresize = () => {
  content.value.style.transform = `scale(${getScale()}) translate(-50%,-50%)`
}
</script>

<style lang="scss" scoped>
.screen {
  height: 100vh;
  width: 100vw;
  background: url(./images/bg.png) no-repeat;
  background-size: cover;
  .content {
    position: fixed;
    transform-origin: left top;
    left: 50%;
    top: 50%;
    width: 1920px;
    height: 1080px;
    // background-color: red;
    // border: 1px solid black;
    .top {
      position: absolute;
      top: 0;
      height: 70px;
      width: 100%;
      z-index: 1;
      display: flex;
    }
    .bottom {
      position: absolute;
      top: 50px;
      z-index: 1;
      height: calc(100% - 50px);
      width: 100%;
      display: flex;
      justify-content: space-between;
      .bottom-left {
        width: 28%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        .water,
        .gender,
        .age {
          width: 100%;
          height: 32%;
          // border: 1px solid red;
          background: url(./images/dataScreen-main-lb.png) no-repeat;
          background-size: cover;
        }
      }
      .bottom-center {
        width: 42%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        padding-bottom: 10px;
        .map {
          margin-top: 30px;
          height: 64%;
          width: 100%;
        }
        .line {
          margin-top: 20px;
          height: 33%;
          width: 100%;
          background: url(./images/dataScreen-main-cb.png) no-repeat;
          background-size: cover;
        }
      }
      .bottom-right {
        width: 28%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;

        .bar,
        .scotter,
        .radar {
          width: 100%;
          height: 32%;
          // border: 1px solid red;
          background: url(./images/dataScreen-main-lb.png) no-repeat;
          background-size: cover;
        }
      }
    }
  }
}
</style>
