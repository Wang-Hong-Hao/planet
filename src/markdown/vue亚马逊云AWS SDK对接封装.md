使用亚马逊云的AWS3sdk实现云存储对接，作为最大的云存储服务商国内腾讯的cos阿里的alicos以及minio
都兼容亚马逊的sdk，这样在对接时可减少很多工作量，同时也支持在服务商间快速切换

### 说明

`cacheStsInfo`为由后端返回的sts配置信息，根据实际业务需要，具体信息包含
![](https://img2023.cnblogs.com/blog/2483371/202305/2483371-20230529150903058-2034294158.png)

以上数据最后由前端缓存下来后，每次使用时根据过期时间进行判断，过期后在重新请求(此处缓存的逻辑代码忽略，自行实现即可)

`ProxyAWS`为单例模式代理

`binconv`为安装的插件 ，AWS sdk读取文件时返回的是readableStream，binconv的作用就是将readableStream 转换成blob，

`createFileKey`和`randomNum`是根据用户id,桶名生成文件名的方法（根据实际业务需要进行调整）
```
import { cacheStsInfo } from './cacheStsInfo'
import S3 from 'aws-sdk/clients/s3'
import * as binconv from 'binconv'
import { Message } from 'element-ui'

let ProxyAWS = (function () {
  let instance
  return function (info) {
    if (!instance) {
      instance = new S3({
        endpoint: info.ossInfo.endpoint,
        accessKeyId: info.credentials.tmpAccessKey,
        secretAccessKey: info.credentials.tmpSecretKey,
        sessionToken: info.credentials.sessionToken,
        s3ForcePathStyle: true, // 使用路径样式访问
        signatureVersion: 'v4' // 使用v4签名版本
      })
    }
    return instance
  }
})()

const uploader = {
  getUrl: async function (objectId) {
    let info = await cacheStsInfo()
    const s3 = new ProxyAWS(info)
    return new Promise((resolve, reject) => {
      s3.getObject({ Bucket: info.ossInfo.bucket, Key: objectId }, async function (error, fileData) {
        if (!error) {
          console.log(fileData, 'file')
          // 将readableStream 转换成blob
          const blob = await binconv.readableStreamToBlob(fileData.Body)
          const newBlob = new Blob([blob], { type: fileData.ContentType })
          let url = window.URL.createObjectURL(newBlob)
          resolve(url)
        } else {
          console.log(error, ' ERROR ')
        }
      })
    })
  },
  uploadFile: async function (file, filename, objectId = '') {
    let info = await cacheStsInfo()
    if (objectId === '' || objectId === undefined) {
      objectId = createFileKey(info.permissionPath, filename)
    }
    const s3 = new ProxyAWS(info)
    s3.upload({ Bucket: info.ossInfo.bucket, Key: objectId, Body: file }, (err, data) => {
      if (err) {
        console.log(err)
        Message.error('上传失败')
      } else {
        console.log(data)
        Message.success('上传成功')
      }
    })
    let params = {
      Bucket: info.ossInfo.bucket, Key: objectId, Expires: 3600
    }
    let url = s3.getSignedUrl('getObject', params)
    return { objectId, url }
  }
}

/* 生成上传到桶中filepath，也就是存库的objectId*/
function createFileKey (permissionPath, filename) {
  let fileType = filename.substring(filename.lastIndexOf('.'))
  return `${permissionPath + randomNum(6)}${parseInt(Math.floor(Math.random() * Date.now()) / 1000)}${fileType}`
}

const randomNum = (len) => {
  len = len || 32
  let chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'
  let maxPos = chars.length
  let rnd = ''
  for (let i = 0; i < len; i++) {
    rnd += chars.charAt(Math.floor(Math.random() * maxPos))
  }
  return rnd
}

export default uploader

```