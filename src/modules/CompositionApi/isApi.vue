<template>
  <div class="mine">

  </div>
</template>

<script lang="ts">
import { defineComponent, isReactive, isReadonly, isProxy ,reactive, readonly } from 'vue'

export default defineComponent({
  setup() {
    const obj = reactive({
      name: 'jack',
      age: 20
    })
    const readonlyObj = readonly(obj)

    console.log('--------------isProxy、isReactive、isReadonly----------------')

    console.log(isProxy(obj)) // true
    console.log(isProxy(readonlyObj)) // true
    console.log(isReadonly(readonlyObj)) // true
    console.log(isReactive(obj)) // true
    console.log(isReadonly(obj)) // false
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
