<script setup lang="ts">
import Music from './music/index.vue'
import list from './data'

const params = ref({
  input: '',
  filter: 'name',
  type: 'netease',
  page: '1',
})
function go() {
  fetch('/', {
    method: 'POST',
    body: JSON.stringify(params.value),
  })
    .then(res => res.text())
    .then(res => res)
}
</script>

<template>
  <div w-180 mx="auto" flex flex-col items-center>
    <div i-carbon:music h-16 w-16 mb-8 />
    <p mb-4 opacity-75 text-sm>
      SEARCH MUSIC BY NAME
    </p>
    <input
      v-model="params.input"
      placeholder="input name"
      aria-label="search"
      type="text"
      autocomplete="false"
      p="x4 y2" mb-4
      w-180
      text="center"
      bg="transparent"
      border="~ rounded gray-160 dark:gray-700"
      outline="none active:none"
      @keydown.enter="go"
    >
    <Music :list="list" />
  </div>
</template>
