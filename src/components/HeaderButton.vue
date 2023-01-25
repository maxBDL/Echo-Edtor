<script setup>

</script>

<template>
    <button class="border-2 border-light_green bg-light_dark rounded-xl flex content-center justify-center flex-wrap m-1">
        <slot />
    </button>
</template>

<style scoped>
button{
    width: 50px;
    height: 50px;
}
</style>