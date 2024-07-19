import { defineStore } from "pinia";
import type { } from 'vue-router'

const useSettingStore = defineStore('settingStore', {
  state: () => { 
    return {
      fold: false, //是否发生折叠
      refresh: true, //刷新页面
    }
  },
  actions: {

  },
  getters: {}
})

export default useSettingStore;