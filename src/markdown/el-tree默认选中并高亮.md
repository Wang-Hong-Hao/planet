```
        <el-tree ref="myTree" :accordion="true" :data="treeData" :default-expanded-keys="[defaultTreeKeys]" :current-node-key="defaultTreeKeys" children="bridgePositionName" node-key="code" :props="defaultProps" @node-click="handleNodeClick" highlight-current></el-tree>
data () {
    return {
 treeData: [],
      defaultTreeKeys: '',
      defaultProps: {
        children: 'children',
        label: 'name'
      },
    }
}


 this.defaultTreeKeys = data[0].children[0].children[0].code
 this.$nextTick(() => {
    this.$refs.myTree.setCurrentKey(this.defaultTreeKeys)
 })

```