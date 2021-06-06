<template>
  <div class="mine">
    <div>
      <h3>--------------ref---------------</h3>
      <p>{{ msg }}</p>
      <p>{{ obj.name }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const msg = ref('消息消息')
    const obj = ref({
      name: 'jack'
    })

    setTimeout(() => {
      msg.value = 'hello'
      obj.value.name = 'mark'
    }, 1000)

    return {
      msg,
      obj
    }
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
