<template>
  <el-card>
    <div class="category">
      <span>一级分类: </span>
      <el-select
        v-model="firstId"
        placeholder="请选择"
        size="large"
        style="width: 200px"
        @change="getSecondCategory"
      >
        <el-option
          v-for="item in firstCategory"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

    <div class="category">
      <span>二级分类: </span>
      <el-select
        v-model="secondId"
        placeholder="请选择"
        size="large"
        style="width: 200px"
        @change="getThreeCategory"
      >
        <el-option
          v-for="item in secondCategory"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

    <div class="category">
      <span>三级分类: </span>
      <el-select
        v-model="threeId"
        placeholder="请选择"
        size="large"
        style="width: 200px"
      >
        <el-option
          v-for="item in threeCategory"
          :key="item.id"
          :label="item.name"
          :value="item.id"
        />
      </el-select>
    </div>

  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted,watch } from 'vue'
import { reqCategoryFirst,reqCategorySecond,reqCategoryThree } from '@/api/product/attr/index'

let firstCategory = ref([])
let firstId = ref()

let secondCategory = ref([])
let secondId = ref()

let threeCategory = ref([])
let threeId = ref()

const getFirstCategory = async () => {
  let res = await reqCategoryFirst()
  if (res.code === 200) { 
    firstCategory.value = res.data
  }
}

const getSecondCategory = async () => { 
  let res = await reqCategorySecond(firstId.value)
  if (res.code === 200) { 
    secondCategory.value = res.data
  }
}

const getThreeCategory = async () => { 
  let res = await reqCategoryThree(secondId.value)
  if (res.code === 200) { 
    threeCategory.value = res.data

    //查询属性的信息
  }
}

onMounted( async () => { 
  getFirstCategory()
})


</script>

<style scoped lang="scss">
.el-card {
  display: flex;
  align-items: center;
}
</style>