<template>
  <div :class="buttonClass">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";

const props = withDefaults(defineProps<{
  type: 'confirm' | 'cancel'
}>(), {
  type: 'confirm',
})
let buttonClass=reactive({
    'button-root':true,
    'button-confirm':props.type==='confirm',
    'button-cancel':props.type==='cancel',
})
</script>
<style scoped>
.button-root {
  border: 1px solid transparent;
  font-weight: 500;
  padding: 6px 24px;
  border-radius: 4px;
  cursor: pointer;
}
.button-confirm{
  background: #0067c0;
  color: #fff;
}
.button-cancel{
  color: #000000;
  border: 1px solid black;
}
</style>