<template>
  <div>
    <p>【getter函数】全名：{{ getFullName }}</p>
    <p>【对象】全名：{{ getFullName }}</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, reactive } from 'vue'

export default defineComponent({
  setup() {
    const people = reactive({
      first: '张',
      last: '三'
    })

    // ---------------- getter 函数
    const getFullName = computed(() => people.first + people.last)
    // getFullName.last = '' // getter 函数形式不能修改

    // get、set 函数对象
    const getName = computed({
      get() {
        return people.first + people.last
      },
      set(val: string) {
        people.last = val
      }
    })

    setTimeout(() => {
      getName.value = '五'
    }, 1000)
    
    return {
      getFullName,
      getName
    }
  }
})
</script>
