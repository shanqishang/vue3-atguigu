<template>
  <el-drawer v-model="drawer" direction="rtl">
    <template #title>
      <span>查看商品的详情</span>
    </template>
    <template #default>
      <el-form
        label-position="left"
        label-width="100"
        :model="skuInfo"
      >
        <el-form-item label="名称" label-position="left">
          <span>{{skuInfo.skuName}}</span>
        </el-form-item>
        <el-form-item label="描述" label-position="left">
          <span>{{skuInfo.skuDesc}}</span>
        </el-form-item>
        <el-form-item label="价格" label-position="left">
          <span>{{skuInfo.price}}</span>
        </el-form-item>
        <el-form-item label="平台属性" label-position="left">
          <template #default>
            <el-tag style="margin-right:10px;" type="primary" v-for="(item,index) in skuInfo.skuAttrValueList" :key="index">{{item.valueName}}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="销售属性" label-position="left">
          <template #default>
            <el-tag style="margin-right:10px;" type="primary" v-for="(item,index) in skuInfo.skuSaleAttrValueList" :key="index">{{item.saleAttrValueName}}</el-tag>
          </template>
        </el-form-item>
        <el-form-item label="商品图片" label-position="left">
          <template #default>
            <el-carousel :interval="4000" type="card" style="height:150px;width:500px;">
              <el-carousel-item v-for="(item,index) in skuInfo.skuImageList" :key="index">
                <img :src="item.imgUrl" style="height:100%;width:100%;" />
              </el-carousel-item>
            </el-carousel>
          </template>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref,watch  } from 'vue'

// "data": {
//         "id": 13011,
//         "createTime": "2024-07-13 22:04:54",
//         "updateTime": "2024-07-13 22:04:54",
//         "spuId": 6769,
//         "price": 3,
//         "skuName": "abc",
//         "skuDesc": "aaaaaaffff",
//         "weight": "1.00",
//         "tmId": 1,
//         "category3Id": 189,
//         "skuDefaultImg": "",
//         "isSale": 0,
//         "skuImageList": [
//             {
//                 "id": 683,
//                 "createTime": "2024-07-12 21:51:38",
//                 "updateTime": "2024-07-12 21:51:38",
//                 "skuId": 13002,
//                 "imgName": "8ea47cf5f9845166(5).jpg",
//                 "imgUrl": "http://39.98.123.211/group2/M00/02/DC/rBHu8mGyP16AOekUAAFeX6oRIz0531.jpg",
//                 "spuImgId": 58,
//                 "isDefault": null
//             },
//             {
//                 "id": 684,
//                 "createTime": "2024-07-12 21:51:38",
//                 "updateTime": "2024-07-12 21:51:38",
//                 "skuId": 13002,
//                 "imgName": "8ea47cf5f9845166(4).jpg",
//                 "imgUrl": "http://39.98.123.211/group2/M00/02/DC/rBHu8mGyP16AJOUFAAAON3tMr7k619.jpg",
//                 "spuImgId": 57,
//                 "isDefault": null
//             },
//             {
//                 "id": 685,
//                 "createTime": "2024-07-12 21:51:38",
//                 "updateTime": "2024-07-12 21:51:38",
//                 "skuId": 13002,
//                 "imgName": "8ea47cf5f9845166.jpg",
//                 "imgUrl": "http://39.98.123.211/group2/M00/02/DC/rBHu8mGyP16AJe3YAACJgnTTU5E348.jpg",
//                 "spuImgId": 59,
//                 "isDefault": null
//             }
//         ],
//         "skuAttrValueList": [
//             {
//                 "id": 22824,
//                 "createTime": "2024-07-13 22:04:54",
//                 "updateTime": "2024-07-13 22:04:54",
//                 "attrId": 73,
//                 "valueId": 189401,
//                 "skuId": 13011,
//                 "attrName": "阿飞无法2方",
//                 "valueName": "1111111"
//             },
//             {
//                 "id": 22825,
//                 "createTime": "2024-07-13 22:04:54",
//                 "updateTime": "2024-07-13 22:04:54",
//                 "attrId": 35440,
//                 "valueId": 341250,
//                 "skuId": 13011,
//                 "attrName": "三星",
//                 "valueName": "33"
//             },
//             {
//                 "id": 22826,
//                 "createTime": "2024-07-13 22:04:54",
//                 "updateTime": "2024-07-13 22:04:54",
//                 "attrId": 37264,
//                 "valueId": 345495,
//                 "skuId": 13011,
//                 "attrName": "xy",
//                 "valueName": "yyyyy"
//             },
//             {
//                 "id": 22827,
//                 "createTime": "2024-07-13 22:04:54",
//                 "updateTime": "2024-07-13 22:04:54",
//                 "attrId": 37302,
//                 "valueId": 345506,
//                 "skuId": 13011,
//                 "attrName": "123",
//                 "valueName": "2222"
//             }
//         ],
//         "skuSaleAttrValueList": [
//             {
//                 "id": 10435,
//                 "createTime": "2024-07-13 22:04:54",
//                 "updateTime": "2024-07-13 22:04:54",
//                 "skuId": 13011,
//                 "spuId": 6769,
//                 "saleAttrValueId": 32713,
//                 "saleAttrId": 1,
//                 "saleAttrName": "颜色",
//                 "saleAttrValueName": "aaaa"
//             }
//         ]
//     },

let props: any = defineProps(['info', 'msg'])

let skuInfo: any = ref()

watch(() => props.info, (newValue) => { 
  skuInfo.value = newValue
  console.log("11111111",skuInfo.value);
}, { immediate: true })

let drawer = ref(false)

const openDrawer = () => { 
  drawer.value = true
}

const closeDrawer = () => { 
  drawer.value = false
}

//这里需要暴露出去不然父组件调用不到这个数据
defineExpose({ openDrawer,closeDrawer })

</script>

<style scoped lang="scss">

</style>