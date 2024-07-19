<template>
  <div class="water-component">
    <span>实时游客拥挤</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="people-sum">
      可预约总量
      <span style="color: yellowgreen">{{ sum }}</span>
      人
    </div>
    <div class="people-num">
      <div class="single-num" v-for="(v, index) in num" :key="index">
        <span>{{ v }}</span>
      </div>
    </div>
    <div class="echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import 'echarts-liquidfill' //水球图
import * as echarts from 'echarts'

let charts = ref()
let sum = ref(9999)
let num = ref('215908人'.split(''))

let option = {
  //标题组件
  title: {
    text: '水球图',
  },
  //x|y轴组件
  xAxis: {},
  yAxis: {},
  //系列:决定你展示什么样的图形图标
  series: {
    type: 'liquidFill', //系列
    data: [0.6, 0.4, 0.2], //展示的数据
    waveAnimation: true, //动画
    animationDuration: 3,
    animationDurationUpdate: 0,
    radius: '90%', //半径
    outline: {
      //外层边框颜色设置
      show: true,
      borderDistance: 8,
      itemStyle: {
        color: 'skyblue',
        borderColor: '#294D99',
        borderWidth: 8,
        shadowBlur: 20,
        shadowColor: 'rgba(0, 0, 0, 0.25)',
      },
    },
  },
  //布局组件
  grid: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.water-component {
  height: 100%;
  width: 100%;
  position: relative;
  & > span {
    position: absolute;
    left: 15px;
    top: 10px;
    font-size: 20px;
    color: #fff;
  }
  & > img {
    position: absolute;
    left: 15px;
    top: 35px;
  }
  .people-sum {
    position: absolute;
    right: 0;
    top: 35px;
    font-size: 20px;
    color: #fff;
  }
  .people-num {
    position: absolute;
    top: 65px;
    display: flex;
    height: 40px;
    width: 100%;
    padding: 0 15px;
    .single-num {
      height: 100%;
      width: calc(100% / 7);
      background: url(../../images/total.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #fff;
      font-size: 20px;
    }
  }
  .echarts {
    position: absolute;
    top: 33%;
    height: 67%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
