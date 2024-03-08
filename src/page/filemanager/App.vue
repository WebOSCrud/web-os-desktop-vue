<template>
  <div class="app-root">
      <div class="path-tool">
        <PathTool></PathTool>
      </div>
      <div class="file-tool">
        <FileTool></FileTool>
      </div>
      <div class="file-view">
        <main-view></main-view>
      </div>
  </div>
</template>
<script setup lang="ts">

import FileTool from "./view/FileTool.vue";
import PathTool from "./view/PathTool.vue";
import MainView from "./view/MainView.vue";
import  osApi from "web-os-api"

console.log("args",osApi.currentWindow().args());
</script>
<style scoped>
.app-root{
  width: 100vw;
  height: 100vh;
  background-color: #F8F8F8;
}
.path-tool{
  height: 40px;
}
.file-tool{
  height: 40px;
}
.file-view{
  height: calc(100% - 80px);
}
</style>
