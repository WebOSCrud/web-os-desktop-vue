<template>
  <div class="file-root" ref="fileRoot">
    <div class="file-img">
      <img draggable="false" width="45" :src="api.file.scrUrl.fileIcon(file.path)">
    </div>
    <div class="file-name" v-if="!edit" @click="editFileName">
      {{props.file.name}}123132132asdasd
    </div>
    <textarea  v-else v-model="fileNameTextareaValue"  @focusout="overInput" @keydown.enter="overInput" @input="input" ref="textarea" class="textarea">

    </textarea>
  </div>
</template>
<script setup lang="ts">
import {nextTick, ref} from "vue";
import {FileVo} from "../../../js/vo/vos.ts";
import {api} from "web-os-api"
let textarea = ref();
let fileRoot = ref();
let edit = ref(false)
let props=defineProps<{file:FileVo}>()
let fileNameTextareaValue=ref(props.file.name);

function autoTextareaSize() {
  textarea.value.style.height = "auto";
  textarea.value.style.width = fileRoot.value.offsetWidth - 11 + 'px';
  textarea.value.style.height = textarea.value.scrollHeight + "px";

}

function input() {
  autoTextareaSize();
}
function overInput(){
  edit.value=false;
  console.log(fileNameTextareaValue.value)
  props.file.name=fileNameTextareaValue.value;
}
function editFileName() {
  edit.value = true;
  nextTick(() => {
    autoTextareaSize();
    textarea.value.focus();
  })
}
</script>
<style scoped>
.file-root {
  width: 74px;
  height: 93px;
  user-select: none;
}

.file-img {
  display: grid;
  place-items: center;
}

.file-name {
  text-align: center;
  color: #fafafa;
  margin-top: 4px;
  height: 45px;
  word-break: break-all;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.textarea {
  width: 100%;
  position: absolute;
  resize: none;
  outline: none;
  border: 1px solid black;
  font-size: 15px;
  background-color: white;
  overflow-y: hidden;
  text-align: center;
  padding: 5px 5px 0px;
}
</style>