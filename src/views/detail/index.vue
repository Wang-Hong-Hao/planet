<template>
  <h1><a>{{ _blog.fileName }}</a></h1>
  <div class="language-js" v-html="_blog.content" />
</template>

<script lang='ts'>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import blog from '@/blog/blog.json'
import Prism from "prismjs"
import "prismjs/themes/prism-tomorrow.min.css"//引入代码高亮主题（这个去node_modules的安装prismjs中找到想使用的主题即可）

interface Blog {
  fileName: string
  content: string
}
interface BlogArray {
  [index: number]: Blog
}
export default {
  setup() {

    onMounted(() => {
      Prism.highlightAll()// 全局代码高亮
    })

    const route = useRoute()
    const blogList = ref<BlogArray>(blog)
    // 获取路由参数
    const { index } = route.query as any
    const _blog = ref<Blog>(blogList.value[Number(index)])

    return { _blog }
  }
}
</script>

<style lang='scss' scoped></style>
