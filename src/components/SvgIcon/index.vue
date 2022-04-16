<template>
  <svg
    class="svg-icon"
    :style="{
      width: props.size + 'px',
      height: props.size + 'px',
      color: props.color
    }"
  >
    <use :xlink:href="`#icon-${props.name}`" :fill="props.color" />
  </svg>
</template>

<script setup lang="ts">
const props = defineProps({
  name: {
    type: String,
    required: true,
    default: ''
  },
  size: {
    type: Number,
    default: 32
  },
  color: {
    type: String,
    default: 'inherit'
  }
})
// 加载全部svg
const req = require.context('@/assets/icons', false, /\.svg$/)
req.keys().map(req)
</script>
<style scoped>
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
</style>
