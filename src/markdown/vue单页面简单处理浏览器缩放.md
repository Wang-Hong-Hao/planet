适合登录页面等单独的页面处理浏览器缩放
```
 mounted () {
    window.onresize = () => {
      this.$nextTick(() => {
        const el = document.querySelector('.login-wrapper')
        el.style.zoom = String(document.body.offsetWidth / 1920)
      })
    }
  },
```