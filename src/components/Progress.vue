<template>
  <div class="progress-root">
    <div class="progress-div">
      <div class="progress" :style="style"></div>
    </div>
    <div v-if="showTxt" class="progress-txt">{{ progress > 100 ? 100 : progress }}%</div>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

interface Colors {
  color: string,
  progress: number
}

let props = withDefaults(defineProps<{
  progress: number,
  showTxt: boolean,
  colors: Colors[]

}>(), {
  showTxt: true,
  colors:[{
    color: "#46a0fc",
    progress: 0
  }]
})
let style = computed(() => {
  return {
    width: props.progress + "%",
    backgroundColor: getColor(props.progress)
  }
})

function getColor(progress: number): string {
  let color = "#46a0fc";
  for (let i = 0; i < props.colors.length; i++) {
    let c = props.colors[i];
    if (c.progress <= progress) {
      color = c.color;
    }
  }
  return color;
}
</script>
<style scoped>
.progress-root {
  width: 100%;
  height: 100%;
  display: flex;
  overflow: hidden;
}

.progress-div {
  flex: 1;
  border: 1px solid black;
}

.progress-txt {
}

.progress {
  height: 100%;
  max-width: 100%;
  transition: width 0.5s ease;
}
</style>