需要注意的是objectSpanMethod方法里外层只能包含一个 if else
```
 // 表格合并 实现相同属性名的行合并
    mergeTable () {
      this.spanArr = [] // 清空数组，否则刷新出错
      for (var i = 0; i < this.dataList.length; i++) {
        if (i === 0) {
          this.spanArr.push(1)
          this.pos = 0
        } else {
          // 判断当前元素与上一个元素是否相同
          if (this.dataList[i].positionName === this.dataList[i - 1].positionName) {
            this.spanArr[this.pos] += 1
            this.spanArr.push(0)
          } else {
            this.spanArr.push(1)
            this.pos = i
          }
        }
      }
    },
    objectSpanMethod ({ row, column, rowIndex, columnIndex }) {
      // 如果spanArr下标===x 就合并
    if (rowIndex !== this.length) {
      if (columnIndex === 0 || columnIndex === 5) {
        const _row = this.spanArr[rowIndex]
        const _col = _row > 0 ? 1 : 0
        return {
          rowspan: _row,
          colspan: _col
        }
      }
  //合并指定的列
   } else {
         if (columnIndex === 0) {
           return [1, 4]

        } else if (columnIndex === 1 || columnIndex === 2 || columnIndex === 3) {
           return [0, 0]
         }
       }
    }
```