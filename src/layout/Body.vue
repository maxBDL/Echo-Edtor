<script setup>
import { ref, onMounted } from 'vue';
import AsideButton from '../components/AsideButton.vue';
import RowButton from '../components/RowButton.vue';
import AsideSlider from '../components/AsideSlider.vue';
import WaveSurfer from 'wavesurfer.js';


const colors = [
'#6054AA',
    '#3FAE74',
    '#D85E49',
    '#4BBBCF'
];

const emit = defineEmits(['updateGridValue']);

const nbButtons = ref(20);
    

const gridValue = ref([
    [], [], [], []
]);

const rowAssignee = (e, index) => {
    let row = colors.findIndex((el) => el == index);
    gridValue.value[row] = e;
    emit('updateGridValue', gridValue.value);
}
onMounted(() => {
    const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: 'violet',
    progressColor: 'purple'
});
})


</script>

<template>
    <div class="flex flex-row w-full">
        <div class="">
            <AsideButton v-for="i in colors.length" :number="i" />
        </div>
        <!-- {{ gridValue }} -->
        <div class="overflow-x-auto">
            <RowButton v-for="color in colors" :color="color" :key="index" :nbButtons="nbButtons" @resultRow="rowAssignee($event, color)"/>
        </div>
        <div id="waveform"></div>
    </div>

</template>

<style>

</style>