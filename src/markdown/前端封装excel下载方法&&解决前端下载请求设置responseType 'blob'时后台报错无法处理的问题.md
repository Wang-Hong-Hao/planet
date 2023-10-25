请求设置responseType: 'blob'时接口报错了如果不做处理则获取不到接口错误信息，此时下载的文件是有问题的。


```
/* @params options {}
 * data:Blob,
 * fileName:String,
 * successMsg:String,
 * */
import { Message } from 'element-ui'
import downloadExcelFilePublicHandler from '@/api/downloadExcelFile'
/* 注意 当使用公共模板下载接口时（/file/public/downloadExcelFile） 仅需传入fileName = 对应的文件名即可 */
export default async function downloadExcel (options = {}) {
  const { year, month, day, time } = getCurrentDate()
  const { data = null, fileName = '文件', successMsg = '下载成功' } = options
  const jsonMimeType = 'application/json'
  const dataType = data?.type ?? ''
  const isBlob = data instanceof Blob
  if (isBlob) {
    if (dataType === 'application/vnd.ms-excel' || dataType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
      const realFileName = `${fileName}-${time}.xls`
      const blob = new Blob([data], { type: dataType })
      const url = window.URL.createObjectURL(blob)
      // 生成一个a标签
      const link = document.createElement('a')
      link.id = 'downloadLink'
      link.style.display = 'none'
      link.href = url
      link.download = realFileName
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(document.getElementById('downloadLink'))
      Message.success(successMsg)
    } else if (dataType === 'application/json') {
      const reader = new FileReader()
      reader.readAsText(data)
      reader.onload = function () {
        const { code, msg } = JSON.parse(reader.result)
        if (code === 500 || code === 401) {
          throw new Error(msg)
          Message.error(msg)
        }
      }
    }
  } else {
    const formData = new FormData()
    formData.append('fileName', `${fileName}.xls`)
    const _data = await downloadExcelFilePublicHandler(formData)
    downloadExcel({ data: _data, fileName: fileName, successMsg: successMsg })
  }
}

function getCurrentDate () {
  const year = new Date().getFullYear()
  const month = new Date().getMonth() + 1
  const day = new Date().getDate()
  const time = year + '-' + month + '-' + day
  return {
    year,
    month,
    day,
    time
  }
}
```