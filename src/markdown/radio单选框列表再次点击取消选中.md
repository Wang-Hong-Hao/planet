
![](https://img2022.cnblogs.com/blog/2483371/202204/2483371-20220430174940814-615398017.png)


```html
<template>
  <div class="container-box">
    <div class="enterpriseChoice">
      <div class="search-div">
        <div class="return">
          <i></i>
          <p @click="$router.back()">返回</p>
        </div>
        <div class="search">
          <i></i>
          <input type="text" placeholder="请输入关键字搜索" v-model="iptValue" />
        </div>
        <p class="cancel" @click="iptValue = ''">取消</p>
      </div>
      <div class="enterprise">
        <form class="mui-input-group" name="register" v-for="(item, index) in List" :key="index">
          <div class="mui-input-row mui-radio mui-right enterprise-list" style="display: flex">
            <label :for="'enterprise' + index" style="flex: 1" class="label">{{ item.label }}</label>
            <input :class="'el' + index" :id="'enterprise' + index" name="enterprise" type="radio" :value="index" :checked="item === enterprise ? true:false" @click="toggleChecked($event)" />
          </div>
        </form>
      </div>
    </div>
    <div class="index-footer">
      <button @click="selectEnterprise">确认</button>
    </div>
  </div>
</template>

<script>
import { getDept } from "./api.js"
export default {
  name: "enterpriseChoice",
  components: {},
  data () {
    return {
      deptList: [],
      enterprise: "",
      iptValue: "",
      index: ''
    }
  },
  props: {},
  computed: {
    List () {
      if (this.iptValue !== "") {
        return this.deptList.filter((item) =>
          item.label.includes(this.iptValue)
        )
      } else {
        return this.deptList
      }
      return this.List
    },
  },
  watch: {

  },
  created () {
    this.getList()
  },
  mounted () { },
  methods: {
    getList () {
      getDept({ pid: 9 }).then((res) => {
        this.deptList = res.data.content.filter((item) => {
          if (item.id != 1369) {
            return item
          }
        })
      })
    },
    selectEnterprise () {
      console.log(this.enterprise)
      this.$router.push({
        path: this.$route.query.path,
        query: {
          id: this.enterprise.id,
          label: this.enterprise.label,
          data: this.$route.query.data,
          pathname: this.$route.name,
        },
      })
    },
    // radio点击事件
    toggleChecked (e) {
      // 赋值
      this.enterprise = this.deptList[e.target.value]
      // 判断重复点击后 取消选中 清空值 重置index
      if (this.index === e.target.value) {
        e.target.checked = !e.target.checked
        this.enterprise = {}
        this.index = ''
      } else { //否则保存当前点击的索引
        this.index = e.target.value
      }
    }
  },
};
</script>

<style  scoped>
.label {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>



```

使用v-model双向数据绑定后导致无法实现再次点击取消选中的逻辑 会导致第一次点击也会取消选中 主要原因是v-model的处理总是会在自己的逻辑之前 所以取消使用v-moel

label for属性和input id属性实现点击标签选中

input name一直实现互斥

再次点击取消选中 所以是click事件而非change
