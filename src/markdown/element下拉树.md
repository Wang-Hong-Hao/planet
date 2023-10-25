```
<el-form-item label="任务：">
        <el-popover ref="taskListPopover" placement="bottom-start" trigger="hover">
          <el-input placeholder="输入关键字进行过滤" size="small" clearable v-model="taskfilterText"></el-input>
          <el-tree
            class="task"
            style="max-height: 27vh;overflow: auto;margin-top: 10px;"
            show-checkbox
            :data="taskTreeList"
            :props="taskListTreeProps"
            :node-key="taskNodeKey"
            ref="taskListTree"
            :check-strictly="false"
            @check-change="taskListTreeCurrentChangeHandle"
            :highlight-current="true"
            :expand-on-click-node="false"
            :default-expand-all="false"
            :check-on-click-node="false"
            :filter-node-method="taskfilterNode"
          ></el-tree>
        </el-popover>
        <el-input v-model="taskListStr" :title="taskListStr" v-popover:taskListPopover :readonly="true" placeholder="请选择">
          <i v-show="taskListStr" class="el-input__icon el-icon-circle-close el-input__clear" slot="suffix" @click.stop="clearTaskTreeData"></i>
        </el-input>
      </el-form-item>
```
```
data () {
    return {
      taskfilterText: ''//树形下拉框====,  
      taskTreeList: [],
      taskListTreeProps: {
        label: 'label',
        children: 'children',
      },     
      taskNodeKey: 'value',     
      taskListStr: '',    
    }
  },
```
```
 watch: {
    taskfilterText (val) {
      this.$refs.taskListTree.filter(val)
    }
  },
```
```
    // 获取下拉列表
    getTaskList () {
      api.getTaskTree({}).then((data) => {
      })
    },
  //下拉树处理
    taskfilterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },    
  //清空查询条件
    clearTaskTreeData () {
      this.$refs.taskListTree.setCheckedKeys([])
      this.taskListStr = ''
    },
  // 树选中
    taskListTreeCurrentChangeHandle () {
      this.taskListStr = this.$refs.taskListTree
        .getCheckedNodes()
        .map((p) => {
          return p.label
        })
        .join(',')
      this.dataForm.subTaskId = this.$refs.taskListTree.getCheckedKeys().join(',')
    },
```
```
//一级不显示复选框
.task
  >>> .el-tree-node
  > .el-tree-node__content
  > .el-checkbox
  .el-checkbox__inner {
  display: none;
}

.task
  >>> .el-tree-node
  .el-tree-node__children
  .el-checkbox
  .el-checkbox__inner {
  display: inline-block !important;
}
```