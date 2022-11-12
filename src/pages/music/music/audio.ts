import { ref } from 'vue'
import { IAudio } from './types'

export function initAudio(): IAudio {
  const aboutAudio: IAudio = {
    audio: new Audio(),
    status: ref('pause'),
    isEnd: ref(false),
    duration: ref(0),
    currentTime: ref(0),
    buffered: ref(undefined),
  }

  /* 音频可以播放；如果权限允许则播放 且可以在不暂停的情况下播放完毕 */
  aboutAudio.audio.addEventListener('canplay', () => {
    /* 拿到音频时长 */
    aboutAudio.duration.value = aboutAudio.audio.duration
    aboutAudio.buffered.value = aboutAudio.audio.buffered
  })

  /* 播放时做一个监听 */
  aboutAudio.audio.addEventListener('play', () => {
    aboutAudio.status.value = 'play'
  })

  /* 暂停时做一个监听 */
  aboutAudio.audio.addEventListener('pause', () => {
    aboutAudio.status.value = 'pause'
  })

  /* 结束时做一个监听 */
  aboutAudio.audio.addEventListener('ended', () => {
    aboutAudio.isEnd.value = true
  })

  return aboutAudio
}

export function setUrl(audio: any, url: string) {
  audio.src = url
}

export function removeAudio(aboutAudio:IAudio) {
  aboutAudio.audio.pause()
  setUrl(aboutAudio, '')
  aboutAudio.audio.remove()
}

export function formaTime(time: number) {
  time = Math.floor(time)
  const m = Math.floor(time / 60)
  const s = time % 60
  const fm = m > 9 ? m : `0${m}`
  const fs = s > 9 ? s : `0${s}`
  return `${fm}:${fs}`
}

