<template>
  <div class="file-tool-div">
    <div :class="toolStyle.new.class" :style="toolStyle.new.style">
      <img src="/filemanager/file/svg/new.svg">
      <div class="txt">新建</div>
    </div>
    <div class="tool-button-spl-div">
      <div class="tool-button-spl"></div>
    </div>
    <div title="剪切" :class="toolStyle.cutCopyDelete.class" :style="toolStyle.cutCopyDelete.style">
      <img src="/filemanager/file/svg/cut.svg">
    </div>
    <div title="粘贴" :class="toolStyle.pasteAndSort.class" :style="toolStyle.pasteAndSort.style">
      <img src="/filemanager/file/svg/paste.svg">
    </div>
    <div title="复制" :class="toolStyle.cutCopyDelete.class" :style="toolStyle.cutCopyDelete.style">
      <img src="/filemanager/file/svg/copy.svg">
    </div>
    <div @click="renameFile" title="重命名" :class="toolStyle.rename.class" :style="toolStyle.rename.style">
      <img src="/filemanager/file/svg/rename.svg">
    </div>
    <div title="删除" :class="toolStyle.cutCopyDelete.class" :style="toolStyle.cutCopyDelete.style">
      <img src="/filemanager/file/svg/delete.svg">
    </div>
    <div class="tool-button-spl-div">
      <div class="tool-button-spl"></div>
    </div>
    <div :class="toolStyle.pasteAndSort.class" :style="toolStyle.pasteAndSort.style" class="tool-button button-text">
      <img src="/filemanager/file/svg/sort.svg"></img>
      <div class="txt">排序</div>
    </div>
  </div>
</template>
<script setup lang="ts">


import {computed, ref} from "vue";
import nav from "../nav.ts";
import fileSelector from "../fileSelector.ts";
import osApi, {ClipboardType, FileClipboard} from "web-os-api"

let clipboardDataRef = ref<{ filePath: string } | null>();
let clipboardTypeRef = ref<ClipboardType | null>();

osApi.fileClipboard().addChangeListener((cb: FileClipboard) => {
  clipboardDataRef.value = cb.data;
  clipboardTypeRef.value = cb.type;
})
let opacity = 0.3;
let toolStyle = computed(() => {
  return {
    new: {
      style: {
        opacity: nav.pathNavRef.value.length > 0 ? 1 : opacity,
      },
      class: {
        'tool-button': true,
        'button-text': true,
        'tool-button-hover': nav.pathNavRef.value.length > opacity
      }
    },
    cutCopyDelete: {
      style: {
        opacity: fileSelector.selectFileRef.value.length > 0 ? 1 : opacity,
      },
      class: {
        'tool-button': true,
        'tool-button-hover': fileSelector.selectFileRef.value.length > 0
      }
    },
    pasteAndSort: {
      style: {
        opacity: nav.pathNavRef.value.length > 0 && clipboardTypeRef.value != null ? 1 : opacity,
      },
      class: {
        'tool-button': true,
        'tool-button-hover': nav.pathNavRef.value.length > 0 && clipboardTypeRef.value != null
      }
    },
    rename: {
      style: {
        opacity: fileSelector.selectFileRef.value.length == 1 ? 1 : opacity,
      },
      class: {
        'tool-button': true,
        'tool-button-hover': fileSelector.selectFileRef.value.length == 1
      }
    },

  }
})

function renameFile() {
  if (toolStyle.value.rename.style.opacity != 1) {
    return
  }
  let lastFile = fileSelector.getLastFile();
  lastFile.rename = true;
}

</script>
<style scoped>
.file-tool-div {
  width: 100%;
  height: calc(100% - 10px);
  display: flex;
  user-select: none;
  padding-top: 5px;
  padding-bottom: 5px;
}

.tool-button {
  width: 40px;
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
  margin-left: 5px;
  margin-right: 5px;
}

.tool-button img {
  width: 25px;
  height: 25px;
}

.tool-button-spl-div {
  display: flex;
  align-items: center;
  border-radius: 5px;
  justify-content: center;
}

.tool-button-spl {
  width: 2px;
  height: 80%;
  background-color: black;
}

.tool-button-hover:hover {
  background-color: #e3e0e0;
}

.button-text {
  width: 70px;
  font-size: 14px;
}

.button-text .txt {
  margin-left: 7px;
}
</style>