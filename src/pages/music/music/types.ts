export type playMode = 'list' | 'loop' | 'random'
export interface ICurrent {
  music: { [propsName: string]: any }
  last: boolean
  index: number
  mode: playMode
}
