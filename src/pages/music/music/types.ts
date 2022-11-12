import type { Ref } from 'vue'
export type PlayStatus = 'play' | 'pause'

export type playMode = 'list' | 'loop' | 'random'

export interface ICurrent {
  music: { [propsName: string]: any }
  last: boolean
  index: number
  mode: playMode
}

export interface IAudio {
  audio: any
  status: Ref<PlayStatus>
  isEnd: Ref<boolean>
  duration: Ref<number>
  currentTime: Ref<number>
  buffered: Ref<TimeRanges | undefined>
}
