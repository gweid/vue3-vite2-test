<template>
  <div class="mine">
    <div>
      <h3>--------------toRefs---------------</h3>
      <p>{{ name }}</p>
      <p>{{ age }}</p>
      <p>{{ msgRef }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRef, toRefs } from 'vue'

export default defineComponent({
  setup() {
    const obj = reactive({
      name: 'jack',
      age: 20
    })

    // let { name } = toRefs(obj)

    // setTimeout(() => {
    //   // 使用了 toRefs 需要通过 .value 的方式访问
    //   name.value = 'mark'
    // }, 1000)

    const info = reactive({ msg: 'hello' })
    const msgRef = toRef(info, 'msg')
    setTimeout(() => {
      msgRef.value = 'say hi'
    }, 1000)

    return {
      ...toRefs(obj),
      msgRef
    }
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
