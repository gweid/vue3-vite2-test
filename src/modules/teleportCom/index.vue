<template>
  <div class="teleport-con">
    <button @click="handleDialog">dialog按钮</button>
    <dialogCom v-if="dialogShow" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import dialogCom from './dialogCom.vue'

export default defineComponent({
  components: {
    dialogCom
  },
  setup() {
    const dialogShow = ref<boolean>(false)
    const handleDialog = () => {
      dialogShow.value = !dialogShow.value
    }

    return {
      dialogShow,
      handleDialog
    }
  }
})
</script>

<style lang="scss" scoped>
.teleport-con {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>