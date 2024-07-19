<template>
  <div class="bar-component">
    <span>热门景区排行</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="bar-echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

const colors: string[] = [
  '#ff0000',
  '#ffa500',
  '#9acd32',
  '#008000',
  '#800080',
  '#ff69b4',
  '#87ceeb',
]

let option = {
  grid: {
    left: '2%',
    top: '5%',
    right: '2%',
    bottom: '5%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      axisPointer: {
        type: 'shadow',
      },
    },
  ],
  yAxis: [
    {
      type: 'value',
      name: 'Precipitation',
    },
  ],
  series: [
    {
      name: 'Evaporation',
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: (params) => {
          let { dataIndex } = params
          return colors[dataIndex]
        },
      },
      showBackground: true,
      backgroundStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#090b3c', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0000e1', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      label: {
        show: true,
        verticalAlign: 'top',
      },
      data: [10, 20, 30, 40, 50, 60, 70],
    },
    {
      name: 'Precipitation',
      type: 'bar',
      itemStyle: {
        borderRadius: [10, 10, 0, 0],
        color: (params) => {
          let { dataIndex } = params
          return colors[dataIndex]
        },
      },
      showBackground: true,
      backgroundStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: '#090b3c', // 0% 处的颜色
            },
            {
              offset: 1,
              color: '#0000e1', // 100% 处的颜色
            },
          ],
          global: false, // 缺省为 false
        },
      },
      label: {
        show: true,
        verticalAlign: 'top',
      },
      data: [10, 20, 30, 40, 50, 60, 72],
    },
    {
      name: 'Temperature',
      type: 'line',
      data: [14, 22, 36, 28, 45, 57, 78],
    },
  ],
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.bar-component {
  height: 100%;
  width: 100%;
  // border: 1px solid red;
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
  .bar-echarts {
    position: absolute;
    top: 24%;
    height: 76%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
