## Music 组件
### index文件
index文件是最外层文件
```html
<Music>
  <Cover />
  <BaseInfo />
  <Lrc />
  <Controls>
    <Slider />
    <Icons />
  </Controls>
</Music> 
``` 
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
aboutAudio提供
- audio实例 <audio>
- audio duration audio总时长
- audio currentTime audio 当前播放时长
- audio buffer audio缓冲
- audio 处于播放还是暂停
- audio 是否播放完毕  
该数据提供对播放器相关的的展示，如进度条展示，播放还是暂停的展示。

current提供
- 当前播放的音频的数据
- 是否最后一个音频
- 播放模式
- 当前音频序号和音频相关信息（如url author等--由用户提供）  
该数据是对当前播放的音频的展示

可以认为 播放器audio + 音频数据data = 播放器组件player


