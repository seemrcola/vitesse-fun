<script setup lang='ts'>
import MainSweeper from './mainSweeper/index.vue'
</script>

<template>
  <div flex-center flex-col>
    <div i-game-icons:bolt-bomb h-12 w-12 /> 
    <p font-bold text-xl py-4>MineSweeper</p>
    <MainSweeper />
  </div>
</template>
