 Mammoth 旨在转换 .docx 文档，并将其转换为 HTML。Mammoth 的目标是通过使用文档中的语义信息并忽略其他细节来生成简单干净的 HTML。比如Mammoth 会将应用标题 1 样式的任何段落转换为 h1 元素，而不是尝试完全复制标题的样式（字体，文本大小，颜色等）。

Mammoth.js API 为我们提供了很多方法，这里我们来介绍三个比较常用的 API：
  - `mammoth.convertToHtml(input,options)`：把源文档转换为 HTML 文档
  - `mammoth.convertToMarkdown(input,options)`：把源文档转换为 Markdown 文档。这个方法与 `convertToHtml` 方法类似，区别就是返回的 result 对象的 value 属性是 Markdown 而不是 HTML
  - `mammoth.extractRawText(input)`：提取文档的原始文本。这将忽略文档中的所有格式，每个段落后跟两个换行符


Mammoth.js 这个库同时支持 Node.js 和浏览器两个平台，在浏览器端 `mammoth.convertToHtml` 方法的 input 参数的格式是 `{arrayBuffer:arrayBuffer}`，其中 `arrayBuffer` 就是 .docx 文件的内容。

在前端我们可以通过 `FileReader API` 来读取文件的内容，此外该接口也提供了 `readAsArrayBuffer` 方法，用于读取指定的 Blob 中的内容，一旦读取完成，result 属性中保存的将是被读取文件的 `ArrayBuffer` 数据对象。
```
<input id="wordFile" accept=".docx" class="hide" type="file" @change="getWordFile"/>
```
```
var mammoth = require('mammoth')
```
```
 getWordFile (e) {
      const _this = this
      const file = e.target.files[0]
      const reader = new FileReader()
      reader.readAsArrayBuffer(file)
      reader.onload = function (evt) {
        const arrayBuffer = evt.target.result
        mammoth.convertToHtml({ arrayBuffer: arrayBuffer }).then((res) => {
          console.log(res)
          _this.displayResult = res.value
          _this.handler(res.value)
        })
      }
    },
```
该方法用于：
  - （1）实现把输入的 `file` 对象转换为 `ArrayBuffer` 对象。
  - （2）在获取 Word 文档的 `ArrayBuffer` 对象之后，就可以调用 `convertToHtml` 方法，把 Word 文档内容转换为 HTML 文档。

如果文档中不包括特殊的图片类型，比如 wmf 或 emf 类型，而是常见的 jpg 或 png 等类型的话，那么可以看到 Word 文档中的图片都以 Base64 的格式进行嵌入。
