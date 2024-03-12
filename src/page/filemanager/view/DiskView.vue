<template>
  <div class="disk-view-root">
    <Disk @dblclick="openDisk(disk)" :disk="disk" v-for="disk in diskVos"></Disk>
  </div>
</template>
<script setup lang="ts">
import Disk from "../components/Disk.vue";
import {ref} from "vue";
import {DiskVo} from "../js/vos.ts";
import axiosUtil from "../../../js/utile/axiosUtil.ts";
import {ResponseBody} from "../../../js/vo/vos.ts";
import nav from "../js/nav.ts";
import footer from "../js/footer.ts";
import osApi from "../../../../../web-os-js-api/src";
import wapId from "../../../js/wapId.ts";
let diskVos = ref<DiskVo[]>([]);

axiosUtil.post<DiskVo[]>("/disk/list").then(( res: ResponseBody<DiskVo[]>) => {
  let data = res.data;
  diskVos.value = data;
  footer.label.value=data.length+"个项目"
})

function openDisk(disk:DiskVo){
  nav.setPathNav([{
    name:disk.name,
    path:disk.path
  }])
  osApi.currentWindow().title=disk.name
  osApi.currentWindow().icon="/"+wapId+"/disk-sm.png"
}


</script>
<style scoped>
.disk-view-root {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  align-content: flex-start;
  overflow: auto;
}
</style>