<template>
  <div>
    <h1>vue3 + vite2</h1>
    <router-link :to="{ path: '/' }">home</router-link> |
    <router-link :to="{ path: '/CompositionApi' }">CompositionApi</router-link> |
    <router-link :to="{ path: '/lifeHooks' }">lifeHooks</router-link>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'App',
});
</script>

<style lang="scss">
html {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
body {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
