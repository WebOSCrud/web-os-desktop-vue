<template>
  <div class="disk-root">
    <div class="div1">
      <img width="40" src="/disk-sm.png">
    </div>
    <div class="div2">
      {{ props.disk.path }}
    </div>
    <div class="div3">
      <Progress :showTxt="false" :colors="color"
                :progress="progress"></Progress>
    </div>
    <div class="div4">
      {{ utile.formatBytes(props.disk.freeSpace) }},
      {{ utile.formatBytes(props.disk.totalSpace) }},

    </div>
  </div>
</template>
<script setup lang="ts">

import Progress from "../../../components/Progress.vue";
import {DiskVo} from "../js/vos.ts";
import {ref} from "vue";
import utile from "../js/utile.ts";

let color = ref([{
  progress: 80,
  color: "#DA2626"
}])
let props = defineProps<{
  disk: DiskVo
}>()
let progress = ref(0)
progress.value = ((props.disk.totalSpace - props.disk.usableSpace) / props.disk.totalSpace) * 100;
</script>

<style scoped>
.disk-root {
  font-size: 12px;
  padding: 5px;
}

.disk-root:hover {
  background-color: rgba(70, 160, 252, 0.3);
}

.div2 {
  padding-bottom: 2px;
}

.div1 {
  display: flex;
  align-items: center;
  justify-content: center;
}

.disk-root {
  display: grid;
  grid-template-columns: 50px 160px repeat(3, 1fr);
  grid-template-rows: 17px 16px 17px repeat(2, 1fr);
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

.div1 {
  grid-area: 1 / 1 / 4 / 2;
}

.div2 {
  grid-area: 1 / 2 / 2 / 3;
}

.div3 {
  grid-area: 2 / 2 / 3 / 3;
}

.div4 {
  grid-area: 3 / 2 / 4 / 3;
}
</style>