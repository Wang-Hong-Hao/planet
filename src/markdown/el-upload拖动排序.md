```
 1 <template>
 2   <!-- 省略其他配置 -->
 3   <el-upload ref="upload" :file-list.sync="fileList"></el-upload>
 4 </template>
 5 <script>
 6 import Sortable from 'sortablejs';
 7 export default {
 8   data() {
 9     return {
10       fileList: []
11     };
12   },
13   mounted() {
14     this.initDragSort();
15   },
16   methods: {
17     initDragSort() {
18       // 支持拖拽排序
19       const el = this.$refs.upload.$el.querySelectorAll('.el-upload-list')[0];
20       Sortable.create(el, {
21         onEnd: ({ oldIndex, newIndex }) => {
22           // 交换位置
23           const arr = this.fileList;
24           const page = arr[oldIndex];
25           arr.splice(oldIndex, 1);
26           arr.splice(newIndex, 0, page);
27         }
28       });
29     }
30   }
31 };
32 </script>
```