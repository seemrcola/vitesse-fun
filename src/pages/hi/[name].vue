<script setup lang="ts">
const props = defineProps<{ name: string }>()
const router = useRouter()
const user = useUserStore()
const { t } = useI18n()

watchEffect(() => {
  user.setNewName(props.name)
})

function music() {
  router.push({ name: 'music' })
}
function plum() {
  router.push({ name: 'plum' })
}
function mainSweeper () {
  router.push({ name: 'minesweeper' })
}
</script>

<template>
  <div>
    <div text-4xl>
      <div i-carbon-pedestrian inline-block />
    </div>
    <p>
      {{ t('intro.hi', { name: props.name }) }}
    </p>

    <p text-sm opacity-75>
      <em>{{ t('intro.dynamic-route') }}</em>
    </p>

    <template v-if="user.otherNames.length">
      <p text-sm mt-4>
        <span opacity-75>{{ t('intro.aka') }}:</span>
      <ul>
        <li v-for="otherName in user.otherNames" :key="otherName">
          <router-link :to="`/hi/${otherName}`" replace>
            {{ otherName }}
          </router-link>
        </li>
      </ul>
      </p>
    </template>

    <div>
      <button btn m="3 t6" text-sm @click="router.back()">
        {{ t('button.back') }}
      </button>
    </div>

    <div flex-center>
      <p opacity-75 cursor-pointer mr-4 @click="music">
        Muisc
      </p>
      <p opacity-75 cursor-pointer mr-4 @click="plum">
        Plum
      </p>
      <p opacity-75 cursor-pointer @click="mainSweeper">
        MineSweeper
      </p>
    </div>
  </div>
</template>
