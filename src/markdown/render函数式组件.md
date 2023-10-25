- 应用场景 页面在接口请求到html模板后动态的向模板中挂载dom （例如 获得准考证的html模版后需要添加考试科目表格，#subject-table为模板预留占位标签）
注：全局组件可在页面内直接使用组件名标签使用

1. 通过`Vue.component`注册全局组件
2. 通过`Vue.extend`创建构造器
3. 创建实例，并挂载到元素上。
```
/** * Created by wanghonghao on 2022/09/29 */
import Vue from 'vue'
let tdAttrs = { style: { border: '1px solid #000', padding: '5px 30px', 'text-align': 'center', 'font-weight': 'normal' }}
let tableAttrs = { style: { 'border-collapse': 'collapse', margin: '0 auto' }}
function renderTable(examList) {
  let table = Vue.component('subject-table', {
    render: function (h) {
      return h('tr', {}, [
        h('td', { attrs: { colspan: 5, align: 'center' }}, [
          h('table', tableAttrs, [
            h('thead', tableAttrs, [h('tr', {}, [h('th', tdAttrs, '日期'), h('th', tdAttrs, '时间'), h('th', tdAttrs, '科目')])]),
            h(
              'tbody',
              {},
              examList.map(item => h('tr', {}, [h('td', tdAttrs, item.date), h('td', tdAttrs, item.time), h('td', tdAttrs, item.subject)]))
            )
          ])
        ])
      ])
    }
  })
  let instance = Vue.extend(table)
  new instance().$mount('#subject-table')
}
export default renderTable

```
- `Vue.extend`高级用法
```
import Vue from 'vue'
import selectExamDialog from './qz-select-exam-dialog' // 引入弹窗组件

const SelectExamDialog = Vue.extend(selectExamDialog)
selectExamDialog.open = function (callback) {
  const instance = new SelectExamDialog().$mount()
  document.body.appendChild(instance.$el)
  instance.close = () => {
    callback && callback()
    document.body.removeChild(instance.$el)
    instance.$destroy()
  }
  Vue.nextTick(() => {
    instance.open()
  })
}
// 导出
export default selectExamDialog

```
### 使用render函数编写的导航栏组件
```
import { mapState } from 'vuex'
import menuMixin from '../mixin/menu'
import { elMenuItem, elSubmenu } from '../libs/util.menu'
import BScroll from 'better-scroll'

export default {
  name: 'd2-layout-header-aside-menu-side',
  mixins: [
    menuMixin
  ],
  render (createElement) {
    return createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-side' } }, [
      createElement('div', { attrs: { class: 'menu-title' } }, this.menuTitle),
      createElement('el-menu', {
        props: { collapse: this.asideCollapse, uniqueOpened: false, defaultActive: this.active },
        ref: 'menu',
        on: { select: this.handleMenuSelect }
      }, this.aside.map(menu => (menu.children === undefined ? elMenuItem : elSubmenu).call(this, createElement, menu))),
      ...this.aside.length === 0 && !this.asideCollapse ? [
        createElement('div', { attrs: { class: 'd2-layout-header-aside-menu-empty', flex: 'dir:top main:center cross:center' } }, [
          createElement('d2-icon', { props: { name: 'inbox' } }),
          createElement('span', {}, this.$t('layout.header-aside.menu-side.empty'))
        ])
      ] : []
    ])
  },
  data () {
    return {
      active: '',
      asideHeight: 300,
      BS: null
    }
  },
  computed: {
    ...mapState('d2admin/menu', [
      'aside',
      'header',
      'asideCollapse'
    ]),
    menuTitle () {
      const pid = this.aside[0].pid
      const item = this.header.find(item => item.id === pid)
      return item ? item.title : ''
    }
  },
  watch: {
    // 折叠和展开菜单的时候销毁 better scroll
    asideCollapse (val) {
      this.scrollDestroy()
      setTimeout(() => {
        this.scrollInit()
      }, 500)
    },
    // 监听路由 控制侧边栏激活状态
    $route: {
      handler ({ fullPath }) {
        this.active = fullPath
        this.$nextTick(() => {
          if (this.aside.length > 0 && this.$refs.menu) {
            this.$refs.menu.activeIndex = fullPath
          }
        })
      },
      immediate: true
    }
  },
  mounted () {
    this.scrollInit()
  },
  beforeDestroy () {
    this.scrollDestroy()
  },
  methods: {
    scrollInit () {
      this.BS = new BScroll(this.$el, {
        mouseWheel: true,
        click: true
        // 如果你愿意可以打开显示滚动条
        // scrollbar: {
        //   fade: true,
        //   interactive: false
        // }
      })
    },
    scrollDestroy () {
      // https://github.com/d2-projects/d2-admin/issues/75
      try {
        this.BS.destroy()
      } catch (e) {
        delete this.BS
        this.BS = null
      }
    }
  }
}
```