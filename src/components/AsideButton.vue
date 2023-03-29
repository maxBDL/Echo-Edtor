<script setup>
import {ref} from 'vue';

const props = defineProps({
    number : Number
});


</script>

<template>
    <div class="bg-light_dark border-light_green border">
        <p class="text-light_green">Ligne # {{props.number}}</p>
    </div>
</template>

<style scoped>
div{
    width: 300px;
    height: 75px;
    max-width: 300px;
    max-height: 75px;
}
</style>