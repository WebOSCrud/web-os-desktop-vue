<template>
    <div class="file-root" ref="fileRoot">
      <template v-if="!fileType.delete">
        <div class="file-img">
          <div v-if="fileType.delete" style="width: 45px;height: 45px"></div>
          <img v-else draggable="false" width="45" height="45" :src="api.file.scrUrl.fileIcon(fileType.file.path)">
        </div>
        <div class="file-name" v-if="!fileType.rename">
          {{ props.fileType.file.name }}
        </div>
        <textarea v-else v-model="fileNameTextareaValue" @focusout="overInput" @keydown.enter="overInput" @input="input"
                  ref="textarea" class="textarea">
        </textarea>
      </template>
    </div>
</template>
<script setup lang="ts">
import {nextTick, ref, watch} from "vue";
import {api} from "web-os-api"
import {FileVoType} from "../../../js/type/type.ts";
import axiosUtil from "../../../js/utile/axiosUtil.ts";
import {FileVo, ResponseBody} from "../../../js/vo/vos.ts";

let textarea = ref();
let fileRoot = ref();
let props = defineProps<{ fileType: FileVoType }>()

let fileNameTextareaValue = ref(props.fileType.file.name);

watch(() => {
  return props.fileType.rename
}, (newValue) => {
  if (newValue === true) {
    editFileName();
  }
})

function autoTextareaSize() {
  textarea.value.style.height = "auto";
  textarea.value.style.width = fileRoot.value.offsetWidth - 11 + 'px';
  textarea.value.style.height = textarea.value.scrollHeight + "px";

}

function input() {
  autoTextareaSize();
}

function overInput() {
  props.fileType.rename = false;
  console.log(fileNameTextareaValue.value)
  let oldName = props.fileType.file.name;
  if (oldName === fileNameTextareaValue.value) {
    return
  }
  props.fileType.file.name = fileNameTextareaValue.value;
  axiosUtil.post<FileVo>("/files/rename", {
    newName: fileNameTextareaValue.value,
    oldPath: props.fileType.file.path,
  }).then((res: ResponseBody<FileVo>) => {
    props.fileType.file.name = res.data.name;
    props.fileType.file.path = res.data.path;
  }).catch(() => {
    props.fileType.file.name = oldName;
  })
}

function editFileName() {
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
  padding-top: 3px;
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
  position: relative;
  left: 0;
  top:0;
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