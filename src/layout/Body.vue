<script setup>
import AsideButton from '../components/AsideButton.vue';
import RowButton from '../components/RowButton.vue';

const colors = {
    purple: '#6054AA',
    green: '#3FAE74',
    orange: '#D85E49',
    blue: '#4BBBCF'
}
</script>

<template>
    <div class="flex flex-row w-full">
        <div class="">
            <AsideButton :number="1" />
            <AsideButton :number="2" />
            <AsideButton :number="3" />
            <AsideButton :number="4" />
        </div>
        <div class="overflow-x-auto">
            <RowButton :color="colors.purple"/>
            <RowButton :color="colors.green"/>
            <RowButton :color="colors.orange"/>
            <RowButton :color="colors.blue"/>
        </div>
    </div>


</template>

<style>

</style>