<script setup lang='ts'>
import Slider from './slider.vue'
import { formaTime } from './audio'
import type { IAudio } from './audio'
import type { ICurrent } from './types'

const props = defineProps<{
  aboutAudio: IAudio
  current: ICurrent
}>()
const emit = defineEmits<{
  (e: 'showMeTheList'): void
  (e: 'changeMode'): void
  (e: 'sliderChange', payload: number): void
}>()

/* 展开和收起列表 */
function showMeTheList() {
  emit('showMeTheList')
}

/* 播放模式切换 */
function changeMode() {
  emit('changeMode')
}

/* 播放进度切换 */
function sliderChange(payload:number) {
  emit('sliderChange', payload)
}
</script>

<template>
  <div class="slider" flex items-center pl-0.5>
    <!-- slider -->
    <Slider
      :about-audio="aboutAudio"
      :max="props.aboutAudio.duration"
      @slider-change="sliderChange"
    />
    <!-- time -->
    <div text-xs w-24 pl-2 text-center>
      {{ formaTime(props.aboutAudio.currentTime.value) }}
      -
      {{ formaTime(aboutAudio.duration.value) }}
    </div>
    <!-- tool -->
    <div w-20 flex justify-around items-center>
      <div i-iconoir:sound-high />
      <div cursor-pointer @click="changeMode">
        <div
          v-show="props.current.mode === 'list'"
          i-akar-icons:arrow-right-thick
          title="列表循环"
        />
        <div
          v-show="props.current.mode === 'loop'"
          i-cil:loop-1
          title="单曲循环"
        />
        <div
          v-show="props.current.mode === 'random'"
          i-dashicons:randomize
          title="随机播放"
        />
      </div>
      <div i-ci:list-ol @click="showMeTheList" />
    </div>
  </div>
</template>
