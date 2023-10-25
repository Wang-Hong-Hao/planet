```
print () {
      this.printLoading = true
      const dom = document.querySelector('#printBox')
      // 添加延时器以解决loading 效果失效的问题
      setTimeout(() => {
        this.$print(dom)
      }, 100)
      setTimeout(() => {
        this.printLoading = false
      }, 100)
    },
```