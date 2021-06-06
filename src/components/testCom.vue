<template>
  <div class="">
    测试 props 传值
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent ({
  name: 'testCom',
  props: {
    userName: {
      type: String,
      defaule: ''
    }
  },
  setup(props) {
    console.log('testCom 的 setup')
    console.log(props.userName)
  }
})

</script>

<style lang="" scoped>

</style>
