<script setup lang="ts">
import Cover from './cover.vue'
import Controls from './controls.vue'
import BaseInfo from './baseinfo.vue'
import Lrc from './lrc.vue'
import List from './list.vue'
import { initAudio, setUrl,removeAudio } from './audio'
import type { ICurrent } from './types'
interface Props {
  list: any[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => [],
})

/* init ------------------------------------------------------- */
const current = ref<ICurrent>({
  music: props.list[0],
  index: 0, // 第几首歌
  last: props.list.length === 1, // 是否最后一首
  mode: 'list',
})
const aboutAudio = initAudio()
setUrl(aboutAudio.audio, current.value.music.url)
/* init ------------------------------------------------------- */

/* 定时获取audio.currentTime ------------------------------------ */
function getAudiotime() {
  const timer: any = setInterval(() => {
    if (aboutAudio.audio.status === 'pause')
      return clearInterval(timer)

    if (aboutAudio.isEnd.value) {
      // 如果已经全部播放完毕，则停止播放
      if (current.value.last) {
        aboutAudio.audio.pause()
        return clearInterval(timer)
      }
      playMusicWithMode()
      aboutAudio.isEnd.value = false // 将播放状态重置回未完成
      return clearInterval(timer)
    }

    //  获取buffered
    aboutAudio.buffered.value = aboutAudio.audio.buffered
    // 根据audio返回的时长来改变aboutAudio.currentTime，用于作展示
    aboutAudio.currentTime.value = aboutAudio.audio.currentTime
  }, 500)
}

// 播放状态改变的时候，对进度条做操作
watch(
  () => aboutAudio.status.value,
  () => getAudiotime(),
)
/* 定时获取audio.currentTime ---end------------------------------ */

/* list展示 与 音乐切换 ------------------------------------------ */
const ifShowList = ref(false)
function changeUrl() {
  aboutAudio.audio.pause()
  setUrl(aboutAudio.audio, current.value.music.url)
  aboutAudio.audio.play()
}
function showMeTheList() {
  ifShowList.value = !ifShowList.value
}
function changeMusic(playload: number) {
  current.value = {
    ...current.value,
    index: playload,
    music: props.list[playload],
    last: props.list.length === playload,
  }
  /* 切歌 */
  changeUrl()
  /* 时间重置 */
  aboutAudio.currentTime.value = 0
}
/* list展示 与 音乐切换end ----------------------------------------- */

/* 播放模式切换 ---------------------------------------------------- */
const modeTuple = ['list', 'loop', 'random'] as const
let defaultMode = 0
function changeMode() {
  if (defaultMode === modeTuple.length - 1)
    defaultMode = 0
  else defaultMode++
  current.value.mode = modeTuple[defaultMode]
}
/* 播放模式切换 end------------------------------------------------ */

/* 歌曲播放完毕之后按模式选择播放下一首 ------------------------------- */
function playMusicWithMode() {
  const random = Math.floor(Math.random() * props.list.length)
  const index = current.value.index + 1
  switch (current.value.mode) {
    case 'list':
      current.value = {
        mode: 'list',
        last: index === props.list.length - 1,
        index,
        music: props.list[index],
      }
      break
    case 'loop':
      current.value = {
        ...current.value,
        mode: 'loop',
        last: false,
      }
      break
    case 'random':
      current.value = {
        mode: 'random',
        last: false,
        index: random,
        music: props.list[random],
      }
      break
  }
  aboutAudio.currentTime.value = 0
  changeUrl()
}
/* 歌曲播放完毕之后按模式选择播放下一首 ------------------------------- */

/* 进度切换 */
function sliderChange(payload: number) {
  aboutAudio.currentTime.value = payload
  aboutAudio.audio.currentTime = payload
}

// 清空audio
onBeforeUnmount(() => {
  removeAudio(aboutAudio)
})
</script>

<template>
  <article w-full>
    <div
      b rounded-1
      border="#eee"
      w-full h="120px"
      flex
    >
      <Cover
        h="120px" w="120px"
        :current="current"
        :about-audio="aboutAudio"
      />
      <div flex-1 flex flex-col pl-3>
        <!-- title & author -->
        <BaseInfo
          h-8
          :current="current"
        />
        <!-- lrc -->
        <Lrc
          flex-1 overflow-hidden
          :current="current"
          :about-audio="aboutAudio"
        />
        <!-- controls -->
        <Controls
          h-6
          :current="current"
          :about-audio="aboutAudio"
          @show-me-the-list="showMeTheList"
          @change-mode="changeMode"
          @slider-change="sliderChange"
        />
      </div>
    </div>
    <List
      :list="props.list"
      :show="ifShowList"
      :current="current"
      @changeMusic="changeMusic"
    />
  </article>
</template>
