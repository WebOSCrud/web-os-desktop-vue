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
    <div class="footer">
      {{ footer.label.value }}
    </div>
  </div>
</template>
<script setup lang="ts">

import FileTool from "./view/FileTool.vue";
import PathTool from "./view/PathTool.vue";
import MainView from "./view/MainView.vue";
import osApi, {api} from "web-os-api"
import footer from "./js/footer.ts";
import nav, {PathNav} from "./js/nav.ts";
import wapId from "../../js/wapId.ts";


nav.addEventListener((pathNav: PathNav) => {
  if (pathNav.path == "") {
    osApi.currentWindow().title = "此电脑"
    osApi.currentWindow().icon = "/" + wapId + "/thispc.png"
  } else {
    osApi.currentWindow().title = pathNav.name
    osApi.currentWindow().icon = api.file.scrUrl.fileIcon(pathNav.path)
  }
})
</script>
<style scoped>
.app-root {
  width: 100vw;
  height: 100vh;
  background-color: #F8F8F8;
}

.path-tool {
  height: 40px;
}

.file-tool {
  height: 40px;
}

.file-view {
  height: calc(100% - 96px);
}

.footer {
  font-size: 12px;
  padding-left: 10px;
}
</style>
