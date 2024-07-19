<template>
  <div class="scotter-component">
    <span>年度游客量对比</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="scotter-echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

let option = {
  grid: {
    top: '5%',
    bottom: '10%',
    left: '5%',
    right: '5%',
  },
  xAxis: {
    splitLine: {
      show: false,
    },
  },
  yAxis: {
    axisLine: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    splitLine: {
      show: false,
    },
  },
  series: [
    {
      symbol: 'diamond',
      symbolSize: 18,
      label: {
        show: true,
        position: 'top',
        color: 'red',
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
      data: [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        // [11.0, 8.33],
        [14.0, 7.66],
        // [13.4, 6.81],
        [10.0, 6.33],
        // [14.0, 8.96],
        // [12.5, 6.82],
        [9.15, 7.2],
        // [11.5, 7.2],
        [3.03, 4.23],
        // [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
      ],
      type: 'scatter',
    },
  ],
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.scotter-component {
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
  .scotter-echarts {
    position: absolute;
    top: 20%;
    height: 80%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
