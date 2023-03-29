<script setup>
import {ref} from 'vue';

const props = defineProps({
    number : String
});


</script>

<template>
    <div class="bg-light_dark borde-2 border-t-0 border-l-0 border-light_green">
        <p class="text-light_green">Slider # {{props.number}}</p>
    </div>
</template>

<style scoped>
div{
    width: 300px;
    height: 125px;
    max-width: 300px;
    max-height: 125px;
}
</style>