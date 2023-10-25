### 最近项目使用jsencrypt对登录密码进行加密 pc正常使用，但是uniapp中使用会导致项目报错
`主要原因是jsencrypt中使用了window对象`

解决方案是 使用旧版的jsencrypt并对源码进行修改 用旧版是因为新版有其他包的依赖无法抽取为单独的js

在jsencrypt.js文件随便那个位置添加以下代码
```
   var modificationNavigator = {
    appName: 'Netscape',
    userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 	(KHTML, like  	 Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
  };
   var modificationWindow = {
    ASN1: null,
    Base64: null,
    Hex: null,
    crypto: null,
    href: null
  };

```
加入后把jsencrypt.js文件里面的变量navigator全部替换为 modificationNavigator
window全部替换为 modificationWindow

使用
```
import JSEncrypt from ''
var en = new JSEncrypt()
			
en.setPublicKey("填写私钥")
let encrypted = en.encrypt('加密信息')
console.log('en:'+encrypted)
```

[附修改后的源码，点击下载](https://files.cnblogs.com/files/blogs/703856/jsencrypt.js?t=1657596950)

参考资料
`https://blog.csdn.net/qq_38318589/article/details/115371454`
`https://blog.csdn.net/qq_36501494/article/details/105153122`