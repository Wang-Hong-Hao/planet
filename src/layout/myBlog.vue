<template>
  <div v-for="(item, index) in blogList" :key="index" style="width: 800px; margin: 0 auto">
    <label class="title">{{ item.fileName }}</label>
    <div class="markdown-body" v-html="item.content" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import blog from '@/blog/blog.json'
interface Blog {
  fileName: string
  content: string
}
interface BlogArray {
  [index: number]: Blog
}
const blogList = ref<BlogArray>(blog)
</script>

<style lang="scss" scoped>
.title {
  -webkit-text-size-adjust: 100%;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: unset !important;
  font-family:
    -apple-system,
    system-ui,
    Segoe UI,
    Roboto,
    Ubuntu,
    Cantarell,
    Noto Sans,
    sans-serif,
    BlinkMacSystemFont,
    Helvetica Neue,
    PingFang SC,
    Hiragino Sans GB,
    Microsoft YaHei,
    Arial !important;
  word-break: break-word;
  list-style: none;
  background-color: transparent;
  margin: initial;
  text-decoration: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  color: var(--juejin-font-1);
  width: 100%;
  display: -webkit-box;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
</style>
