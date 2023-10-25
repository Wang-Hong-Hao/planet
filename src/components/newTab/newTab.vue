/**
 * Created by wanghonghao on 2023/02/15
 */
<!-- 新标签页设置主题 -->
<template>
    <div class="newTab" v-cloak>
        <slot></slot>
    </div>
</template>

<script>
export default {
    name: 'newTab',
    mounted() {
        let { theme } = this.$route.query
        this.setBodyAttribute(theme)
    },
    methods: {
        setBodyAttribute(newVal) {
            const body = document.body
            this.$nextTick(() => {
                body.setAttribute('data-theme', newVal)
            })
        }
    }
}
</script>

<style scoped lang="scss">

</style>
