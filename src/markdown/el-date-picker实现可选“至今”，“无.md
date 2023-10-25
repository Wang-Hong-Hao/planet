因为案例实现是动态表单，实际需根据自己的需求进行更改

当点击“至今”、“无”时与后台约定一个固定的是时间值，例如：`2100-01-01`,时间格式需根据当前`valueFormat`

实现：当选择“至今”、“无”时使用`input`遮盖`el-date-picker`，但点击`input`时清空值，打开`datePicker`

Html



```html
  <div class="date_input_box">
    <el-input v-if="tillNow" :class="outline" :value="placeholder" class="mask_input" readonly suffix-icon="el-icon-date" @click.native="reselect" />
    <el-date-picker
      :ref="'dataPick' + item.key"
      :disabled="item.disabled === true"
      :format="item.format"
      :picker-options="item.pickerOptions"
      :placeholder="item.hasTips ? item.formTips : ''"
      :type="datePickType"
      :value="value"
      :value-format="item.valueFormat"
      class="real_date_picker"
      prefix-icon="date_picker_prefix_icon"
      style="width: 100%"
      @blur="setStyle('')"
      @focus="setStyle('outline')"
      v-on="$listeners"
    />
  </div>
```

`picker.$emit`赋值是不用对时间格式进行判断，`el-date-picker`会转成对应的格式

```js
// 因为是动态表单 此处根据配置判断是否可选“至今”，“无”  picker.$emit赋值是不用对时间格式进行判断，el-date-picker会转成对应的format
checkSpecialDate (format) {
      if (format === null || format === undefined) {
        return {}
      }
      let obj = {
        shortcuts: []
      }
      if (format && format.includes('至今')) {
        obj.shortcuts.push({
          text: '至今',
          onClick (picker) {
            picker.$emit('pick', '2100-01-01 01:01:01')
          }
        })
      }
      if (format && format.includes('无')) {
        obj.shortcuts.push({
          text: '无',
          onClick (picker) {
            picker.$emit('pick', '2200-02-02 02:02:02')
          }
        })
      }
      return obj
    },
```



```js
computed:{
		tillNow () {
      // 至今和无 与后台约定好的
      return this.value.startsWith('2200') || this.value.startsWith('2100')
    },
    placeholder () {
      if (this.value.startsWith('2200')) {
        return '无'
      } else if (this.value.startsWith('2100')) {
        return '至今'
      } else {
        return ''
      }
    },
    datePickType () {
      if (this.item.format === 'yyyy-MM') {
        return 'month'
      } else if (this.item.format === 'yyyy-MM-dd') {
        return 'date'
      } else if (this.item.format === 'yyyy-MM-dd HH:mm:ss') {
        return 'datetime'
      } else {
        return 'date'
      }
    }
},
  methods: {
    reselect () {
      // 清空选择的时间让picker定位到当前年月
      this.clearValue()
      this.$refs['dataPick' + this.item.key].focus()
    },
    clearValue () {
    	// 此处清空value值
    },
    // 给遮盖的input设置聚焦样式
    setStyle (str) {
      this.outline = str
    }
  }
```

```css
.date_input_box {
  position: relative;
}

.real_date_picker {
  z-index: 100;
}

.mask_input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 110;
  border: none;
}

::v-deep.outline input {
  border-color: #409efe;
}
```

组件完整代码：

```vue
<template>
  <div class="date_input_box">
    <el-input v-if="tillNow" :class="outline" :value="placeholder" class="mask_input" readonly suffix-icon="el-icon-date" @click.native="reselect" />
    <el-date-picker
      :ref="'dataPick' + item.key"
      :disabled="item.disabled === true"
      :format="item.format"
      :picker-options="item.pickerOptions"
      :placeholder="item.hasTips ? item.formTips : ''"
      :type="datePickType"
      :value="value"
      :value-format="item.valueFormat"
      class="real_date_picker"
      prefix-icon="date_picker_prefix_icon"
      style="width: 100%"
      @blur="setStyle('')"
      @focus="setStyle('outline')"
      v-on="$listeners"
    />
  </div>
</template>

<script>
export default {
  name: 'ItemDateTime',
  inject: ['reportParent'],
  props: {
    item: {
      type: Object,
      default () {
        return {
          format: '',
          valueFormat: '',
          hasTips: '',
          formTips: '',
          pickerOptions: {}
        }
      }
    },
    value: {
      type: String,
      default: ''
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      outline: ''
    }
  },
  computed: {
    tillNow () {
      // 至今和无 与后台约定好的
      return this.value.startsWith('2200') || this.value.startsWith('2100')
      // return ['2100-01-01', '2200-02-02'].includes(this.value)
    },
    placeholder () {
      if (this.value.startsWith('2200')) {
        return '无'
      } else if (this.value.startsWith('2100')) {
        return '至今'
      } else {
        return ''
      }
    },
    datePickType () {
      if (this.item.format === 'yyyy-MM') {
        return 'month'
      } else if (this.item.format === 'yyyy-MM-dd') {
        return 'date'
      } else if (this.item.format === 'yyyy-MM-dd HH:mm:ss') {
        return 'datetime'
      } else {
        return 'date'
      }
    }
  },
  methods: {
    reselect () {
      // 清空选择的时间让picker定位到当前年月
      this.clearValue()
      this.$refs['dataPick' + this.item.key].focus()
    },
    clearValue () {
      // 如果有parentName则为子表单
      if (Object.hasOwn(this.item, 'parentName')) {
        this.reportParent.form[this.item.parentName][this.index][this.item.key] = ''
      } else {
        this.reportParent.form[this.item.key] = ''
      }
    },
    // 给遮盖的input设置聚焦样式
    setStyle (str) {
      this.outline = str
    }
  }
}
</script>

<style lang="scss" scoped>
.my_date_picker_prefix_icon {
  display: none;
}

::v-deep.real_date_picker .el-input__inner {
  padding: 0 15px; // 这个15是el-input组件默认的值
}

::v-deep.real_date_picker .el-input__prefix {
  right: 5px;
  left: unset;
}

.date_input_box {
  position: relative;
}

.real_date_picker {
  z-index: 100;
}

.mask_input {
  position: absolute;
  left: 0;
  top: 0;
  z-index: 110;
  border: none;
}

::v-deep.outline input {
  border-color: #409efe;
}

</style>

```
