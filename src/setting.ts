interface Menu {
  title: string
  path: string
  icon: string
}

interface App {
  avatar: string
}
// 路由
export const menuList: Array<Menu> = [
  {
    title: '笔记',
    path: '/',
    icon: '',
  },
  {
    title: '代码',
    path: '/code',
    icon: '',

  },
  {
    title: '关于',
    path: '/about',
    icon: '',
  },
  {
    title: '详情',
    path: '/detail',
    icon: ''
  }
]
// app配置
export const app: App = {
  avatar: '@/assets/avatar.jpg'
}
