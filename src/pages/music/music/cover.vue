<script setup lang='ts'>
interface Props {
  current: any
  aboutAudio: any
}
const props = withDefaults(defineProps<Props>(), {
  current: () => ({}),
  aboutAudio: () => ({}),
})

/* 取出status */
const status = props.aboutAudio.status
function changeStatus() {
  if (status.value === 'play')
    props.aboutAudio.audio.pause()
  else
    props.aboutAudio.audio.play()
}
</script>

<template>
  <div relative>
    <img w="118px" h="118px" rounded-1 :src="props.current.music.pic">
    <div
      class="cover" full rounded-1
      absolute left-0 top-0
      bg="#ccc" opacity-30
    />
    <div
      flex-center t-all-400
      :class="{
        play: status === 'play',
        pause: status === 'pause',
      }"
    >
      <div
        v-if="status === 'play'"
        i-carbon:pause-outline color="#fff"
        cursor-pointer
        class="play"
        @click="changeStatus"
      />
      <div
        v-else
        i-carbon:play-outline color="#fff"
        cursor-pointer
        class="pause"
        @click="changeStatus"
      />
    </div>
  </div>
</template>

<style>
.play {
  position: absolute;
  right: 0.2rem;
  bottom: 0.2rem;
  height: 1.8rem;
  width: 1.8rem;
}
.pause {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 2.5rem;
  width: 2.5rem;
  transform: translateX(-50%) translateY(-50%);
}
</style>

