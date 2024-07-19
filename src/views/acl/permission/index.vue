<template>
  <div class="permission" >
    <el-table
      :data="tableData"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
    >
      <el-table-column prop="name" label="名称" />
      <el-table-column prop="code" label="权限值" />
      <el-table-column prop="updateTime" label="修改时间" />
      <el-table-column label="修改时间">
        <template #default="scope">
          <el-button type="primary" size="small" :disabled="!scope.row.isAdd" @click="addMenu(scope.row)">添加菜单</el-button>
          <el-button type="primary" size="small" :disabled="!scope.row.isEdit" @click="editMenu(scope.row)">编辑</el-button>
          <el-popconfirm title="确定要删除这条数据?" @confirm="deleteMenu(scope.row.id)">
            <template #reference>
              <el-button type="primary" size="small" :disabled="!scope.row.isDelete">删除</el-button>
            </template>
          </el-popconfirm>
          
        </template>
      </el-table-column>
    </el-table>
  </div>

  <!-- 对话框 -->
  <el-dialog
    v-model="dialogVisible"
    :title= "(option === 1) ? '添加权限' : '编辑权限'"
    width="500"
  >
    <el-form :model="permissionData" label-width="40" label-position="left">
      <el-form-item label="名称">
        <el-input v-model="permissionData.name" />
      </el-form-item>
      <el-form-item label="权限">
        <el-input v-model="permissionData.code" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmPermission">确定</el-button>
      </div>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { permission_select,permission_add,permission_update,permission_delete } from '@/api/acl/permission/index'
import { ElMessage } from 'element-plus';

let tableData = ref()
let dialogVisible = ref(false)
let option = ref(1)

//等待添加的数据
let permissionData = ref({
  code: '',
  id: 0,
  level: 0,
  name: '',
  pid:0
})

//提交数据
const confirmPermission = async () => { 
  let res: any = ref()
  if (option.value === 1) res.value = await permission_add(permissionData.value)
  else res.value = await permission_update(permissionData.value)
  if (res.value.code == 200) {
    ElMessage({
      type: 'success',
      message: option.value === 1 ? '新增成功' : '编辑成功'
    })
    dialogVisible.value = false
    selectPermission()
  } else { 
    ElMessage({
      type: 'error',
      message: option.value === 1 ? '新增失败' : '编辑失败'
    })
    dialogVisible.value = false
  }
}

const deleteMenu = async (id:number) => { 
  let res: any = await permission_delete(id)
  if (res.code == 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    selectPermission()
  } else { 
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

//修改数据
const editMenu = (data:any) => { 
  option.value = 2
  permissionData.value = data
  dialogVisible.value = true
}

//添加数据
const addMenu = (data: any) => { 
  option.value = 1
  permissionData.value.level = data.level + 1
  permissionData.value.pid = data.id
  dialogVisible.value = true
}

//给数据递归添加数据 判断是否禁用
const isDisable = (data:any) => { 
  data.forEach((item: any) => { 
    if (item.level === 1) {
      Object.assign(item, {
        isAdd: true,
        isEdit: false,
        isDelete: false
      })
    } else if (item.children.length === 0) {
      Object.assign(item, {
        isAdd: false,
        isEdit: true,
        isDelete: true
      })
    } else { 
      Object.assign(item, {
        isAdd: true,
        isEdit: true,
        isDelete: true
      })
    }

    if(item.children.length !== 0 ) isDisable(item.children)
  })
}

const selectPermission = async () => { 
  let res: any = await permission_select()
  if (res.code === 200) { 
    tableData.value = res.data
    isDisable(tableData.value)
    // console.log("tableData", tableData.value)
  }
}

onMounted(() => { 
  selectPermission()
})

</script>

<style lang="scss" scoped>
.permission {
  height: 100%;
  width: 100%;
  padding: 20px;
}
</style>