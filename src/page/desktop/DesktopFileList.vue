<template>
  <div class="file-list-root" @contextmenu.self="dekstopCcontextmenu">
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
import osApi from 'web-os-api'

function dekstopCcontextmenu(event: MouseEvent) {
  console.log("contextmenu", event.target)
  event.preventDefault();
  let menus = fileMenu.creatDirMenu("", {
    open: () => {
    },
    refresh: () => {
    },
    rename: () => {
    },
    delete: () => {
    },
    paste: () => {
    }
  }, true);
  osApi.showMenu(menus, event);
  // desktopEnv.showMenu(fileMenu.creatDirMenu("",true), event.x, event.y);
}

function fileContextmenu(event: MouseEvent) {
  event.preventDefault()
  let menus = fileMenu.creatDirMenu("", {
    open: () => {
    },
    refresh: () => {
    },
    rename: () => {
    },
    delete: () => {
    },
    paste: () => {
    }
  }, true);
  desktopEnv.showMenu(menus, event.x + 2, event.y + 2)
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