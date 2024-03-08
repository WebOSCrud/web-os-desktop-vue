<template>
  <div class="main-root">
    <div class="tree-div">
      <div>
        <Label class="item" icon="/thispc.png">此电脑</Label>
        <Label class="item item-disk" icon="/disk-sm.png">C:\</Label>
        <Label class="item item-disk" icon="/disk-sm.png">D:\</Label>
      </div>
    </div>
    <div class="main-div">
      <IconView></IconView>
    </div>
  </div>
</template>
<script setup lang="ts">

import Label from "../../../components/Label.vue";
import IconView from "./file-view/IconView.vue";
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

.item{
  padding-left: 5px;
}
.item-disk{
  padding-left: 20px;
}
.item:hover {
  background-color: #c2c2c7;
  border-radius: 5px;
}
</style>