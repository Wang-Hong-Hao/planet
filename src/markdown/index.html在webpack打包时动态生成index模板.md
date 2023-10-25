通过`<%= BASE_URL %>`包裹环境变量

通过`<% if (process.env.NODE_ENV === 'production' ) { %>  <% } %>`包裹条件判断


```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta content="IE=edge,chrome=1" http-equiv="X-UA-Compatible"/>
  <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport"/>
  <link href="<%= BASE_URL %>favicon.ico" rel="icon"/>
  <title><%= VUE_APP_TITLE %></title>
  <!--  用于动态控制打印方向-->
  <style id="printStyle">
    @media print {
      @page {
        size: portrait//portrait 纵向 landscape 横向
      }
    }
  </style>
  <% if (process.env.NODE_ENV === 'production' ) { %>
  <script src="config.js" type="text/javascript"></script>
  <script>
    document.title = window.SITE_CONFIG.appTitle
  </script>
  <script>
    // 生产环境下引入百度统计
    var _hmt = _hmt || [];
    (function () {
      var hm = document.createElement("script");
      hm.src = "https://hm.baidu.com/hm.js?f3469347be30afe72d0f0c0169c6ddb6&quot"
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(hm, s);
    })();
  </script>
  <% } %>
  <!--    其他环境读取环境变量-->
  <% if (process.env.NODE_ENV !== 'production' ) { %>
  <script>
    window.SITE_CONFIG = {};
    window.SITE_CONFIG['appTitle'] = '<%= process.env.VUE_APP_TITLE %>';
    window.SITE_CONFIG['version'] = '<%= process.env.VUE_APP_VERSION %>';
    window.SITE_CONFIG['apiURL'] = '<%= process.env.VUE_APP_API %>';
    window.SITE_CONFIG['websocketURL'] = '<%= process.env.VUE_APP_API_WEBSOCKET %>'
    window.SITE_CONFIG['VUE_APP_API_REPORT'] = '<%= process.env.VUE_APP_API_REPORT %>'
  </script>
  <% } %>
</head>
<body>
<script>
  // session实现多标签页共享
  ;(function () {
    // 判断当前sessionStorage中是否存在数据
    if (!sessionStorage.length) {
      // 随便存储一个数据触发storage监听
      localStorage.setItem('getSessionStorageData', Date.now())
    }
    window.addEventListener('storage', function (event) {
      if (event.key === 'getSessionStorageData') {
        // 通过localStorage暂时共享数据
        localStorage.setItem('sessionStorageData', JSON.stringify(window.sessionStorage))
        localStorage.removeItem('sessionStorageData')
      }
      if (event.key === 'sessionStorageData' && !sessionStorage.length) {
        const data = JSON.parse(event.newValue)
        for (key in data) {
          window.sessionStorage.setItem(key, data[key])
        }
      }
      if (event.key === 'clearSessionStorageData') {
        sessionStorage.clear()
        location.reload()
      }
      if (event.key === 'loginSessionStorageData') {
        const data = JSON.parse(event.newValue)
        for (key in data) {
          window.sessionStorage.setItem(key, data[key])
        }
        location.reload()
      }
    })
  })()
  // 浏览器url不包含hash值 基于hash模式的vueRouter在hash值改变后不会影响url,页面不会进行刷新
  // 监听hash值改变后重新刷新浏览器
  window.onhashchange = function () {
    if (window.location.hash.includes('guidePage')) {
      window.location.reload()
    }
  }
</script>
<noscript>
  <strong>We're sorry but <%= webpackConfig.name %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
<!-- built files will be auto injected -->
</body>
</html>

```
