<template>
  <div class="file-list-root" @contextmenu.self="contextmenu">
    <FileItem @contextmenu="fileContextmenu" class="file-item"></FileItem>
    <FileItem @contextmenu="fileContextmenu" class="file-item"></FileItem>
    <FileItem @contextmenu="fileContextmenu" class="file-item"></FileItem>
    <FileItem @contextmenu="fileContextmenu" class="file-item"></FileItem>
  </div>
</template>
<script setup lang="ts">
import FileItem from "./components/FileItem.vue";
import desktopEnv from "./desktopEnv.ts";
import fileMenu from "../../js/fileMenu.ts";

function contextmenu(event: MouseEvent) {
  console.log("contextmenu", event.target)
  event.preventDefault();
  desktopEnv.showMenu(fileMenu.creatDirMenu("",true), event.x, event.y);
}

function fileContextmenu(event:MouseEvent){
  event.preventDefault()
   let menus = fileMenu.creatFileMenu("");
   desktopEnv.showMenu(menus,event.x+2,event.y+2)
}
</script>
<style scoped>
.file-list-root {
  width: 100%;
  height: 100%;
  display: flex;
}

.file-item {
  margin: 2px;
}

.file-item:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: white;
}

</style>