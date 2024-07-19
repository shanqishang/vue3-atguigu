<template>
  <div class="user">
    <el-card>
      <div class="search-box">
        <div class="left-search">
          <span>用户名：</span>
          <el-input v-model="username" style="width: 240px" placeholder="请输入用户名" />
        </div>
        <div class="right-button">
          <el-button type="primary" :disabled="!username" @click="selectUser">搜索</el-button>
          <el-button type="primary" @click="reset">重置</el-button>
        </div>
      </div>
    </el-card>

    <el-card class="list-card">
      <div class="option-button">
        <el-button type="primary" @click="addUser">添加用户</el-button>
        <el-button type="primary" :disabled="isDisabled" @click="batchRemoveUser">批量删除</el-button>
      </div>
      <div class="list-table">
        <el-table :data="userInfo" border style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="55" header-align="center" align="center"/>
          <el-table-column type="index" label="序号" width="60" header-align="center" align="center"/>
          <el-table-column prop="id" label="ID" width="80" header-align="center" align="center"/>
          <el-table-column prop="username" label="用户名字" show-overflow-tooltip width="120" header-align="center" align="center"/>
          <el-table-column prop="name" label="用户名称" show-overflow-tooltip width="120" header-align="center" align="center"/>
          <el-table-column prop="roleName" label="用户角色" show-overflow-tooltip width="120" header-align="center" align="center"/>
          <el-table-column prop="createTime" label="创建时间" show-overflow-tooltip width="170" header-align="center" align="center"/>
          <el-table-column prop="updateTime" label="更新时间" show-overflow-tooltip width="170" header-align="center" align="center"/>
          <el-table-column label="操作" header-align="center" align="center">
            <template #default="scope">
              <el-button type="primary" size="small" :icon="User" @click="editRole(scope.row)">分配角色</el-button>
              <el-button type="primary" size="small" :icon="Edit" @click="editUser(scope.row)">编辑</el-button>
              <el-popconfirm title="确定要删除这条数据?" @confirm="confirmDelete(scope.row.id)">
                <template #reference>
                  <el-button type="primary" size="small" :icon="Delete">删除</el-button>
                </template>
              </el-popconfirm>
              
            </template>
          </el-table-column>
        </el-table>

        <el-pagination
          style="margin-top:20px;"
          background
          v-model:current-page="pageNum"
          v-model:page-size="pageSize"
          :size="size"
          :page-sizes="[5,7,9,11]"
          layout="prev, pager, next, jumper,->,total, sizes"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>

  <!-- 新增用户drawer -->
  <AddUser ref="addUserRef" :option="option" @selectUser="selectUser"></AddUser>
  <!-- 新增用户席位 -->
  <AddRole ref="addRoleRef" @selectUser="selectUser"></AddRole>
</template>

<script setup lang="ts">
import { ref, onMounted,watch } from 'vue'
import { reqUserSelect,reqUserBatchRemove,reqUserDelete } from '@/api/acl/user/index'
import useUserStore from '@/pinia/modules/user'
import { User, Edit, Delete } from '@element-plus/icons-vue'
import { ElMessage, type ComponentSize } from 'element-plus'
import AddUser from './addUser.vue'
import AddRole from './addRole.vue'

let username = ref('')
const pageNum = ref(1)
const pageSize = ref(5)
const total = ref(0)
const size = ref<ComponentSize>('default')
const addUserRef = ref()
const addRoleRef = ref()
const isDisabled = ref(true)
let option = ref('新增')

//获取用户信息
let userInfo: any = ref()
//选中的行
let multipleSelection: any = ref()

//删除数据
const confirmDelete = async (userId: number) => { 
  let res: any = await reqUserDelete(userId)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    selectUser()
  } else { 
    ElMessage({
      type: 'error',
      message: '删除失败'
    })
  }
}

//修改用户角色信息
const editRole = (data:any) => { 
  addRoleRef.value.openDrawer(data)
}

//修改用户信息
const editUser = (data:any) => { 
  option.value = '修改'
  addUserRef.value.openDrawer(data)
}

//选择改变
const handleSelectionChange = (val: any) => {
  multipleSelection.value = val
  isDisabled.value = (multipleSelection.value.length === 0)
}

//批量删除
const batchRemoveUser = async () => { 
  let ids:number[] = []
  multipleSelection.value.forEach((item:any) => { 
    ids.push(item.id)
  })
  let res:any = await reqUserBatchRemove(ids)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '批量删除成功'
    })
    //再次查询
    selectUser()
  } else { 
    ElMessage({
      type: 'error',
      message:'批量删除失败'
    })
  }
}

//新增用户
const addUser = () => { 
  addUserRef.value.openDrawer()
}

//每页条数改变
const handleSizeChange = (val: number) => { 
  pageNum.value = 1
  pageSize.value = val
  selectUser()
}

//当前页改变
const handleCurrentChange = (val: number) => { 
  // debugger
  pageNum.value = val
  selectUser()
}

//查询
const selectUser = async () => { 
  //获取用户名
  let res:any = await reqUserSelect(pageNum.value,pageSize.value, username.value)
  if (res.code === 200) { 
    userInfo.value = res.data.records
    total.value = res.data.total
  }
}

onMounted(() => { 
  selectUser()
})

//监控username
watch(username, (name:string) => { 
  if (!name) { 
    selectUser()
  }
})

//重置按钮
const reset = () => { 
  username.value = ""
}
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  width: 100%;
  padding:20px;
  .search-box{
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left-search{
      display: flex;
      align-items: center;
    }
  }

  .list-card {
    margin-top: 20px;
    .option-button {
      margin-bottom: 20px;
    }

  }
}
</style>