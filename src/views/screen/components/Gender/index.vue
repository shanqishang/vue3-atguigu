<template>
  <div class="gender-component">
    <span>男女比例</span>
    <img src="../../images/dataScreen-title.png" alt />
    <div class="gender-image">
      <div class="man-image">
        <img src="../../images/man.png" alt />
      </div>
      <div class="woman-image">
        <img src="../../images/woman.png" alt />
      </div>
    </div>
    <div class="gender-ratio">
      <div>男士58%</div>
      <div>女士42%</div>
    </div>
    <div class="gender-bar" ref="charts"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'

let charts = ref()

let option = {
  grid: {
    top: '2%',
    left: '3%',
    right: '4%',
    bottom: '3%',
  },
  xAxis: {
    type: 'value',
    show: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
  },
  yAxis: {
    type: 'category',
    show: false,
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLabel: {
      show: false,
    },
    data: ['gender'],
  },
  series: [
    {
      name: 'man',
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: 'skyblue',
        borderRadius: 10,
      },
      zlevel: 2,
      barGap: '-100%',
      data: [52],
    },
    {
      name: 'woman',
      type: 'bar',
      barWidth: 20,
      itemStyle: {
        color: 'pink',
        borderRadius: 10,
      },
      zlevel: 1,
      data: [100],
    },
  ],
}

onMounted(() => {
  let myCharts = echarts.init(charts.value)
  myCharts.setOption(option)
})
</script>

<style scoped lang="scss">
.gender-component {
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
  .gender-image {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -65%);
    width: 250px;
    height: 120px;
    display: flex;
    justify-content: space-between;
    .man-image {
      background: url(../../images/man-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
    }
    .woman-image {
      background: url(../../images/woman-bg.png) no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
    }
  }
  .gender-ratio {
    width: 100%;
    position: absolute;
    top: 70%;
    color: #fff;
    display: flex;
    justify-content: space-around;
    font-size: 18px;
  }
  .gender-bar {
    position: absolute;
    width: 80%;
    height: 20%;
    top: 78%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
