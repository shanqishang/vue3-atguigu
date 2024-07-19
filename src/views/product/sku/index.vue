<template>
  <div class="sku">
    <el-card>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column
          type="index"
          label="序号"
          header-align="center"
          width="80"
        />
        <el-table-column
          prop="skuName"
          label="名称"
          header-align="center"
          show-overflow-tooltip
          width="160"
        />
        <el-table-column
          prop="skuDesc"
          label="描述"
          header-align="center"
          show-overflow-tooltip
          width="160"
        />
        <el-table-column label="图片" header-align="center" width="250">
          <template #default="scope">
            <img :src="scope.row.skuDefaultImg" height="100" width="150" />
          </template>
        </el-table-column>
        <el-table-column
          prop="weight"
          label="重量"
          header-align="center"
          width="160"
        />
        <el-table-column
          prop="price"
          label="价格"
          header-align="center"
          width="160"
        />
        <el-table-column label="操作" header-align="center">
          <template #default="scope">
            <el-button
              type="primary"
              size="small"
              icon="Plus"
              title="添加SKU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="Edit"
              title="修改SPU"
            ></el-button>
            <el-button
              type="primary"
              size="small"
              icon="View"
              @click="selectSKU(scope.row.id)"
              title="查看SKU列表"
            ></el-button>
            <el-popconfirm
              title="确定要删除这条数据吗？"
              @confirm="deleteSKU(scope.row.id)"
            >
              <template #reference>
                <el-button
                  type="primary"
                  size="small"
                  icon="Delete"
                  title="删除SPU"
                ></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination
        style="margin-top: 20px"
        background
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30, 50]"
        layout="prev, pager, next, jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
    <Drawer ref="sku" :info="info" :msg="msg"></Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, watch } from 'vue'
import { reqSpuSelect, reqSpuInfo, reqSpuDelete } from '@/api/product/spu/index'
import type { SPU_OBJ, SPU_OBJS } from '@/api/product/spu/type'
import Drawer from './drawer.vue'
import { ElMessage } from 'element-plus'

let sku = ref()
let info: any = ref()

let msg = ref('111')

watch(
  info,
  (value) => {
    console.log('info.value', value)
  },
  { immediate: true, deep: true },
)

setTimeout(() => {
  msg.value = '222'
}, 2000)

let pageSize = ref(10)
let currentPage = ref(1)
let total = ref(0)

let tableData = ref<SPU_OBJS>([
  {
    id: 13009,
    createTime: '2024-07-13 19:55:25',
    updateTime: '2024-07-13 20:55:18',
    spuId: 13933,
    price: 22,
    skuName: 'fasd',
    skuDesc: '22',
    weight: '22.00',
    tmId: 1,
    category3Id: 480,
    skuDefaultImg: 'http://139.198.127.41:9000/sph/20240713/aa.jpg',
    isSale: 1,
    skuImageList: null,
    skuAttrValueList: null,
    skuSaleAttrValueList: null,
  },
])

const selectSpu = async () => {
  let res: any = await reqSpuSelect(currentPage.value, pageSize.value)
  if (res.code === 200) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}

onMounted(() => {
  selectSpu()
})

const handleSizeChange = () => {
  selectSpu()
}
const handleCurrentChange = () => {
  selectSpu()
}

const selectSKU = async (id: number) => {
  //1.查询spu的信息
  let res: any = await reqSpuInfo(id)
  if (res.code === 200) {
    info.value = res.data
    console.log('info', info)
    sku.value.openDrawer()
  }
}

const deleteSKU = async (id: number) => {
  let res: any = await reqSpuDelete(id)
  if (res.code === 200) {
    //再次查询
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    selectSpu()
  }
}
</script>

<style lang="scss" scoped>
.sku {
  height: 100%;
  width: 100%;
  padding: 20px;
  overflow: auto;
}
</style>
