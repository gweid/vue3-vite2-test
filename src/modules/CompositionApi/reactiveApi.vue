<template>
  <div class="mine">
    <testCom :userName="'jack'" />
    <div>
      <h3>--------------reactive---------------</h3>
      <p>名字: {{ userInfo.name }}</p>
      <p>年龄: {{ userInfo.age }}</p>
      <p>解构年龄: {{ age }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const userInfo = reactive({
      name: 'jack',
      age: 18
    })

    // reactive 只能将对象类型的数据转换为响应式，不能将类似 string、number 之类的类型转换为响应式
    // const book = reactive('20')

    let { age } = userInfo

    setTimeout(() => {
      age = 20
    }, 1000)

    return {
      userInfo,
      age
    }
  },
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
