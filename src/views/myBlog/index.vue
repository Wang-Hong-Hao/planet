<template>
  <div v-for="(item, index) in blogList" :key="index" class="blog">
    <a class="title" @click="viewDetails(index)">{{ item.fileName }}</a>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
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
    const router = useRouter()

    const blogList = ref<BlogArray>(blog)
    console.log(blog);


    const viewDetails = function (index: number): void {
      router.push({
        path: '/detail',
        query: {
          index,
        }
      })

    }

    return { blogList, viewDetails }
  }
}
</script>

<style lang="scss" scoped>
.blog {
  height: 6.25rem;
}

.title {
  -webkit-text-size-adjust: 100%;
  word-wrap: break-word;
  font-kerning: normal;
  font-feature-settings: "kern", "liga", "clig", "calt";
  font-weight: 900;
  text-rendering: optimizeLegibility;
  line-height: 1.1;
  font-size: 1.75rem;
}
</style>
