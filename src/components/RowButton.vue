<script setup>
import Button from '../components/Button.vue';
import { ref } from 'vue';

const props = defineProps({
    color: {
        required: true,
    },
    nbButtons: {
        required: true,
    }
});

const resultRow = ref([]);

const init = () => {
    for(let i = 0; i < props.nbButtons; i++ ) {
        resultRow.value.push(0);
    }
}
const emit = defineEmits(['resultRow']);

const onUpdateResult = ({id, active}) => {
    resultRow.value[id] = active ? 1 : 0; ;
    emit('resultRow', resultRow.value)
}



init();
</script>

<template>
    <div class="bg-dark border border-light_green w-fit flex flex-row items-center">
        <Button v-for="i in props.nbButtons" :color="props.color" :id="i - 1" @updatedValue="onUpdateResult"/>
    </div>
</template>

<style scoped>
div {
    height: 75px;
    max-height: 75px;
}
</style>