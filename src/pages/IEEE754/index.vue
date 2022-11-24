<script setup lang='ts'>

const S = ref(0)
const E = ref<number[]>(new Array(11).fill(0))
const M = ref<number[]>(new Array(52).fill(0))

// 开始计算
function calc(e:any) {
  let number = (e.target.value)
  let [intStr, floatstr] = [0, 0]
  let pos = 0
  //大于1的整数
  if(number >= 1 && !number.includes('.')) {
    number = `${number}.0`
  }
  //0和1之间的小数
  if(number < 1 && number > 0) {
    pos--
    let res = calcFloat(Number(number))
    let iter = [...res]
    for(let i of iter) {
      if(i === 0) {
        pos--
        res.shift()
      }
      else break
    }
    calcE([1], pos)
    calcM([], res)
    return 
  }

  [intStr, floatstr] = number.split('.')
  let int = Number(intStr)
  let float = Number(`0.${floatstr}`)
  let intRes = calcInt(int)
  let floatRes = calcFloat(float)
  // (...initRes)2.(...floatRes)2
  calcE(intRes, pos)
  calcM(intRes, floatRes)
}

//整数部分转二进制
function calcInt(num:number) {
  let result = []
  let bin = 0
  while(num !== 0) {
    let cp = num
    num = ~~(num / 2)
    bin = cp % 2
    result.unshift(bin)
  }
  return result
}
//小数部分转二进制
function calcFloat(num:number) {
  let result = []
  while(result.length < 100) {
    let calcnum = num * 2
    if(calcnum >= 1) {
      result.push(1)
      num = calcnum - 1
    }
    else {
      result.push(0)
      num = calcnum
    }
  }
  return result
}

//生成 E
function calcE(nums: number[], pos:number) {
  let l = nums.length - 1 + pos
  let e = calcInt(1023 + l)
  if(e.length < 11) 
    e = new Array(11 - e.length).fill(0).concat(e)
  E.value = e
}
//生成 M
function calcM(num1: number[], num2: number[]) {
  let res = [...num1, ...num2]
  res.shift()
  M.value = res
}
</script>

<template>
  <div flex flex-col justify-center>
    <div i-fluent-emoji-high-contrast:input-numbers h-16 w-16 m-auto/>
    <p h-12 text-xl font-bold flex-center my-4>
      IEEE754
    </p>

    <input
      id="input"
      type="text"
      autocomplete="false"
      p="x4 y2" m-auto mb-4
      w="250px"
      text="center"
      bg="transparent"
      border="~ rounded gray-200 dark:gray-700"
      outline="none active:none"
      @keydown.enter="calc"
    >

    <div w-100 h-100 p-4 b rounded-2 m-auto flex flex-col>
      <!-- sign  -->
      <div flex mb-2 flex-1>
        <div h-8 w-6 b border="#d44f" rounded-1 flex-center>{{S}}</div>
      </div>
      <!-- e^ -->
      <div flex mb-2 flex-1>
        <div v-for="i in 11" :key="i" 
        h-8 w-6 b border="#22eecc" rounded-1 mr-1 flex-center
        >
         {{E[i-1]}}
        </div>
      </div>
      <!-- float -->
      <div flex flex-wrap flex-1>
        <div v-for="i in 52" :key="i" 
        h-8 w-6 b border="#66666"  rounded-1 mr-1 mb-1 flex-center
        >
        {{M[i-1]}}
        </div>
      </div>
    </div>
  </div>
</template>
