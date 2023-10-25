### 业务背景
需求系统同时只能有一位用户登录，此时系统使用的sessionStorage在多开标签页时无法共享，用户重新开一个标签页，就可以再次登录，其次标签页关闭时会话到期 不能保留用户信息

### 利用localStorage事件来跨标签页共享sessionStorage
```
 <script>
      // session实现多标签页共享
      ;(function () {
        // 判断当前sessionStorage中是否存在数据
        if (!sessionStorage.length) {
          // 随便存储一个数据触发storage监听
          localStorage.setItem('getSessionStorageData', Date.now())
        }
        window.addEventListener('storage', function (event) {
          if (event.key == 'getSessionStorageData') {
            // 通过localStorage暂时共享数据
            localStorage.setItem('sessionStorageData', JSON.stringify(window.sessionStorage))
            localStorage.removeItem('sessionStorageData')
          }
          if (event.key == 'sessionStorageData' && !sessionStorage.length) {
            const data = JSON.parse(event.newValue)
            for (key in data) {
              window.sessionStorage.setItem(key, data[key])
            }
          }
          if (event.key == 'clearSessionStorageData') {
            sessionStorage.clear()
            location.reload()
          }
          if (event.key == 'loginSessionStorageData') {
            const data = JSON.parse(event.newValue)
            for (key in data) {
              window.sessionStorage.setItem(key, data[key])
            }
            location.reload()
          }
        })
      })()
    </script>
```
```
const syncStorage = {}
// 在系统退出的时候调用
syncStorage.clear = function () {
  localStorage.setItem('clearSessionStorageData', Date.now())
}
// 在系统登录的时候调用
syncStorage.login = function () {
  localStorage.setItem('loginSessionStorageData', JSON.stringify(window.sessionStorage))
  localStorage.removeItem('loginSessionStorageData')
}
export default syncStorage
```

[参考链接🔗](https://blog.51cto.com/u_11103019/3773726)