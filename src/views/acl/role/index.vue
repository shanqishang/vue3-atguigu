<template>
  <div class="role">
    <el-card>
      <div class="search-box">
        <div class="left-search">
          <span style="margin-right: 10px">职位搜索</span>
          <el-input
            v-model="roleName"
            style="width: 240px"
            placeholder="请输入职位搜索关键词"
          />
        </div>
        <div class="right-button">
          <el-button type="primary" :disabled="!roleName" @click="search">
            搜索
          </el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </div>
      </div>
    </el-card>

    <!-- 添加职位 -->
    <el-card style="margin-top: 20px">
      <el-button type="primary" icon="Plus" @click="openRole">
        添加职位
      </el-button>
      <el-table
        border
        ref="roleRef"
        :data="tableData"
        highlight-current-row
        style="margin-top: 20px"
      >
        <el-table-column
          type="index"
          label="#"
          width="80"
          header-align="center"
          align="center"
        />
        <el-table-column
          property="id"
          label="ID"
          width="120"
          header-align="center"
          align="center"
        />
        <el-table-column
          property="roleName"
          label="职位名称"
          width="200"
          header-align="center"
          align="center"
        />
        <el-table-column
          property="createTime"
          label="创建时间"
          width="200"
          header-align="center"
          align="center"
        />
        <el-table-column
          property="updateTime"
          label="更新时间"
          width="200"
          header-align="center"
          align="center"
        />
        <el-table-column label="操作" header-align="center" align="center">
          <template #default="scope">
            <el-button
              type="primary"
              icon="User"
              size="small"
              @click="assignRole(scope.row)"
            >
              分配权限
            </el-button>
            <el-button
              type="primary"
              icon="Edit"
              size="small"
              @click="editRole(scope.row)"
            >
              编辑
            </el-button>
            <el-popconfirm
              title="是否要删除这条数据?"
              @confirm="deleteRole(scope.row.id)"
            >
              <template #reference>
                <el-button type="primary" icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>

      <!-- 分页插件 -->
      <el-pagination
        style="margin-top: 20px"
        background
        v-model:current-page="page"
        v-model:page-size="size"
        :page-sizes="[10, 20, 30, 40]"
        layout="prev,pager,next,jumper,->,sizes,total"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </el-card>
  </div>

  <!-- 添加/编辑 职位 -->
  <el-dialog
    v-model="dialogVisible"
    :title="option === 1 ? '新增职位' : '修改职位'"
    width="500"
  >
    <el-form
      ref="roleFormRef"
      :model="roleForm"
      label-width="80"
      label-position="left"
      :rules="rules"
    >
      <el-form-item label="职位名称" prop="roleName">
        <el-input v-model="roleForm.roleName" />
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRole(roleFormRef)">确定</el-button>
      </div>
    </template>
  </el-dialog>

  <!-- 分配职位和角色的权限 -->
  <AddPermission :roleId="roleId" ref="permissionRef"></AddPermission>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, reactive } from 'vue'
import {
  reqRoleSelect,
  reqRoleAdd,
  reqRoleUpdate,
  reqRoleDelete,
} from '@/api/acl/role/index'
import { GetDate } from '@/utils/time'
import { ElMessage } from 'element-plus'
import AddPermission from './addPermission.vue'

let tableData = ref()
// 分页参数
let page = ref(1)
let size = ref(10)
let total = ref(0)
let roleName = ref('')
//对话框
let option = ref(1) //新增
let dialogVisible = ref(false)
let roleForm = ref({
  createTime: '',
  id: 0,
  remark: null,
  roleName: '',
  updateTime: '',
})
let roleId = ref()

let roleFormRef = ref() //表单实例
let permissionRef = ref()

const deleteRole = async (id: number) => {
  let res: any = await reqRoleDelete(id)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    //再次查询
    selectRole(1, 10, roleName.value)
  } else {
    ElMessage({
      type: 'error',
      message: '删除失败',
    })
  }
}

const assignRole = (data: any) => {
  roleId.value = data.id
  permissionRef.value.openDrawer()
  console.log('roleId', roleId.value)
  //打开抽屉
}

const rules = reactive({
  roleName: [{ required: true, message: '请输入职位名', trigger: 'blur' }],
})

const addRole = async (formEl: any) => {
  if (!formEl) return
  await formEl.validate(async (valid: any, fields: any) => {
    if (valid) {
      //提交表单
      roleForm.value.updateTime = GetDate('YYYY-MM-DD HH:mm:ss')
      if (option.value === 1)
        roleForm.value.createTime = GetDate('YYYY-MM-DD HH:mm:ss')
      let res: any = null
      if (option.value === 1) res = await reqRoleAdd(roleForm.value)
      else res = await reqRoleUpdate(roleForm.value)

      console.log('1111', roleForm.value)
      if (res.code === 200) {
        ElMessage({
          type: 'success',
          message: option.value === 1 ? '新增成功' : '修改成功',
        })
        formEl.resetFields()
        dialogVisible.value = false
        //再次查询
        selectRole(1, 10, roleName.value)
      } else {
        ElMessage({
          type: 'error',
          message: option.value === 1 ? '新增失败' : '修改失败',
        })
        formEl.resetFields()
        dialogVisible.value = false
        selectRole(1, 10, roleName.value)
      }
    } else {
      console.log('表单校验失败')
    }
  })
}

const openRole = () => {
  option.value = 1
  roleForm.value = {
    createTime: '',
    id: 0,
    remark: null,
    roleName: '',
    updateTime: '',
  }
  dialogVisible.value = true
}

const editRole = async (data: any) => {
  option.value = 2
  //清空数据
  roleForm.value = data
  dialogVisible.value = true
}

const handleSizeChange = (pageSize: number) => {
  selectRole(1, pageSize, roleName.value)
}
const handleCurrentChange = (pageNum: number) => {
  selectRole(pageNum, size.value, roleName.value)
}

const selectRole = async (
  pageNum: number,
  pageSize: number,
  roleName: string,
) => {
  let res: any = await reqRoleSelect(pageNum, pageSize, roleName)
  if (res.code === 200) {
    total.value = res.data.total
    tableData.value = res.data.records
  }
}

onMounted(() => {
  selectRole(page.value, size.value, roleName.value)
})

watch(roleName, () => {
  if (roleName.value === '') {
    selectRole(1, 10, roleName.value)
  }
})

const search = () => {
  selectRole(1, 10, roleName.value)
}

const reset = () => {
  roleName.value = ''
}
</script>

<style lang="scss" scoped>
.role {
  height: 100%;
  width: 100%;
  padding: 20px;
  .search-box {
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-search {
      display: flex;
      align-items: center;
    }
  }
}
</style>
