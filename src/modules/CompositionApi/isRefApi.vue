<template>
  <div class="mine">

  </div>
</template>

<script lang="ts">
import { defineComponent, isRef, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref('hello')
    const str = 'nihao'

    console.log('--------------isRef----------------')

    console.log(isRef(msg)) // true
    console.log(isRef(str)) // false
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
