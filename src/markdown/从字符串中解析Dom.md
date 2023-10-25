```
     // html字符串生成dom
    const parser = new DOMParser()
    // 向table标签中插入节点表格元素（tr、td）时必须使用<table></table>标签包裹，否则parseFromString方法会将tr和td标签自动删除
    let node = parser.parseFromString('<table><tr>' + str + '</tr></table>', 'text/html')
    // parseFromString转换的是document对象，无法append()直接进行插入，获取内部节点后再插入
    el.parentElement.after(node.getElementsByTagName('tr')[0])
```