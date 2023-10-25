### computed计算属性传参
`使用闭包函数进行穿参`
```
//根据渲染项的不同渲染不同的列数
<div v-for="(item, index) in formConfig[i.value]" :key="item.key">
    <el-col  :span="computeSpace(formConfig[i.value], item, index)">
    </el-col>
</div>

computed: {
    computeSpace() {
      return this.computeSpaceHandle
    }
},


methods: {
    computeSpaceHandle(arr, item, index) {
      if (index + 1 < arr.length) {
        // 判断如果当前项或者下一项是subform
        if (arr[index + 1].type === 'subform' || item.type === 'subform') {
          return 24
        } else {
          return 12
        }
      } else {
        if (item.type === 'subform') {
          return 24
        } else {
          return 12
        }
      }
    }
}

```
