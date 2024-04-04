<template>
  <div class="main-root">
    <div class="tree-div">
      <div>
        <Label class="item" icon="/thispc.png" @click="nav.setPathNav([])">此电脑</Label>
        <Label v-for="disk in diskVos" @click="openDisk(disk)" class="item item-disk" icon="/disk-sm.png">{{ disk.path }}</Label>
      </div>
    </div>
    <div class="main-div">
      <DiskView v-if="pathNavRef.length==0"></DiskView>
      <IconView v-else></IconView>
    </div>
  </div>
</template>
<script setup lang="ts">

import Label from "../../../components/Label.vue";
import DiskView from "./DiskView.vue";
import axiosUtil from "../../../js/utile/axiosUtil.ts";
import {ResponseBody} from "../../../js/vo/vos.ts";
import {DiskVo} from "../js/vos.ts";
import {ref} from "vue";
import IconView from "./file-view/IconView.vue";
import nav, {} from "../js/nav.ts";
import footer from "../js/footer.ts";
import osApi from "web-os-api"
import wapId from "../../../js/wapId.ts";
let pathNavRef = nav.pathNavRef;

let diskVos = ref<DiskVo[]>([]);

axiosUtil.post<DiskVo[]>("/disk/list").then((res: ResponseBody<DiskVo[]>) => {
  let data = res.data;
  diskVos.value = data;
  footer.label.value=data.length+"个项目"
})

osApi.currentWindow().title="此电脑"
osApi.currentWindow().icon="/"+wapId+"/thispc.png"

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
.main-root {
  width: 100%;
  height: 100%;
  display: flex;
  user-select: none;
}

.tree-div {
  padding-left: 5px;
  width: 145px;
}

.main-div {
  flex: 1;
}

.item {
  padding-left: 5px;
}

.item-disk {
  padding-left: 20px;
}

.item:hover {
  background-color: #c2c2c7;
  border-radius: 5px;
}
</style>