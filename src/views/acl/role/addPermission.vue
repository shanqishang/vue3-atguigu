<template>
  <el-drawer v-model="drawer" direction="rtl">
    <template #header>
      <h4>分配菜单和按钮的权限</h4>
    </template>
    <template #default>
      <el-tree
        ref="treeRef"
        :data="treeData"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        :props="defaultProps"
        @check-change="handleCheckChange"
      />
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="cancelClick">取消</el-button>
        <el-button type="primary" @click="confirmClick">确认</el-button>
      </div>
    </template>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted,reactive,nextTick,watch } from 'vue'
import { reqRoleAssign,reqRoleAssignUpdate } from '@/api/acl/role/index'
import { ElMessage } from 'element-plus';
 
let drawer = ref(false)

let props = defineProps(['roleId'])

watch(() => props.roleId, (value) => { 
  selectAssign()
})

const handleCheckChange = (data:any,checked:any,indeterminate:any) => {
  // console.log("树数据",data, checked, indeterminate)
  if (data.children.length === 0) { //叶节点
    if (checked && selectedId.value.indexOf(data.id) === -1) { //选中 添加
      selectedId.value.push(data.id)
    } else if(!checked && selectedId.value.indexOf(data.id) !== -1){ //没选中 删除
      selectedId.value.splice(selectedId.value.indexOf(data.id), 1)
    }
  }
  
  
}
let treeData = ref()


let treeRef = ref()

const defaultProps = {
  children: 'children',
  label: 'name',
}

//遍历数组
let selectedId = ref<number[]>([])

const getSelectedId = (data: any) => { 
  if (!data || data.length === 0) return 
  data.forEach((item:any) => { 
    if (item.children.length === 0 && item.select) { 
      selectedId.value.push(item.id)
    }
    if(item.children) getSelectedId(item.children)
  })
}

const selectAssign = async () => { 
  selectedId.value = []
  let res: any = await reqRoleAssign(props.roleId)
  if (res.code === 200) { 
    treeData.value = res.data
    getSelectedId(treeData.value)
    // debugger
    console.log("selected",selectedId.value.length);
    //拿到获取的selectedId
    nextTick(() => {
      // debugger
      treeRef.value.setCheckedKeys(selectedId.value, false)  
    })
  }
}

const cancelClick = () => { 
  closeDrawer()
}

const confirmClick = async () => { 
  //收集参数
  let data = {
    userId: props.roleId,
    roleIdList: selectedId.value
  }
  console.log("长度",selectedId.value.length);
  let res:any = await reqRoleAssignUpdate(data)
  if (res.code === 200) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    closeDrawer()
  } else { 
    ElMessage({
      type: 'error',
      message: '修改失败'
    })
    closeDrawer()
  }
  
}

const openDrawer = () => { 
  drawer.value = true
}

const closeDrawer = () => { 
  drawer.value = false
}

defineExpose({openDrawer,closeDrawer})

</script>

<style scoped>

</style>