

<template>
  <div class="icon-view-root">
    <FileItem class="file-item" :file-type="item" v-for="item in files"></FileItem>
  </div>
</template>
<script setup lang="ts">
 import {ref} from "vue";
 import {FileVoType} from "../../../../js/type/type.ts";
 import FileItem from "../../../desktop/components/FileItem.vue";

 let files=ref<FileVoType[]>([]);

 for (let i = 0; i < 100; i++) {
   files.value.push({
     file:{
       name:"file",
       path:"D:\\web-os2\\web-os-desktop\\gradle",
       prentPath:"",
       dir:false,
       size:12,
       lastModifiedTime:12
     },
     delete:false,
     rename:false
   })
 }
</script>
<style scoped>
.icon-view-root{
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}
.file-item{
  margin: 3px;
}
.icon-view-root >>> .file-name{
  color: black;
}
.file-item:hover{
  background-color: rgba(70, 160, 252, 0.3);
}
</style>