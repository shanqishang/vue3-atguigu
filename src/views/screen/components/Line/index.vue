<template>
  <div class="line-component">
    <span>未来七天游客数量趋势图</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="line-charts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

let option = {
  grid: {
    top: '10%',
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true,
  },
  xAxis: [
    {
      type: 'category',
      show: true,
      boundaryGap: false,
      splitLine: {
        show: false,
      },
      data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
    },
  ],
  yAxis: [
    {
      type: 'value',
      show: true,
      axisLine: {
        show: true,
      },
      splitLine: {
        show: false,
      },
    },
  ],
  series: [
    {
      name: 'Line 1',
      type: 'line',
      smooth: true,
      lineStyle: {
        width: 0,
      },
      showSymbol: false,
      areaStyle: {
        opacity: 0.8,
        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
          {
            offset: 0,
            color: '#90063f',
          },
          {
            offset: 1,
            color: '#0906c7',
          },
        ]),
      },
      emphasis: {
        focus: 'series',
      },
      data: [140, 232, 101, 264, 90, 340, 250],
    },
  ],
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.line-component {
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
  .line-charts {
    position: absolute;
    top: 22%;
    height: 78%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
