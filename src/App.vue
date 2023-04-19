<script setup>
import ButtonVue from './components/Button.vue';
import HeaderVue from './layout/Header.vue';
import Body from './layout/Body.vue';
import { ref } from 'vue';

const grid = ref([]);
const audioSrc = ref(null);
const audioDur = ref(null);
const bps = ref(null);
const npb = ref(null);

const onUpdateGrid = (e) => {
 grid.value = e;
}

const audioCreated = (e) => {
  audioSrc.value = e;
}

const audioDuration = (e) => {
  audioDur.value = e.duration;
  bps.value = e.bps;
  npb.value = e.npb;
}

</script>

<template class="h-full w-full">
  <HeaderVue :grid="grid" @audioCreated="audioCreated" @audioDuration="audioDuration"></HeaderVue>
  <Body @updateGridValue="onUpdateGrid" class=" bg-dark"
        :audioDur="audioDur"
        :audioSrc="audioSrc" 
        :bps="bps"
        :npb="npb" 
  />
  
</template>

<style>
/* html{
  background-color: rgb(31, 38, 38);
} */
</style>
