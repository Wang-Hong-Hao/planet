概述：在index.html模板中判断当前环境，处于开发环境下时读取process环境变量、处于生产环境下时读取根目录配置文件（./config.js）,两种环境下将配置统一挂载到window全局变量上（SET_CONFIG）
`config.js`
```
window.SITE_CONFIG = {
  appTitle: '系统测试',
  version: '1.0.0',
  apiURL: '',
  websocketURL: '',
  reportURL: ''
}
```

`index.html`
```
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8"/>
  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
  <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  <link rel="icon" href="<%= BASE_URL %>favicon.ico"/>
  <title><%= VUE_APP_TITLE %></title>
  <% if (process.env.NODE_ENV === 'production' ) { %>
  <script type="text/javascript" src="config.js"></script>
  <script>
    document.title = window.SITE_CONFIG.appTitle
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
<noscript>
  <strong>We're sorry but <%= webpackConfig.name %> doesn't work properly without JavaScript enabled. Please enable it to continue.</strong>
</noscript>
<div id="app"></div>
<!-- built files will be auto injected -->
</body>
</html>

```

#### 注意！！！

### 当env文件不是默认的.env.development或.env.production而是带有自定义模式的后缀时 
### 例如.env.prod 执行命令为vue-cli-service build --mode prod

### 此时需要在.env.prod中手动指定构建模式
### NODE_ENV=production