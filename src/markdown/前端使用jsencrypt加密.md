## 安装jsencrypt
```
npm i jsencrypt
```
##生成公钥和私钥
[在线生成非对称加密公钥私钥对](http://web.chacuo.net/netrsakeypair)
## 封装encrypt.js
```
import setting from '@/settings.js'  //setting文件中配置了是否启用加密enable 以及publicKey公钥
import { JSEncrypt } from 'jsencrypt'
const $encrypt = {}
$encrypt.encrypt = function (data) {
  if (!setting.encrypt.enable) {
    //  没有启用加密
    return data
  }
  let encrypt = new JSEncrypt()
  encrypt.setPublicKey(setting.encrypt.publicKey)
  return encrypt.encrypt(data)
}

export default $encrypt

```
参考链接 
`https://blog.csdn.net/wz_coming/article/details/119419867`
`http://t.zoukankan.com/guwufeiyang-p-14925898.html`