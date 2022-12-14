<script setup>
import { ref } from 'vue';

const props = defineProps({
    color : {
        required : false,
    }
});

const active = ref(false);


</script>

<template>
    {{props.color}}
    {{active}}
    <div @click="active = !active" style="background-color: red; width: 100px; height: 100px;">
        
    </div>
</template>

<style scoped>

</style>