<template>
  <div class="mine">
    
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  setup() {
    console.log('setup')
  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
