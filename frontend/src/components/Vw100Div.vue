<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const vw100Ref = ref<HTMLElement | null>(null)
const vw100Width = ref(0)
const viewportWidth = ref(0)
const isVisible = ref(true)

const updateWidths = () => {
  viewportWidth.value = window.innerWidth
  if (vw100Ref.value) {
    vw100Width.value = vw100Ref.value.offsetWidth
  }
}

onMounted(() => {
  window.addEventListener('resize', updateWidths)
  updateWidths()
})

onUnmounted(() => {
  window.removeEventListener('resize', updateWidths)
})

const toggleVisibility = () => {
  isVisible.value = !isVisible.value
}
</script>

<template>
  <div v-if="isVisible" style="position: relative;">
    <div 
      ref="vw100Ref"
      style="width: 100vw; height: 0; position: relative; box-sizing: border-box;"
    >
    </div>
  </div>
</template>

<style scoped>
</style>
