```
await api(html).then(res => {
        const blob = new Blob([res], { type: 'application/pdf;charset-UTF-8' })
        const url = URL.createObjectURL(blob)
        window.open(url)
      })
```
```
export function api (data) {
  return request({
    url: '/kc/print/kcSeatingExport',
    method: 'post',
    data,
    responseType: 'blob'
  })
}
```