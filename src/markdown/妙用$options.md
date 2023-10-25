$options是一个记录当前Vue组件的初始化属性选项。通常开发中，我们想把data里的某个值重置为初始化时候的值，可以像下面这么写：
```
this.value = this.$options.data().value;
```
这样子就可以在初始值由于需求需要更改时，只在data中更改即可。

这里再举一个场景：一个el-dialog中有一个el-form，我们要求每次打开el-dialog时都要重置el-form里的数据，则可以这么写：
```
<template>
  <div>
    <el-button @click="visible=!visible">打开弹窗</el-button>
    <el-dialog @open="initForm" title="个人资料" :visible.sync="visible">
      <el-form>
        <el-form-item label="名称">
          <el-input v-model="form.name"/>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="form.gender">
            <el-radio label="male">男</el-radio>
            <el-radio label="female">女</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "App",
  data(){
    return {
      visible: false,
      form: {
        gender: 'male',
        name: 'wayne'
      }
    }
  },
  methods:{
    initForm(){
      this.form = this.$options.data().form
    }
  }
};
</script>
```
如果要重置data里的所有值，可以像下面这么写：
```
Object.assign(this.$data, this.$options.data());
// 注意千万不要写成下面的样子，这样子就更改this.$data的指向。使得其指向另外的与组件脱离的状态
this.$data = this.$options.data();
```
