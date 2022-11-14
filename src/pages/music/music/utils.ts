export function formatLrc(lrc: string) {
    if (lrc === '') {
        return [
            {
                time: 0,
                lrc: 'loading...',
            }, // 这个是占位的，设计上第0行不展示
            {
                time: 1,
                lrc: '「『暂无歌词』」',
            },
        ]
    }

    const traget: any[] = []
    const lrcArr = lrc.split('\n')

    function timeFormat(time: string) {
        const timeArr = time.split(':')
        const calcTime = `${+timeArr[0] * 60 + +timeArr[1]}`
        return calcTime
    }

    lrcArr.forEach((lrc) => {
        const lrcItem: { [propName: string]: any } = {}
        const result = lrc.match(/\[(.*?)\]/)
        if (result) { // time 可能为null
            if (timeFormat(result[1])) // time 可能是个NaN
                lrcItem.time = timeFormat(result[1])
            else return
        }
        lrcItem.lrc = lrc.replace(/\[.*?\]/, '')
        if (!lrcItem.lrc) // lrc 可能为空
            return
        traget.push(lrcItem)
    })
    return traget
}
