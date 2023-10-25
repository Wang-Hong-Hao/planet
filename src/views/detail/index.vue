<template>
  <div v-html="_blog.content" />
</template>

<script lang='ts'>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import blog from '@/blog/blog.json'
interface Blog {
  fileName: string
  content: string
}
interface BlogArray {
  [index: number]: Blog
}
export default {
  setup() {
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
