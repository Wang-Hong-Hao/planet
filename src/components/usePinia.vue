<template>
  {{ userStore.name }}-
  {{ userStore.age }}
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/user'

const userStore = useUserStore()
</script>
