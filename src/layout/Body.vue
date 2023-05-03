<script setup>
import { ref, onMounted } from "vue";
import AsideButton from "../components/AsideButton.vue";
import RowButton from "../components/RowButton.vue";
import HeaderButton from "../components/HeaderButton.vue";
import AsideSlider from "../components/AsideSlider.vue";
import WaveSurfer from "wavesurfer.js";
import { AVWaveform } from "vue-audio-visual";
import AsideWaveForm from "../components/AsideWaveForm.vue";

const colors = ["#6054AA", "#3FAE74", "#D85E49", "#4BBBCF"];

const emit = defineEmits(["updateGridValue"]);

// const nbButtons = ref(20);

const props = defineProps({
  audioSrc: String,
  audioDur: Number,
  bps: Number,
  npb: Number,
});

const graphWidth = ref(65500);

const gridValue = ref([[], [], [], []]);

const rowAssignee = (e, index) => {
  let row = colors.findIndex((el) => el == index);
  gridValue.value[row] = e;
  emit("updateGridValue", gridValue.value);
};
</script>

<template>
  <div class="flex flex-row w-full">
    <div class="">
      <AsideButton v-for="i in colors.length" :number="i" />
      <AsideWaveForm>Graphe du son</AsideWaveForm>
    </div>
    <div class="overflow-x-auto">
      <RowButton
        v-for="color in colors"
        :color="color"
        :key="index"
        :nbButtons="props.audioDur * props.npb * props.bps"
        @resultRow="rowAssignee($event, color)"
      />
      <AVWaveform
        preload="metadata"
        class="w-screen"
        :audio-controls="false"
        :src="props.audioSrc"
        v-if="props.audioSrc != null"
        :canv-width="graphWidth"
      />
      {{ graphWidth }}
    </div>
  </div>
  <div class="flex flex-row w-full">
    <div class=""></div>
    <div class="overflow-x-auto"></div>
  </div>
</template>

<style></style>
