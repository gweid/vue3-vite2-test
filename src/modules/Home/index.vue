<template>
  <div class="home">
    <h1>这是首页</h1>
    <el-button type="success">成功按钮</el-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'vuex'

// 包裹在 defineComponent 中只是为了 ts 类型提示
export default defineComponent({
  name: 'Home',
  setup() {
    const store = useStore()
    // console.log(store.state)
  },
});
</script>

<style scoped lang="scss">
.home {

}
</style>
