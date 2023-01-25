<script setup>
import { ref } from 'vue';

const props = defineProps({
    color: {
        required: false,
    }
});

const active = ref(false);


</script>

<template>
    <div @click="active = !active" style="width: 100px; height: 100px;" class="flex flex-row items-center">
        <div v-if="active" class="rounded-md m-0" :style="{'background-color': color}" style=" width: 75px; height: 75px;">

        </div>
    </div>
</template>

<style scoped>
.purple {
    background-color: #6054AA;
}

.green {
    background-color: #3FAE74;
}

.orange {
    background-color: #D85E49;
}

.blue {
    background-color: #4BBBCF;
}
</style>