<template>
  <div class="background">
    <Menu></Menu>
    <MessageBox ></MessageBox>
    <div class="desktop-div">
      <DesktopFileList></DesktopFileList>
      <Window v-for="win in windows" v-bind:key="win.wapWindow.id()" :window="win.wapWindow"></Window>
    </div>
    <div class="status-bar">
      <WindowFillBar class="window-fill"></WindowFillBar>
      <WindowBar class="window-bar"></WindowBar>
      <TimeBar class="time-bar"></TimeBar>
    </div>
    <input type="file" id="fileInput" style="display: none;">
  </div>
</template>
<script setup lang="ts">
import Window from "./window/Window.vue";
import windowManger from "./window/windowManger.ts";
import TimeBar from "./bar/TimeBar.vue";
import WindowBar from "./bar/WindowBar.vue";
import WindowFillBar from "./bar/WindowFillBar.vue";
import DesktopFileList from "./DesktopFileList.vue";
import Menu from "./menu/Menu.vue";
import MessageBox from "./mesage/MessageBox.vue";

let windows = windowManger.windows;

windowManger.creatWindow({
  url: "/page/filemanager/index.html", title: 'titke', maximizable: false,
  maxWidth:400
})


</script>
<style scoped>
.desktop-div {
  height: calc(100vh - 30px);
  width: 100vw;
  position: relative;
}

.status-bar {
  height: 30px;
  width: 100vw;
  padding-left: 5px;
  display: flex;
  background-color: rgba(243, 243, 243, .85);
  user-select: none;
}

.background {
  width: 100vw;
  height: 100vh;
  background: url("/wallpaper.jpg");
  background-size: cover;
  overflow: hidden;
}

.window-fill {
  width: 30px;
}

.window-bar {
  flex: 1;
}
.time-bar{
  user-select: none;
  width: 80px;
}

</style>
