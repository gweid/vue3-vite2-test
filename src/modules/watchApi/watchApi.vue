<template>
  <div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
  setup() {
    // --------------------------- 单个数据源
    // const msg = ref('信息')
    // watch(msg, (msg, prevMsg) => {
    //   console.log(prevMsg)
    //   console.log(msg)
    // })
    // setTimeout(() => {
    //   msg.value = '短信'
    // }, 1000)

    // const info = reactive({ name: 'jack' })
    // // watch(info, (info, prevInfo) => {
    // //   console.log(prevInfo.name)
    // //   console.log(info.name)
    // // })
    // watch(() => info.name, (name, prevName) => {
    //   console.log(prevName)
    //   console.log(name)
    // })
    // setTimeout(() => {
    //   info.name = 'mark'
    // }, 1000)


    // -------------------- 多个数据源
    // const msg = ref('msg-msg')
    // const str = ref('str-str')

    // watch([msg, str], ([msg, str], [prevMsg, prevStr]) => {
    //   console.log('多个数据源')
        
    //   console.log(prevMsg, msg)
    //   console.log(prevStr, str)
    // })

    // setTimeout(() => {
    //   msg.value = 'message'
    //   str.value = 'string'
    // }, 1000)


    //--------------------- deep 深度监听
    const state = reactive({
      code: 200,
      data: {
        name: 'jack'
      }
    })

    watch(() => state.data, (age, prevAge) => {
      console.log(prevAge, age)
    }, { deep: true })

    setTimeout(() => {
      state.data.name = 'mark'
    }, 1000)
  }
})
</script>
