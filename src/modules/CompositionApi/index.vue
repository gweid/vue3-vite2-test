<template>
  <div class="mine">
    <h1>--------------CompositionApi------------------</h1>
    <br/>
    <setupApi />
    <reactiveApi />
    <refApi />
    <toRefsApi />
    <isApi />
    <isRefApi />
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import testCom from '../../components/testCom.vue'
import setupApi from './setupApi.vue'
import reactiveApi from './reactiveApi.vue'
import refApi from './refApi.vue'
import toRefsApi from './toRefsApi.vue'
import isApi from './isApi.vue'
import isRefApi from './isRefApi.vue'

export default defineComponent({
  components: {
    testCom,
    setupApi,
    reactiveApi,
    refApi,
    toRefsApi,
    isApi,
    isRefApi
  },
  setup(props) {

  }
})
</script>

<style scoped lang="scss">
.mine {
  background-color: sky-blue;
}
</style>
