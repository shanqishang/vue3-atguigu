<template>
  <div class="map-component" ref="charts"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import chinaJSON from './china.json'
let charts = ref()

echarts.registerMap('china', chinaJSON)

let option = {
  geo: {
    show: true,
    map: 'china',
    roam: true,
    //地图的位置调试
    zoom: 1.5,
    top: 150,
    left: 150,
    bottom: 0,
    right: 150,
    //地图上的文字设置
    label: {
      show: true,
      position: ['50%', '50%'],
      fontSize: 14,
      color: '#fff',
    },
    itemStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'red', // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'blue', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
    },
    emphasis: {
      label: {
        show: true,
        fontSize: 24,
        color: '#fff',
      },
      itemStyle: {
        color: 'red',
      },
    },
  },
  series: [
    {
      type: 'lines',
      data: [
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [119.306239, 26.075302], // 终点
          ],
          lineStyle: {
            color: 'orange',
            width: 5,
          },
        },
        {
          coords: [
            [116.405285, 39.904989], // 起点
            [114.298572, 30.584355], // 终点
          ],
          lineStyle: {
            color: 'yellow',
            width: 5,
          },
        },
      ],
      effect: {
        show: true,
        period: 4,
        symbolSize: 10,
        symbol: 'arrow',
        color: '#000',
      },
    },
  ],
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.map-component {
  height: 100%;
  width: 100%;
  // border: 1px solid red;
}
</style>
