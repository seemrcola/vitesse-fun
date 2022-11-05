<script setup lang='ts'>
import type { IAudio } from './audio'
import type { ICurrent } from './types'
import { formatLrc } from './utils'
interface Props {
  current: ICurrent
  aboutAudio: IAudio
}
const props = defineProps<Props>()

const lrcbox = ref<HTMLElement | null>(null)

// 格式化歌词信息--------------------------------------------
const formatlrc = ref<any[]>([])
formatlrc.value = formatLrc(props.current.music.lrc)
// 格式化歌词信息 end-----------------------------------------

// 歌词滚动处理----------------------------------------------
const currentLine = ref(0)
function lyricify(now: number) {
  const time = formatlrc.value[currentLine.value].time
  const nextTime = formatlrc.value[currentLine.value + 1]?.time
  if (now >= time && !nextTime) // nextTime 为undefined 的时候，代表已经到达最后一句
    return 'finish'
  if (now >= time && now < nextTime) {
    lrcbox.value!.style.transform = `translateY(${-currentLine.value * 20}px)`
    currentLine.value++
  }
}
watch(
  () => props.aboutAudio.currentTime.value,
  n => lyricify(n),
)
// 歌词滚动处理 end-------------------------------------------

// 切换歌曲处理---------------------------------------------
watch(
  () => props.current.music,
  (n) => {
    currentLine.value = 0
    formatlrc.value = formatLrc(n.lrc)
  },
)
// 切换歌曲处理---------------------------------------------
</script>

<template>
  <div text-xs full>
    <div ref="lrcbox" class="lrcbox" transition duration-1000>
      <p
        v-for="(lrc, index) of formatlrc" :key="index"
        leading="20px"
        :class="{ highlight: currentLine - 1 === index }"
      >
        <span>{{ index <= 0 ? '[ loading... ]' : lrc.lrc }}</span>
      </p>
    </div>
  </div>
</template>

<style>
.highlight {
  font-size: 1rem;
}
.highlight>span {
  position: relative;
}
.highlight>span:before {
  content: '☞';
  position: absolute;
  left:-20px
}
</style>
