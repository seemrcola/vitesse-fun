## Music 组件
### index文件
index文件是最外层文件
<Music>
  <Cover />
  <BaseInfo />
  <Lrc />
  <Controls>
    <Slider />
    <Icons />
  </Controls>
</Music>  
负责向子组件提供如下数据
- current对象
- aboutAudio对象

current 对象如下
```ts
export type playMode = 'list' | 'loop' | 'random'
export interface ICurrent {
  music: { [propsName: string]: any }
  last: boolean
  index: number
  mode: playMode
}
```

aboutAudio 如下
```ts
export type PlayStatus = 'play' | 'pause'

export interface IAudio {
  audio: any
  status: Ref<PlayStatus>
  isEnd: Ref<boolean>
  duration: Ref<number>
  currentTime: Ref<number>
  buffered: Ref<TimeRanges | undefined>
}
```

### 功能逻辑
aboutAudio提供audio实例，audio duration ， audio currentTime ，audio buffer ，audio处于播放还是暂停， 以及audio是否播放完毕  
current提供当前播放的音频的数据，是否最后一个音频，播放模式，以及当前音频序号和音频相关信息  


