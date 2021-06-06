<template>
  <div class="life-hooks">

  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeMount, onMounted } from 'vue'

export default defineComponent({
  setup() {
    console.log('-----------------lifeHooks--------------');

    onBeforeMount(() => {
      console.log('beforeMount')
    })
    onMounted(() => {
      console.log('mount')
    })
  }
})
</script>
