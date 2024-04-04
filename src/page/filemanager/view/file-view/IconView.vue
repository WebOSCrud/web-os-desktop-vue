<template>
  <div class="icon-view-root">
    <template v-for="(item,index) in files">
      <FileItem @contextmenu="openMenu(item,$event)" @dblclick="openFile(item)" @click="selectFile(item,index)"
                :class="{'file-item':true,'file-item-select':item.select}"
                :file-type="item" v-if="!item.delete"></FileItem>
    </template>
  </div>
</template>
<script setup lang="ts">
import {onMounted, onUnmounted, ref} from "vue";
import {FileVoType} from "../../../../js/type/type.ts";
import FileItem from "../../../desktop/components/FileItem.vue";
import nav, {PathNav} from "../../js/nav.ts";
import axiosUtil from "../../../../js/utile/axiosUtil.ts";
import {FileVo, ResponseBody} from "../../../../js/vo/vos.ts";
import voToType from "../../../../js/type/voToType.ts";
import footer from "../../js/footer.ts";
import fileSelector from "../../js/fileSelector.ts";
import osApi from "web-os-api"
import fileMenu from "../../../../js/fileMenu.ts";

let files = ref<FileVoType[]>([]);

function pathNavChange(pathNav: PathNav) {
  if (pathNav.path == "") {
    return;
  }
  files.value = [];
  axiosUtil.post<FileVo[]>("/files/list", {
    path: pathNav.path
  }).then((res: ResponseBody<FileVo[]>) => {
    let fileVoTypes = voToType.fileVoToType(res.data);
    files.value = fileVoTypes;
    footer.label.value = res.data.length + "个项目"
  })
}

function openMenu(file: FileVoType, e: MouseEvent) {
  let contextMenu = fileMenu.creatFileMenu(file);
  if (file.file.dir) {
    for (let i = 0; i < contextMenu.menus.length; i++) {
      if (contextMenu.menus[i].label === "打开") {
        contextMenu.menus[i].click = () => {
          nav.pushPathNav({name: file.file.name, path: file.file.path})
        }
        break
      }
    }
  }
  osApi.showMenu(contextMenu, e);
}

function openFile(file: FileVoType) {
  if (file.file.dir) {
    nav.pushPathNav({name: file.file.name, path: file.file.path})
  }
}

function selectFile(file: FileVoType, index: number) {
  fileSelector.setSelectFile([file]);
  console.log(index);
}

onMounted(() => {
  pathNavChange(nav.pathNavRef.value[nav.pathNavRef.value.length - 1])
  nav.addEventListener(pathNavChange);
})
onUnmounted(() => {
  nav.removeEventListener(pathNavChange);
})

</script>
<style scoped>
.icon-view-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}

.file-item {
  margin: 3px;
}

.icon-view-root >>> .file-name {
  color: black;
}

.file-item-select {
  background-color: rgba(70, 160, 252, 0.3);
}

.file-item:hover {
  background-color: rgba(70, 160, 252, 0.3);
}
</style>