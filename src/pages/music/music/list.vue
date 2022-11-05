<script setup lang='ts'>
const props = defineProps<{
  list: any[]
  current: any
  show: boolean
}>()
const emit = defineEmits<{
  (e: 'changeMusic', payload: number): void
}>()

function changeMusic(index: number) {
  if (index === props.current.index)
    return
  emit('changeMusic', index)
}
</script>

<template>
  <div class="base" :class="{ show }" h-0 overflow-hidden>
    <div
      v-for="(music, index) of props.list"
      :key="index"
      class="music-item"

      h-10 b-b b-x border="#ccc"
      px-2 pl-0
      flex items-center
      text-sm font-500
      relative
      @click="changeMusic(index)"
    >
      <p
        absolute w-1 h-8 left-0 bg="#ccc"
        :class="{ blue: index === props.current.index }"
        ml-1 mr-2
      />
      <p w-10 text-left pl-4>
        {{ index + 1 }}
      </p>
      <p flex-1 truncate text-left>
        {{ music.title }}
      </p>
      <p w-40 truncate text-right>
        {{ music.author }}
      </p>
    </div>
  </div>
</template>

<style lang="scss">
.music-item {
  cursor: pointer;
  transition: all .6s;
}
.music-item:last-child {
  border-radius: 0 0 3px 3px;
}
.music-item:hover{
 background-color: rgba($color: #eee, $alpha: 0.4);
}
.blue {
  background-color: rgba($color: #05f, $alpha: 1);
}
.base {
  transition: all .8s;
}
.show {
  height: 20rem
}
</style>

