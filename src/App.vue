<script setup>
import ButtonVue from './components/Button.vue';
import HeaderVue from './layout/Header.vue';
import Body from './layout/Body.vue';
import { ref } from 'vue';

const grid = ref([]);

const onUpdateGrid = (e) => {
 grid.value = e;
}

</script>

<template class="h-full w-full">
  <HeaderVue :grid="grid"></HeaderVue>
  <Body @updateGridValue="onUpdateGrid"></Body>
  
</template>

<style scoped>
</style>
