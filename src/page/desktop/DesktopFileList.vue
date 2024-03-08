<template>
  <div class="file-list-root" @contextmenu.self="desktopContextmenu">
    <FileItem v-for="fileType in files" :key="fileType.file.path"
              @contextmenu="fileContextmenu(fileType,$event)"
              @dblclick="openFile(fileType)"
              class="file-item"
              :fileType="fileType"
    >
    </FileItem>
  </div>
</template>
<script setup lang="ts">
import FileItem from "./components/FileItem.vue";
import desktopEnv from "./desktopEnv.ts";
import fileMenu from "../../js/fileMenu.ts";
import osApi from 'web-os-api'
import axiosUtil from "../../js/utile/axiosUtil.ts";
import {FileVo, ResponseBody} from "../../js/vo/vos.ts";
import {ref} from "vue";
import {FileVoType} from "../../js/type/type.ts";
import VoToType from "../../js/type/voToType.ts";

let files = ref<FileVoType[]>([]);
let desktopFileVo: FileVo;
axiosUtil.get<FileVo>("/desktop/path").then((res: ResponseBody<FileVo>) => {
  desktopFileVo = res.data;
})

function desktopContextmenu(event: MouseEvent) {
  console.log("contextmenu", event.target)
  event.preventDefault();
  let menus = fileMenu.creatDirMenu({file: desktopFileVo, delete: false, rename: false}, {
    open: () => {
    },
    refresh: refreshDesktopFiles,
    paste: () => {
    },
    upload(fileVoType) {
      console.log(fileVoType)
      files.value.push(fileVoType);
    },
    newFile(fileVoType:FileVoType){
      files.value.push(fileVoType);
    }
  }, true);
  osApi.showMenu(menus, event);
}

function fileContextmenu(fileType: FileVoType, event: MouseEvent) {
  event.preventDefault()
  let menus = fileMenu.creatFileMenu(fileType);
  desktopEnv.showMenu(menus, event.x + 2, event.y + 2)
}

function refreshDesktopFiles() {
  files.value = []
  axiosUtil.get<FileVo[]>("/desktop/files").then((res: ResponseBody<FileVo[]>) => {
    console.log(res)
    let fileVoTypes = VoToType.fileVoToType(res.data);
    files.value = fileVoTypes;
  })
}

function openFile(file: FileVoType) {
  osApi.openFile(file.file.path);
}

refreshDesktopFiles();
</script>
<style scoped>
.file-list-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap:  wrap;
  align-content: flex-start;
}

.file-item {
  margin: 2px;
}

.file-item:hover {
  background-color: rgba(255, 255, 255, 0.3);
  border-color: white;
}

</style>