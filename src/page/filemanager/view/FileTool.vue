<template>
  <div class="file-tool-div">
    <div class="tool-button button-text">
      <new></new>
      <div class="txt">新建</div>
    </div>
    <div class="tool-button-spl-div">
      <div class="tool-button-spl"></div>
    </div>
    <div class="tool-button">
      <cut></cut>
    </div>
    <div class="tool-button">
      <paste></paste>
    </div>
    <div class="tool-button">
      <copy></copy>
    </div>
    <div class="tool-button">
      <rename></rename>
    </div>
    <div class="tool-button">
      <delete></delete>
    </div>
    <div class="tool-button-spl-div">
      <div class="tool-button-spl"></div>
    </div>
    <div class="tool-button button-text">
      <sort></sort>
      <div class="txt">排序</div>
    </div>
  </div>
</template>
<script setup lang="ts">

import Cut from "./fille-tool/svg/Cut.vue";
import Paste from "./fille-tool/svg/Paste.vue";
import Copy from "./fille-tool/svg/Copy.vue";
import New from "./fille-tool/svg/New.vue";
import Rename from "./fille-tool/svg/Rename.vue";
import Delete from "./fille-tool/svg/Delete.vue";
import Sort from "./fille-tool/svg/Sort.vue";

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

.tool-button:hover {
  background-color: #e3e0e0;
}

.button-text {
  width: 70px;
  font-size: 14px;
}
.button-text .txt{
  margin-left: 7px;
}
</style>