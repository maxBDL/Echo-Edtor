<script setup>
import ButtonVue from './components/Button.vue';
import HeaderVue from './layout/Header.vue';
import Body from './layout/Body.vue';
const red = 'red';
</script>

<template class="h-full w-full">
  <HeaderVue></HeaderVue>

  <Body></Body>

  <!-- yo

  <div class="flex flex-row content-center overflow-auto">
    <ButtonVue v-for="i in 20" :key="i" :color="red" />
  </div> -->
  
</template>

<style scoped>
</style>
