<template>
  <div class="age-component">
    <span>年龄比例</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="age-ratio" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

let option = {
  tooltip: {
    trigger: 'item',
  },
  legend: {
    orient: 'vertical',
    top: '10%',
    right: '10%',
    textStyle: {
      color: '#fff',
      fontSize: 16,
    },
  },
  series: [
    {
      name: '年龄比例',
      type: 'pie',
      center: ['50%', '50%'],
      radius: ['45%', '75%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2,
      },
      label: {
        position: 'inside',
        color: '#fff',
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 25,
          fontWeight: 'bold',
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 1048, name: '军事' },
        { value: 735, name: '新闻' },
        { value: 580, name: '直播' },
        { value: 484, name: '娱乐' },
        { value: 300, name: '财经' },
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
.age-component {
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
  .age-ratio {
    position: absolute;
    top: 20%;
    height: 80%;
    width: 100%;
    // border: 1px solid red;
  }
}
</style>
