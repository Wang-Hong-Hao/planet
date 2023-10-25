> dialog
```
<template>
  <div>
    <el-dialog title="切换考试" top="9vh" :modal="false" width="600px" :visible.sync="dialogVisible" @close="close" :append-to-body="true">
      <el-row>
        <el-table :data="examList" border style="width: 100%" height="500">
          <el-table-column prop="id" label="编码" width="100"> </el-table-column>
          <el-table-column prop="name" label="考试名称" width="300" show-overflow-tooltip> </el-table-column>
          <el-table-column prop="examDate" label="考试年月"> </el-table-column>
          <el-table-column fixed="right" label="操作" min-width="60">
            <template slot-scope="scope">
              <el-button @click="handleSelectExam(scope.row)" type="text" size="small">切换</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import * as api from './api'
import store from '@/store'
export default {
  name: 'qz-exam-list',
  props: {
    close: {
      type: Function,
      default: () => {}
    }
  },
  data () {
    return {
      examList: [],
      dialogVisible: false
    }
  },
  mounted () {},
  methods: {
    ...mapActions('d2admin/theme', ['set']),
    open () {
      this.dialogVisible = true
      this.$nextTick(async () => {
        this.examList = await api.getExamList()
        // 找到当前的选中
      })
    },
    async handleSelectExam (data) {
      await store.dispatch('d2admin/user/setExam', data, { root: true })
      // 切换考试后清空导航栏
      await store.dispatch('d2admin/page/closeAll')
      this.dialogVisible = false
      this.close()
    }
  }
}
</script>

```
> js 
```
import Vue from 'vue'
import selectExamDialog from './dialog' // 引入弹窗组件

const SelectExamDialog = Vue.extend(selectExamDialog)
selectExamDialog.open = function (callback) {
  const instance = new SelectExamDialog().$mount()
  document.body.appendChild(instance.$el)
  instance.close = () => {
    callback && callback()
    document.body.removeChild(instance.$el)
    instance.$destroy()
  }
  Vue.nextTick(() => {
    instance.open()
  })
}
// 导出
export default selectExamDialog

```
> 全局挂载
```
import selectExam from '@/components/qz-select-exam'

export default {
  async install (Vue, options) {
 // 全局可使用
    Vue.prototype.$selectExam = selectExam
  }
}
```