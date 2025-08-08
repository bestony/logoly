<template>
  <div class="color-picker-item">
    {{ label }}:
    <v-menu :close-on-content-click="false" location="end">
      <template v-slot:activator="{ props }">
        <button
          v-bind="props"
          class="w-12 h-6 rounded ml-1 border-2 border-solid border-white"
          :style="{ 'background-color': modelValue }"
        ></button>
      </template>
      <v-color-picker mode="hex" hide-inputs :model-value="modelValue" @update:model-value="$emit('update:modelValue', $event)"></v-color-picker>
    </v-menu>
  </div>
</template>

<script setup>
defineProps({
  label: {
    type: String,
    required: true
  },
  modelValue: {
    type: String,
    required: true
  }
});

defineEmits(['update:modelValue']);
</script>

<style scoped>
.color-picker-item {
  padding: 8px 0;
}
</style>