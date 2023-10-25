import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from '@/router/index'

import 'normalize.css/normalize.css'
import '@/styles/golbal.scss'
import '@/styles/skin.css'
import 'github-markdown-css'
// 引入字体
import '@/assets/fonts/fonts-post.css';
import '@/assets/fonts/fonts-shared.css';
// 引入UI
import '@/components/xy-ui/index.js'
// 引入symbol图标js
import '@/assets/iconfont/iconfont.js'
// 引入icon-svg组件
import IconSvg from '@/components/icon-svg/icon-svg.vue'
// 创建vue实例
const app = createApp(App)
// 全局注册icon-svg
app.component('IconSvg', IconSvg)
// 挂载pinia
app.use(store)
app.use(router)
// 挂载实例
app.mount('#app')
