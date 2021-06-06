<template>
  <div class="mine">
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, readonly } from 'vue'

export default defineComponent({
  setup() {
    const obj = reactive({ name: 'jack' })
    const copy = readonly(obj)
    copy.name = ''
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
