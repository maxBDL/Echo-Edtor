<script setup>
import Button from '../components/Button.vue'

// const props = defineProps({
//     nbButtons
// });

const props = defineProps({
    color: {
        required: true,
    }
});
// const colors = ['purple', 'green', 'orange', 'blue'];

// const colors = {
//     purple: '#6054AA',
//     green: '#3FAE74',
//     orange: '#D85E49',
//     blue: '#4BBBCF'
// }

</script>

<template>
    <div class="bg-dark border border-light_green w-fit flex flex-row items-center">
        <Button v-for="i in 15" :color="props.color" />
    </div>
</template>

<style scoped>
div{
    height: 125px;
    max-height: 125px;
}
</style>