<template>
  <div class="radar-component">
    <span>数据统计</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="radar-echarts" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()
let option = {
  radar: {
    // shape: 'circle',
    indicator: [
      { name: '好感', max: 6500 },
      { name: '消费', max: 16000 },
      { name: '景点', max: 30000 },
      { name: '喜好', max: 38000 },
      { name: '小吃', max: 52000 },
      { name: '出行', max: 25000 },
    ],
  },
  series: [
    {
      name: 'Budget vs spending',
      type: 'radar',
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: 'Allocated Budget',
        },
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: 'Actual Spending',
        },
      ],
    },
  ],
}

onMounted(() => {
  let myEcharts = echarts.init(charts.value)
  myEcharts.setOption(option)
})
</script>

<style scoped lang="scss">
.radar-component {
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
  .radar-echarts {
    position: absolute;
    top: 20%;
    height: 80%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
