> 看到这个组件是不是有点陌生，陌生就对了，因为它从来没有出现在 element 官网上（估计是性能问题），但好东西怎么能藏着掖着，来上效果图。
```
<el-scrollbar>
  <div class="box">
    <p v-for="item in 15" :key="item">欢迎使用 el-scrollbar {{item}}</p>
  </div>
</el-scrollbar>

<style scoped>
.el-scrollbar {
  border: 1px solid #ddd;
  height: 200px;
}
.el-scrollbar ::v-deep  .el-scrollbar__wrap {
    overflow-y: scroll;
    overflow-x: hidden;
  }
</style>
```