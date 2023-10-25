##方式一
```
let params = {
        'token': Cookies.get('token')
      }
      window.location.href = `${window.SITE_CONFIG['baseURL']}/bridge/bridgeevaluatesubtaskbridge/export?${qs.stringify(params)}`
```
##方式二
 async downloadTemplate () {
      await api.downloadTemplate().then(res => {
        const jsonMimeType = 'application/json'
        const dataType = res.type
        const isBlob = res instanceof Blob && dataType !== jsonMimeType
        if (isBlob) {
          const realFileName = '成绩导入模板.xls'
          const blob = new Blob([res], { type: 'application/vnd.ms-excel' })
          const url = window.URL.createObjectURL(blob)
          // 生成一个a标签
          const link = document.createElement('a')
          link.id = 'templateDownloadLink'
          link.style.display = 'none'
          link.href = url
          link.download = realFileName
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(document.getElementById('templateDownloadLink'))
          this.$message({
            type: 'success',
            message: '下载成功'
          })
        } else {
          res.text().then(text => {
            const res = JSON.parse(text)
            if (res.code === 500) {
              util.$message.showError('无法完成下载,请重试或者联系管理员')
            }
          })
        }
      })
    },
```
```
export function exportExcel (params) {
    return request({
        url: '/export',
        method: 'GET',
        responseType: 'blob',
        params
    })
}
```