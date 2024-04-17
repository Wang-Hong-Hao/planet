<template>
  <div v-for="(item, index) in blogList" :key="index" class="blog">
    <a class="title" @click="viewDetails(index)">{{ item.fileName }}</a>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import blog from "@/blog/blog.json";
interface Blog {
  fileName: string;
  content: string;
}
export default {
  setup() {
    const router = useRouter();
    const blogList = ref<Blog[]>(blog);

    const viewDetails = function (index: number): void {
      router.push({
        path: "/detail",
        query: {
          index,
        },
      });
    };

    // const document = new Document({})
    // blogList.value.forEach((blog, index) => {
    //   document.add({
    //     id: index,
    //     ...blog
    //   })
    // })
    // const search = function () {
    //   const res = document.search('setChannel.onmessage')
    //   console.log(res);

    // }


    return { blogList, viewDetails };
  },
};
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
