![](https://img2022.cnblogs.com/blog/2483371/202202/2483371-20220225150100047-1148291014.png)




```
<el-select v-model="" style="width:400px" class="select" :disabled="">
    <template slot="prefix">
        <div class="select_header">xxxxxxx</div>
    </template>
   <el-option v-for="" :key="subList.id" :label="" :value=""></el-option>
</el-select>


<style lang='scss' scoped>
  .select_header {
  background-color: #f5f7fa;
  color: #909399;
  vertical-align: middle;
  border: 1px solid #dcdfe6;
  border-radius: 4px 0 0 4px;
  padding: 0 20px;
  //   width: 1px;
  white-space: nowrap;
  width: 100%;
  height: 100%;
  line-height: 36px;
}
.select >>> .el-input__prefix {
  left: 0 !important;
}
.select >>> .el-input__inner {
  padding-left: 108px !important;
}
.select >>> .el-popper {
  min-width: 306px !important;
  left: 750px !important;
}
</style>
```