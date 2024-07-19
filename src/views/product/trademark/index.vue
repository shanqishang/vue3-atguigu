<template>
  <div class="trademark">
    <el-card>
      <el-button type="primary" :icon="Plus" @click="addTrademark">添加品牌</el-button>

      <el-table :data="tableData" style="width: 100%;margin: 20px 0;" border>
        <el-table-column label="序号" width="80px" type="index"></el-table-column>
        <el-table-column label="品牌名称" prop="tmName"  width="400"/>
        <el-table-column label="品牌logo" width="400">
          <template #default="scope">
            <img :src="scope.row.logoUrl" height="80px" alt="找不到图片"/>
          </template>
        </el-table-column>
        
        <el-table-column label="品牌操作">
          <template #default="scope">
            <el-button type="primary" size="small" :icon="Edit" @click="editTrademark(scope.row)"></el-button>
            <el-popconfirm title="是否要删除这个品牌?" @confirm="deleteTrademark(scope.row.id)">
              <template #reference>
                <el-button size="small" type="danger" :icon="Delete"></el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <el-pagination 
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[3, 5, 7, 9]"
        background 
        layout="sizes, total, prev, pager, next"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        />
    </el-card>
  </div>

  <!-- http://127.0.0.1:5174/api/admin/product/fileUpload -->
  <!-- http://127.0.0.1:5174/api/admin/product/baseTrademark/save -->
  <!-- 
    id: 0
    logoUrl: "http://139.198.127.41:9000/sph/20240709/3.jpg"
    tmName: "123"
   -->
   <!-- http://127.0.0.1:5174/api/admin/product/baseTrademark/remove/44168 DELETE -->
  <el-dialog v-model="dialogFormVisible" :title="option+'品牌'" width="500">
    <el-form :model="trademarkForm" ref="trademarkFormRef" :rules="rules">
      <el-form-item label="品牌名称" label-width="100px" prop="tmName">
        <el-input v-model="trademarkForm.tmName" />
      </el-form-item>
      <el-form-item label="品牌LOGO" label-width="100px" prop="logoUrl">
        <el-upload
          class="avatar-uploader"
          action="/api/admin/product/fileUpload"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img v-if="trademarkForm.logoUrl" :src="trademarkForm.logoUrl" height="150px" width="150px" />
          <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="cancel(trademarkFormRef)">取消</el-button>
        <el-button type="primary" @click="confirm(trademarkFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref,reactive,onMounted,nextTick} from 'vue'
import { Plus, Edit, Delete } from '@element-plus/icons-vue'
import { reqTrademarkSelect,reqTrademarkSave,reqTrademarkDelete,reqTrademarkUpdate} from '@/api/product/trademark/index'
import type { BaseTrademark,TradeMarkSaveResponse } from '@/api/product/trademark/type'
import type { UploadProps } from 'element-plus'
import { ElMessage } from 'element-plus'

let tableData = ref<BaseTrademark[]>([])
let total = ref(0)
let currentPage = ref(1) 
let pageSize = ref(3) //每页3个
let dialogFormVisible = ref(false)
let trademarkFormRef = ref()
let option = ref('')

const selectData = async (page:number,size:number) => { 
  let res = await reqTrademarkSelect(page,size)
  if (res.code === 200) { 
    tableData.value = <BaseTrademark[]>res.data.records
    total.value = <number>res.data.total
    pageSize.value = <number>res.data.size
  }
}

const addTrademark = () => { 
  option.value = '新增'
  trademarkForm.logoUrl = ''
  trademarkForm.tmName = ''
  //清空数据
  dialogFormVisible.value = true
  //清空校验规则
  nextTick(() => {
    trademarkFormRef.value.clearValidate()
  })
}

const editTrademark = (data: any) => { 
  option.value = '修改'
  trademarkForm.tmName = data.tmName
  trademarkForm.logoUrl = data.logoUrl
  dialogFormVisible.value = true
  Object.assign(trademarkForm, data);
}

const deleteTrademark = async (id:number) => { 
  let res:any = await reqTrademarkDelete(id)
  if (res.code === 200) {
    ElMessage({
      message: '删除成功',
      type: 'success',
    })
    currentPage.value = 1
    selectData(1,pageSize.value)
  } else { 
    ElMessage({
      message: `删除失败，${res.message}`,
      type: 'error',
    })
  }
}

let trademarkForm = reactive({
  id: new Date().getTime(),
  tmName: '',
  logoUrl:''
})

const handleAvatarSuccess: UploadProps['onSuccess'] = (
  response,
  uploadFile
) => {
  trademarkForm.logoUrl = response.data
  //清楚表单校验
  trademarkFormRef.value.clearValidate('logoUrl')
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
  if (rawFile.type !== 'image/jpeg' && rawFile.type !== 'image/png' && rawFile.type !== 'image/jpg') {
    ElMessage.error('上传的图片必须为jpg或者png结尾!')
    return false
  } else if (rawFile.size / 1024 / 1024 > 4) {
    ElMessage.error('图片不能超过4MB')
    return false
  }
  return true
}

const validateTmName = (rule: any, value: any, callback: any) => { 
  if (value.trim().length > 2) {
    callback()
  } else { 
    callback(new Error('品牌名称必须大于两位'))
  }
}

const validateLogoUrl = (rule: any, value: any, callback: any) => { 
  if (value) {
    callback()
  } else { 
    callback(new Error('请上传品牌图片'))
  }
}

const rules = reactive({
  tmName: [
    {required: true,validator: validateTmName, trigger: 'blur'}
  ],
  logoUrl: [
    {required: true,validator: validateLogoUrl}
  ]
})
//确定
const confirm = (formEl:any) => { 
  //检验校验规则
  if (!formEl) return
  formEl.validate(async (valid:any) => {
    if (valid) {
      //提交信息
      let res: any = null
      if (option.value == '新增') {
        res = await reqTrademarkSave(trademarkForm)
      } else { 
        res = await reqTrademarkUpdate(trademarkForm)
      }
      if (res.code === 200) {
        //关闭
        dialogFormVisible.value = false
        ElMessage({
          message: `${option.value}成功`,
          type: 'success',
        })
        //再次查询信息 默认查询第一页
        currentPage.value = 1
        selectData(1,pageSize.value)
      } else { 
        dialogFormVisible.value = false
        ElMessage({
          message: `${option.value}失败，${res.message}`,
          type: 'error',
        })
      }
    } 
  })
}

const cancel = (formEl:any) => { 
  if (!formEl) return
  dialogFormVisible.value = false
  formEl.resetFields()
}


const handleSizeChange = () => { 
  selectData(currentPage.value,pageSize.value)
}

const handleCurrentChange = () => { 
  selectData(currentPage.value,pageSize.value)
}

onMounted(() => { 
  selectData(currentPage.value,pageSize.value)
})
</script>

<style lang="scss" scoped>
.trademark {
  height: 100%;
  width: 100%;
  padding: 20px;
  .el-card {
    width: 100%;
  }
}

:deep(.avatar-uploader){
  height: 150px;
  width: 150px;
  border: 1px dashed black;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  overflow: hidden;
  &:hover {
    border-color: #493;
  }
}
</style>