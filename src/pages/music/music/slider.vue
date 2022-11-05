<script setup lang='ts'>
import type { Ref } from 'vue'
import type { IAudio } from './audio'

const props = defineProps<{
  max: Ref<number>
  aboutAudio: IAudio
}>()
const emit = defineEmits<{
  (e: 'sliderChange' ,payload: number) :void
}>()

const app = ref<HTMLElement | null>(null)
const section = ref<HTMLElement | null>(null)
const cache = ref<HTMLElement | null>(null)
const active = ref<HTMLElement | null>(null)
const slider = ref<HTMLElement | null>(null)
// 滑动条长度
let sliderLength = 0

onMounted(() => {
  sliderLength = slider.value!.clientWidth
  app.value = document.querySelector('#app')
  app.value?.addEventListener('mousemove', onMouseMove)
  app.value?.addEventListener('mouseup', onMouseUp)
})

// 计算滑块以及buffer所处位置------------------------
function calcActiveLength(time: number) {
  // 播放进度
  const length = (time / props.max.value) * sliderLength
  transformSliders(length)
}

watch(
  () => props.aboutAudio.currentTime.value,
  n => calcActiveLength(n),
)
// 计算滑块以及buffer所处位置end---------------------

// 进度条拖动---------------------------------------
let moveLock = true // 拖动锁
let initX = 0 // 初始位置
function onMouseDown(e:MouseEvent) {
  if(!initX) initX = e.clientX
  moveLock = false // 打开拖动锁
}
function onMouseUp(e: MouseEvent) {
  if(moveLock) return 
  moveLock = true
}
function onMouseMove(e: MouseEvent) {
  if(moveLock) return
  let moveX = e.clientX - initX
  // 边界检测
  if(e.clientX < initX  ) moveX = 0
  if(e.clientX >= initX + sliderLength) moveX = sliderLength
  transformSliders(moveX)
  //通知aboutAudio
  const time = props.max.value * (moveX / sliderLength)
  console.log(time)
  emit('sliderChange', time)
}
// ----------------------------------------------------

// tool ------------------------------------------------
function transformSliders(length:number) {
  section.value!.style.left = `${length}px`
  active.value!.style.width = `${length}px`
  // buffer进度
  // bufferRange:{length: 0 - 1}
  const buffer = props.aboutAudio.buffered.value!.length 
  const bufferLength = buffer * sliderLength
  cache.value!.style.width = `${bufferLength}px`
}

</script>

<template>
  <div h-1 mr-2 flex-1 relative>
    <div ref="slider" full absolute left-0 top-0 bg="#eee" />
    <div ref="cache" absolute h-full w-0 left-0 top-0 bg="#ccc" />
    <div ref="active" absolute h-full w-0 left-0 top-0 bg="blue" />
    <section 
      ref="section" 
      h-3 w-3 b rounded="50%" 
      absolute bottom--1 
      bg="blue"
      cursor-pointer
      @mousedown="onMouseDown" 
    />
  </div>
</template>

<style>
section:active {
  width: 1rem;
  height: 1rem;
  bottom: -0.4rem;
}
</style>

