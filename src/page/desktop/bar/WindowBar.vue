<template>
  <div class="window-bar-root">
    <template v-for="win in windows" :key="win.wapWindow.id()">
      <div class="window" @click="focusWindow(win)"
           v-if="win.wapWindow.windowType() == 'normal'">
        <img height="24" :src="win.wapWindow.icon">
        <div class="focus" v-show="win.extState.focus"></div>
      </div>
    </template>
  </div>
</template>
<script setup lang="ts">


import windowManger, {VueWapWindowState} from "../window/windowManger.ts";

let windows = windowManger.windows;

function focusWindow(win: VueWapWindowState) {
  windowManger.focusWindow(win.wapWindow.id());

}

</script>
<style scoped>
.window-bar-root {
  display: flex;
}

.window {
  margin-left: 5px;
  width: 35px;
  text-align: center;
}

.window:hover {
  background-color: white;
}

.focus {
  width: 100%;
  height: 2px;
  background-color: #00a7ff;
}
</style>