GET请求直接传数组给后端，格式会错误，
转换传参格式，JS中将数组变成字符串：数组[arr] + ’ ’
```
axios.get('/gateway/xxx', {
    params: {
      name: 'lvxiaobu',
      list: [1,2,3] + '',
    }
})

```
