<script setup>
const props = defineProps({
  label: {
    type: Array,
    required: true,
  },
})
</script>

<template>
  <tspan v-for="(item,index) in props.label" x="0" :dy="10*index+8" y="0"  >{{ item }}</tspan>
</template>
