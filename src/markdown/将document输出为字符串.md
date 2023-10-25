```
// 获取整个文档对象
const doc = document.implementation.createDocument(null, 'html', null);
doc.documentElement.innerHTML = document.documentElement.innerHTML;

// 创建一个XML序列化器
const serializer = new XMLSerializer();

// 将文档对象序列化为字符串
const docString = serializer.serializeToString(doc);

console.log(docString);

```