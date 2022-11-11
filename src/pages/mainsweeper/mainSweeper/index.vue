<script setup lang='ts'>
import { BlockState } from './types'
const HEIGHT = 10
const WIDTH = 10
const MODE = 'build'

// 初始化--------------------------------------------------
const state = reactive(
  Array.from(
    { length: HEIGHT },
    (_, y) =>
      Array.from({ length: WIDTH }, (_, x): BlockState => ({
        x,
        y,
        adjacentMines: 0,
        revealed: false
      }))
  )
)

let minesCount = ref(0)
let mineGenerated = false
function initGenerate(block:BlockState) {
  if(mineGenerated) return 
  mineGenerated = true
  generateMines(block) 
}
function generateMines(init:BlockState) {
  for (const row of state) {
    for (const block of row) {
      if(Math.abs(block.x - init.x) < 1) continue 
      if(Math.abs(block.y - init.y) < 1) continue
      block.mine = Math.random() < 0.2
      if(block.mine) minesCount.value++
    }
  }
  updateNumbers()
}
//--------------------------------------------------------- 

//-炸弹及数字生成--------------------------------------------- 
let around = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]
const color = reactive([
  'text-green-400',
  'text-blue-400',
  'text-yellow-400',
  'text-red-400',
  'text-orange-600',
  'text-red-500',
  'text-red-600',
])
function getColor(block: BlockState) {
  if(!block.revealed) 
    return 'bg-gray/10'

  return block.mine  ?
    'bg-red-500' :
    color[block.adjacentMines]
}
function getSiblings(block: BlockState) {
  return around
    .map(([dx, dy]) => {
      let y = block.y + dy
      let x = block.x + dx
      if (x < 0 || x >= WIDTH || y < 0 || y >= HEIGHT) return undefined
      return state[y][x]
    })
    .filter(Boolean) as BlockState[]
}

function updateNumbers() {
  state.forEach(list => {
    list.forEach(block => {
      if (block.mine) return
      getSiblings(block).forEach(sibling => {
        if (sibling.mine) block.adjacentMines++
      })
    })
  })
}
//--------------------------------------------------------- 

// 翻开---------------------------------------- ----- ----    
function blockClick(block: BlockState) {
  if (block.revealed) return
  if(block.mine) {
    return failed()
  }
  initGenerate(block)
  block.revealed = true
  expandZero(block)
  checkGameStatus()
}

function expandZero(block: BlockState) {
  if(block.adjacentMines) return 
  getSiblings(block).forEach(s => {
    if(!s.revealed) {
      s.revealed = true
      expandZero(s)
    }
  })
}

// 插旗做标记
function rightClick(block:BlockState) {
  if(block.revealed) return 
  block.flag = !block.flag
  checkGameStatus()
}

// 失败-------------------------------------------------------
function failed() {
  state.forEach(list => {
     list.forEach(block => block.revealed = true);
  })
}

// 监听游戏进度
function checkGameStatus() {
  if(!mineGenerated) return 
  const blocks = state.flat()
  if(blocks.every(block =>  block.revealed || block.flag )) {
    if(blocks.some(block => block.flag && !block.mine)) 
      alert("YOU CHEAT")
    else 
      alert("YOU WIN")
  }
}
</script>

<template>
  <div>
    <p text-sm mb-4>炸弹已生成：「{{minesCount}}」</p>
    <div v-for="(list, index) of state" :key="index" flex="~">
      <button 
        v-for="(item, idx) of list" :key="idx" 
        :class="getColor(item)" h-8 w-8 b flex-center m="1px"
        @click="blockClick(item)"
        @contextmenu.prevent="rightClick(item)"
      >
        <template v-if="item.revealed || MODE === 'dev'">
          <div v-if="item.mine">
            <div i-game-icons:bolt-bomb />
          </div>
          <div v-else >
            {{ item.adjacentMines }}
          </div>
        </template>
        <template v-else-if="!item.revealed && item.flag">
          <div text-red-5  i-fontisto:flag></div>
        </template>
      </button>
    </div>
  </div>
</template>
