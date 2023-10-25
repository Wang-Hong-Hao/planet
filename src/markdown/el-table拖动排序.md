### html
```
 <el-table ref="multipleTable" :data="tableData" align="left" border class="mytable" row-key="id">
            <el-table-column :index="indexMethod" align="center" type="index"></el-table-column>
            <el-table-column label="字段名称" prop="description"></el-table-column>
            <el-table-column align="center" label="在表头显示" prop="titleShowFlag" width="210px">
                <template slot-scope="scope">
                    <el-switch v-model="scope.row.titleShowFlag" active-color="#13ce66"
                               inactive-color="#dcdfe6"></el-switch>
                </template>
            </el-table-column>
        </el-table>
```
### js
```
import Sortable from 'sortablejs' // 引入插件
mounted() {
      this.$nextTick(() => {
        this.rowDrop() // 行拖拽
      })
}
methods:{
// 行拖拽
    rowDrop () {
      const tbody = document.querySelector('.el-table__body-wrapper tbody')
      const _this = this
      Sortable.create(tbody, {
        onEnd ({ newIndex, oldIndex }) {
          if (newIndex === oldIndex) return
          _this.tableData.splice(newIndex, 0, _this.tableData.splice(oldIndex, 1)[0])
          var newArray = _this.tableData.slice(0)
          _this.tableData = []
          _this.$nextTick(function () {
            _this.tableData = newArray
          })
        }
      })
    }
}
```