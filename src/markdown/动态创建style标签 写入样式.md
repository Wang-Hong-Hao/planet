```
      // 从字符串初始化document
      const parser = new DOMParser()
      const parseDocument = parser.parseFromString(this.editorText, 'text/html')
      // 动态创建style标签 写入样式
      const style = parseDocument.createElement('style')
      style.type = 'text/css'
      style.innerHTML = '@page{margin:3mm;size: A4 portrait;}'
      parseDocument.getElementsByTagName('head')[0].appendChild(style)
```