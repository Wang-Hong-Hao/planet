下载kind editor后需要使用的文件如下（其他没用到的可删除）
![](https://img2023.cnblogs.com/blog/2483371/202305/2483371-20230529145900389-32277470.png)

封装成组件以及自定义上传插件

上传图片后生成image 标签插入
上传文件后生成下载a链接插入
```
<template>
    <div class="kindeditor-component">
        <input id="file-input" style="display: none" type="file">
        <textarea :id="id" v-model="outContent" name="content"></textarea>
    </div>
</template>

<script>

import request from '@/plugin/axios/request'
import { Message } from 'element-ui'

export default {
  name: 'kindeditor-component',
  data () {
    return {
      editor: null,
      outContent: this.content
    }
  },
  props: {
    isReadonly: {
      type: Boolean,
      default: false
    },
    header: {
      type: Object,
      default: () => ({})
    },
    content: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      required: true
    },
    width: {
      type: String
    },
    height: {
      type: String
    },
    minWidth: {
      type: Number,
      default: 650
    },
    minHeight: {
      type: Number,
      default: 100
    },
    items: {
      type: Array,
      default: function () {
        return [
          'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
          'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
          'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
          'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
          'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
          'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|',
          'table', 'hr', 'emoticons', 'pagebreak',
          'anchor', 'link', 'unlink', '|'
        ]
        /* return [
         'source', '|', 'undo', 'redo', '|', 'preview', 'print', 'template', 'code', 'cut', 'copy', 'paste',
         'plainpaste', 'wordpaste', '|', 'justifyleft', 'justifycenter', 'justifyright',
         'justifyfull', 'insertorderedlist', 'insertunorderedlist', 'indent', 'outdent', 'subscript',
         'superscript', 'clearhtml', 'quickformat', 'selectall', '|', 'fullscreen', '/',
         'formatblock', 'fontname', 'fontsize', '|', 'forecolor', 'hilitecolor', 'bold',
         'italic', 'underline', 'strikethrough', 'lineheight', 'removeformat', '|', 'image', 'multiimage',
         'flash', 'media', 'insertfile', 'table', 'hr', 'emoticons', 'baidumap', 'pagebreak',
         'anchor', 'link', 'unlink', '|', 'about'
         ] */
      }
    },
    noDisableItems: {
      type: Array,
      default: function () {
        return ['source', 'fullscreen']
      }
    },
    filterMode: {
      type: Boolean,
      default: true
    },
    htmlTags: {
      type: Object,
      default: function () {
        return {
          font: ['color', 'size', 'face', '.background-color'],
          span: ['style'],
          div: ['class', 'align', 'style'],
          table: ['class', 'border', 'cellspacing', 'cellpadding', 'width', 'height', 'align', 'style'],
          'td,th': ['class', 'align', 'valign', 'width', 'height', 'colspan', 'rowspan', 'bgcolor', 'style'],
          a: ['class', 'href', 'target', 'name', 'style'],
          embed: ['src', 'width', 'height', 'type', 'loop', 'autostart', 'quality',
            'style', 'align', 'allowscriptaccess', '/'],
          img: ['src', 'width', 'height', 'border', 'alt', 'title', 'align', 'style', '/'],
          hr: ['class', '/'],
          br: ['/'],
          'p,ol,ul,li,blockquote,h1,h2,h3,h4,h5,h6': ['align', 'style'],
          'tbody,tr,strong,b,sub,sup,em,i,u,strike': []
        }
      }
    },
    wellFormatMode: {
      type: Boolean,
      default: true
    },
    resizeType: {
      type: Number,
      default: 2
    },
    themeType: {
      type: String,
      default: 'default'
    },
    langType: {
      type: String,
      default: 'zh-CN'
    },
    designMode: {
      type: Boolean,
      default: true
    },
    fullscreenMode: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String
    },
    themesPath: {
      type: String
    },
    pluginsPath: {
      type: String,
      default: ''
    },
    langPath: {
      type: String
    },
    minChangeSize: {
      type: Number,
      default: 5
    },
    loadStyleMode: {
      type: Boolean,
      default: true
    },
    urlType: {
      type: String,
      default: ''
    },
    newlineTag: {
      type: String,
      default: 'p'
    },
    pasteType: {
      type: Number,
      default: 2
    },
    dialogAlignType: {
      type: String,
      default: 'page'
    },
    shadowMode: {
      type: Boolean,
      default: true
    },
    zIndex: {
      type: Number,
      default: 811213
    },
    useContextmenu: {
      type: Boolean,
      default: true
    },
    syncType: {
      type: String,
      default: 'form'
    },
    indentChar: {
      type: String,
      default: '\t'
    },
    cssPath: {
      type: [String, Array]
    },
    cssData: {
      type: String
    },
    bodyClass: {
      type: String,
      default: 'ke-content'
    },
    colorTable: {
      type: Array
    },
    afterCreate: {
      type: Function
    },
    afterChange: {
      type: Function
    },
    afterTab: {
      type: Function
    },
    afterFocus: {
      type: Function
    },
    afterBlur: {
      type: Function
    },
    afterUpload: {
      type: Function
    },
    uploadJson: {
      type: String
    },
    fileManagerJson: {
      type: String
    },
    allowPreviewEmoticons: {
      type: Boolean,
      default: true
    },
    allowImageUpload: {
      type: Boolean,
      default: true
    },
    allowFlashUpload: {
      type: Boolean,
      default: true
    },
    allowMediaUpload: {
      type: Boolean,
      default: true
    },
    allowFileUpload: {
      type: Boolean,
      default: true
    },
    allowFileManager: {
      type: Boolean,
      default: false
    },
    fontSizeTable: {
      type: Array,
      default: function () {
        return ['9px', '10px', '12px', '14px', '16px', '18px', '24px', '32px']
      }
    },
    imageTabIndex: {
      type: Number,
      default: 0
    },
    formatUploadUrl: {
      type: Boolean,
      default: true
    },
    fullscreenShortcut: {
      type: Boolean,
      default: false
    },
    extraFileUploadParams: {
      type: Object,
      default: function () {
        return {}
      }
    },
    filePostName: {
      type: String,
      default: 'imgFile'
    },
    fillDescAfterUploadImage: {
      type: Boolean,
      default: false
    },
    afterSelectFile: {
      type: Function
    },
    pagebreakHtml: {
      type: String,
      default: '<hr style="page-break-after: always;" class="ke-pagebreak" />'
    },
    allowImageRemote: {
      type: Boolean,
      default: true
    },
    autoHeightMode: {
      type: Boolean,
      default: false
    },
    fixToolBar: {
      type: Boolean,
      default: false
    },
    tabIndex: {
      type: Number
    }
  },
  watch: {
    content (val) {
      this.editor && val !== this.outContent && this.editor.html(val)
    },
    outContent (val) {
      this.$emit('update:content', val)
      this.$emit('on-content-change', val)
    },
    isReadonly (val) {
      this.editor.readonly(val)
    }
  },
  mounted () {
    // 初始访问时创建
    this.initEditor()
  },
  /**
   * keep-alive 会用到进入时调用activated 离开时调用deactivated
   * 初始访问 created、mounted 切换时deactivated 再次进入时 activated
   */
  activated () {
    // keep-alive 进入时创建
    this.initEditor()
  },
  deactivated () {
    // keep-alive 离开时移除
    this.removeEditor()
  },
  methods: {
    removeEditor () {
      window.KindEditor.remove('#' + this.id)
    },
    initEditor () {
      var _this = this
      _this.removeEditor()
      // 鼠标停留到插件时显示的插件名
      window.KindEditor.lang({
        myUpload: '上传'
      })
      // 添加上传插件
      window.KindEditor.plugin('myUpload', function (K) {
        var editor = this
        var name = 'myUpload'
        // 点击图标时执行
        editor.clickToolbar(name, async function () {
          // 选择文件后进行上传
          if (!this.uploadJson) {
            return Message({
              type: 'warning',
              message: '请先配置上传服务地址（uploadJson)'
            })
          }
          const res = await _this.openSelectFile()
          if (res.type.startsWith('image')) {
            // 插入图片
            editor.insertHtml(`<img src="${res.url}"></img>`)
          } else {
            // 插入超链接
            editor.insertHtml(`<a href="${res.url}" target="_blank">${res.url}</a>`)
          }
        })
      })
      _this.editor = window.KindEditor.create('#' + this.id, {
        header: _this.header,
        width: _this.width,
        height: _this.height,
        minWidth: _this.minWidth,
        minHeight: _this.minHeight,
        items: [..._this.items, 'myUpload'],
        noDisableItems: _this.noDisableItems,
        filterMode: _this.filterMode,
        htmlTags: _this.htmlTags,
        wellFormatMode: _this.wellFormatMode,
        resizeType: _this.resizeType,
        themeType: _this.themeType,
        langType: _this.langType,
        designMode: _this.designMode,
        fullscreenMode: _this.fullscreenMode,
        basePath: _this.basePath,
        themesPath: _this.themesPath,
        pluginsPath: _this.pluginsPath,
        langPath: _this.langPath,
        minChangeSize: _this.minChangeSize,
        loadStyleMode: _this.loadStyleMode,
        urlType: _this.urlType,
        newlineTag: _this.newlineTag,
        pasteType: _this.pasteType,
        dialogAlignType: _this.dialogAlignType,
        shadowMode: _this.shadowMode,
        zIndex: _this.zIndex,
        useContextmenu: _this.useContextmenu,
        syncType: _this.syncType,
        indentChar: _this.indentChar,
        cssPath: _this.cssPath,
        cssData: _this.cssData,
        bodyClass: _this.bodyClass,
        colorTable: _this.colorTable,
        afterCreate: _this.afterCreate,
        afterChange: function () {
          _this.outContent = this.html()
        },
        afterTab: _this.afterTab,
        afterFocus: _this.afterFocus,
        afterBlur: _this.afterBlur,
        afterUpload: _this.afterUpload,
        uploadJson: _this.uploadJson,
        fileManagerJson: _this.fileManagerJson,
        allowPreviewEmoticons: _this.allowPreviewEmoticons,
        allowImageUpload: _this.allowImageUpload,
        allowFlashUpload: _this.allowFlashUpload,
        allowMediaUpload: _this.allowMediaUpload,
        allowFileUpload: _this.allowFileUpload,
        allowFileManager: _this.allowFileManager,
        fontSizeTable: _this.fontSizeTable,
        imageTabIndex: _this.imageTabIndex,
        formatUploadUrl: _this.formatUploadUrl,
        fullscreenShortcut: _this.fullscreenShortcut,
        extraFileUploadParams: _this.extraFileUploadParams,
        filePostName: _this.filePostName,
        fillDescAfterUploadImage: _this.fillDescAfterUploadImage,
        afterSelectFile: _this.afterSelectFile,
        pagebreakHtml: _this.pagebreakHtml,
        allowImageRemote: _this.allowImageRemote,
        autoHeightMode: _this.autoHeightMode,
        fixToolBar: _this.fixToolBar,
        tabIndex: _this.tabIndex
      })
    },
    // 打开选择文件弹窗
    openSelectFile () {
      // 获取文件输入元素
      const _this = this
      const fileInput = document.getElementById('file-input')
      // 监听文件选择事件
      return new Promise((resolve, reject) => {
        fileInput.addEventListener('change', async function (event) {
          // 获取选择的文件
          const file = event.target.files[0]
          // 处理选择的文件，例如读取文件内容或上传文件
          const res = await _this.uploadFile(file)
          resolve(res)
        })
        fileInput.click()
      })
    },
    async uploadFile (file) {
      const form = new FormData()
      form.append('file', file)
      const res = await request({
        url: this.uploadJson,
        method: 'POST',
        data: form
      })
      return { url: res, type: file.type }
    }
  }
}
</script>
```