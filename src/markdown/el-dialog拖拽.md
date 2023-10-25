dialog组件
```
<template>
        <el-dialog :close-on-click-modal="false"
                    :close-on-press-escape="false"
                    v-bind="$attrs"
                    v-on="$listeners"
                    ref="dlg"
                    :modal="modal"
                    v-qz-dialog-drag
                    :fullscreen="isFullscreen">
                <div slot="title" class="qzDialogTitle" @dblclick="isFullscreen=!isFullscreen">
                    <d2-icon-svg class="dialog-icon" :name="icon"></d2-icon-svg>
                    <span style="line-height: 0.5"> {{title}} </span>
                    <i @click="isFullscreen=true" v-if="allowMaximize && !isFullscreen" class="fa fa-window-maximize qz-dialog-maximize" aria-hidden="true"></i>
                    <i @click="isFullscreen=false" v-if="allowMaximize && isFullscreen" class="fa fa-window-restore qz-dialog-maximize" aria-hidden="true"></i>
                </div>
                <slot name="title"></slot>
                <slot></slot>
            <template slot="footer">
                <slot name="footer"></slot>
            </template>
        </el-dialog>
</template>
<script>

export default {
  name: 'qz-dialog',
  props: {
    // 值
    title: {
      type: String,
      required: false,
      default: ''
    },
    allowMaximize: {
      type: Boolean,
      required: false,
      default: true
    },
    // 图标
    icon: {
      type: String,
      required: false,
      default: 'd2-admin'
    },
    modal: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      isFullscreen: false
    }
  },
  watch: {
    isFullscreen (val) {
      const dlg = this.$refs.dlg.$el.querySelector('.el-dialog')
      if (val) {
        this.dlgtop = getComputedStyle(dlg).top
        this.dlgleft = getComputedStyle(dlg).left
        dlg.style.top = '0px'
        dlg.style.left = null
      } else {
        dlg.style.top = this.dlgtop
        dlg.style.left = this.dlgleft
      }
      this.$emit('fullscreen', val)
    }
  }
}
</script>

<style lang="css">
    .qz-dialog-maximize {
        position: absolute;
        right: 40px;
        top: 15px;
        font-size: 12px;
        cursor: pointer;
        color: #a2a5ad;
    }
</style>

```
directive.js
```
/* eslint-disable */
import Vue from 'vue'
// v-dialogDrag: 弹窗拖拽属性
Vue.directive('qzDialogDrag', {
  bind(el, binding, vnode, oldVnode) {
    const dialogHeaderEl = el.querySelector('.el-dialog__header')
    const dragDom = el.querySelector('.el-dialog')
    /*  dragDom.onselectstart = function () {
        return false
      }*/
    // dialogHeaderEl.style.cursor = 'move';
    dialogHeaderEl.style.cssText += ';cursor:move;'
    dragDom.style.cssText += ';top:0px;'

    // 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null);
    const sty = (function () {
      if (window.document.currentStyle) {
        return (dom, attr) => dom.currentStyle[attr]
      } else {
        return (dom, attr) => getComputedStyle(dom, false)[attr]
      }
    })()
    dialogHeaderEl.onmousedown = (e) => {
      // 鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - dialogHeaderEl.offsetLeft
      const disY = e.clientY - dialogHeaderEl.offsetTop

      const screenWidth = document.body.clientWidth // body当前宽度
      const screenHeight = document.documentElement.clientHeight // 可见区域高度(应为body高度，可某些环境下无法获取)

      const dragDomWidth = dragDom.offsetWidth // 对话框宽度
      const dragDomHeight = screenHeight > dragDom.offsetHeight ? dragDom.offsetHeight : screenHeight// 对话框高度

      const minDragDomLeft = dragDom.offsetLeft
      const maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth

      const minDragDomTop = dragDom.offsetTop
      const maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomHeight

      // 获取到的值带px 正则匹配替换
      let styL = sty(dragDom, 'left')
      let styT = sty(dragDom, 'top')

      // 注意在ie中 第一次获取到的值为组件自带50% 移动之后赋值为px
      if (styL.includes('%')) {
        styL = +document.body.clientWidth * (+styL.replace(/\%/g, '') / 100)
        styT = +document.body.clientHeight * (+styT.replace(/\%/g, '') / 100)
      } else {
        styL = +styL.replace(/\px/g, '')
        styT = +styT.replace(/\px/g, '')
      }

      document.onselectstart = function () {
        return false
      }
      document.onmousemove = function (e) {
        // 通过事件委托，计算移动的距离
        let left = e.clientX - disX
        let top = e.clientY - disY

        // 边界处理
        if (-(left) > minDragDomLeft) {
          left = -(minDragDomLeft)
        } else if (left > maxDragDomLeft) {
          left = maxDragDomLeft
        }

        if (-(top) > minDragDomTop) {
          top = -(minDragDomTop)
        } else if (top > maxDragDomTop) {
          top = maxDragDomTop
        }

        // 移动当前元素
        dragDom.style.cssText += `;left:${left + styL}px;top:${top + styT}px;`
      }

      document.onmouseup = function (e) {
        document.onmousemove = null
        document.onmouseup = null
        document.onselectstart = null
      }
    }
  }
})

```