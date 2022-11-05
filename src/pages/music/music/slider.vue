<script setup lang='ts'>
import type { Ref } from 'vue'
import type { IAudio } from './audio'

const props = defineProps<{
  max: Ref<number>
  aboutAudio: IAudio
}>()

const section = ref<HTMLElement | null>(null)
const cache = ref<HTMLElement | null>(null)
const active = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
// 滑动条长度
const sliderLength = ref(0)

onMounted(() => {
  sliderLength.value = slider.value!.clientWidth
})

// 计算滑块以及buffer所处位置------------------------
function calcActiveLength(time: number) {
  // 播放进度
  const length = (time / props.max.value) * sliderLength.value
  section.value!.style.transform = `translateX(${length}px)`
  active.value!.style.width = `${length}px`
  // buffer进度
  // bufferRange:{length: 0 - 1}
  const buffer = props.aboutAudio.buffered.value!.length * sliderLength.value
  cache.value!.style.width = `${buffer}px`
}

watch(
  () => props.aboutAudio.currentTime.value,
  n => calcActiveLength(n),
)
// 计算滑块以及buffer所处位置end---------------------
</script>

<template>
  <div h-1 flex-1 relative>
    <div ref="slider" full absolute left-0 top-0 bg="#eee" />
    <div ref="cache" absolute h-full w-0 left-0 top-0 bg="#ccc" />
    <div ref="active" absolute h-full w-0 left-0 top-0 bg="blue" />
    <section
      ref="section"
      h-3 w-3 b rounded="50%"
      absolute bottom--1
      bg="blue"
      t-all-800
      cursor-pointer
    />
  </div>
</template>

