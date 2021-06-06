<template>
  <div>
    <watchEffectApi />
    <watchApi />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import watchEffectApi from './watchEffectApi.vue'
import watchApi from './watchApi.vue'

export default defineComponent({
  components: {
    watchEffectApi,
    watchApi
  }
})
</script>
