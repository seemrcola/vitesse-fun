<script setup lang='ts'>
import type { ICurrent } from './types'
const props = defineProps<{
  current: ICurrent
}>()
</script>

<template>
  <div flex items-center>
    <span font="700">{{ props.current.music.title }}</span>
    <span>&nbsp;&nbsp;</span>
    <span color="gray" text-sm>「{{ props.current.music.author }}」</span>
  </div>
</template>
