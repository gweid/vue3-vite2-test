<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  setup() {
    // const msg = ref('hello')

    // // watchEffect(() => {
    // //   console.log(msg.value)
    // // })

    // const stop = watchEffect(() => {
    //   console.log(msg.value)
    // })

    // // stop() // 显式停止监听

    // setTimeout(() => {
    //   msg.value = 'hi'
    // }, 1000)


    // ----------------------- 清除副作用
    const id = ref<string>('001')
    const data = ref<any>(null)

    function getData(id: string) {
      if (id === '001') {
        return new Promise((resolve) => {
          resolve(668998)
        })
      } else {
        return new Promise((resolve) => {
          resolve(-1)
        })
      }
    }

    setTimeout(() => {
      id.value = '005'
    }, 1000)

    watchEffect(async (onInvalidate) => {
      data.value = await getData(id.value)
      console.log(data.value)

      onInvalidate(() => {
        console.log('onInvalidate')
      })
    })
  }
})
</script>
