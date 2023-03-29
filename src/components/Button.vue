<script setup>
import { ref } from 'vue';

const props = defineProps({
    color: {
        required: false,
    },
    id: {
        required: true
    }
});

const active = ref(false);

const emit= defineEmits(["updatedValue"])
 
  function updateValue() {
        console.log("trying");
      active.value = !active.value
      emit("updatedValue", {
        id: props.id,
        active: active.value
      });
    }

</script>

<template>
    <div @click="updateValue" style="width: 75px; height: 75px;" class="flex flex-row items-center">
        <div v-if="active" class="rounded-md m-0" :style="{'background-color': color}" style=" width: 50px; height: 50px;">
{{ props.id }}
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