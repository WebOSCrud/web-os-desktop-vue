<template>
  <div class="progress-root">
    <div class="progress-div">
      <div class="progress" :style="style"></div>
    </div>
    <div class="progress-txt">{{progress > 100 ? 100:progress}}%</div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

let props = defineProps<{ progress: number }>()

let style = computed(() => {
  return {
    width: props.progress + "%"
  }
})
</script>
<style scoped>
.progress-root {
  width: 100%;
  height: 20px;
  display: flex;
  overflow: hidden;
}
.progress-div{
  flex: 1;
  border: 1px solid black;
}
.progress-txt{
}
.progress{
  background-color: #46a0fc;
  height: 100%;
  max-width: 100%;
  transition: width 0.5s ease;
}
</style>