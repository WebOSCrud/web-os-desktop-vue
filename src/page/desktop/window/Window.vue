<template>
  <div class="window-div" :windowId="wapWindow.id()" :style="windowStyle" @mousedown="focusWindow">
    <div class="title-tool">
      <div class="title" @mousedown="startMoveWindow($event,'move')">
        <Label :icon="wapWindow.icon" :icon-size="16" >{{ wapWindow.title }}</Label>
      </div>
      <div class="tool" draggable="false">
        <div class="tool-item max">
          <img draggable="false" width="16" src="/minimize.png">
        </div>
        <div class="tool-item min">
          <img draggable="false" width="16" src="/maxmin.png">
        </div>
        <div class="tool-item close" @click="wapWindow.close()">
          <img draggable="false" width="16" src="/close.png">
        </div>
      </div>
    </div>
    <div class="content">
      <iframe frameborder="0" :windowid="wapWindow.id()" class="iframe" :src="wapWindow.url"></iframe>
      <div v-if="mask || !vueWapWindowState.extState.focus" class="iframe-mask iframe"></div>
    </div>
    <div class="resizable resizable-top" @mousedown="startMoveWindow($event,'top')"></div>
    <div class="resizable resizable-left" @mousedown="startMoveWindow($event,'left')"></div>
    <div class="resizable resizable-bottom" @mousedown="startMoveWindow($event,'bottom')"></div>
    <div class="resizable resizable-right" @mousedown="startMoveWindow($event,'right')"></div>
  </div>
</template>
<script setup lang="ts">

import {computed, ref} from "vue";
import Label from "../../../components/Label.vue";
import windowManger from "./windowManger.ts";
import {WapWindow} from "web-os-api"

let props = defineProps<{
  window: WapWindow
}>();
let wapWindow = props.window;
console.log(wapWindow)
let vueWapWindowState = windowManger.getVueWapWindowState(wapWindow.id());

let mask = ref(false);

let windowMoveState = {
  top: 0,
  left: 0,
  width: 720,
  height: 500,
  moveDir: '',
  screenX: 0,
  screenY: 0,
}

let windowStyle = computed(() => {
  return {
    top: wapWindow.y + "px",
    left: wapWindow.x + "px",
    width: wapWindow.width + "px",
    height: wapWindow.height + "px",
    zIndex: vueWapWindowState.extState.zIndex,
    backgroundColor: wapWindow.background
  }
})

function focusWindow() {
  windowManger.focusWindow(wapWindow.id());
}

function startMoveWindow(e: MouseEvent, dir: string) {
  windowMoveState.top = wapWindow.y
  windowMoveState.left = wapWindow.x;
  windowMoveState.width = wapWindow.width;
  windowMoveState.height = wapWindow.height;
  windowMoveState.screenY = e.screenY;
  windowMoveState.screenX = e.screenX;
  windowMoveState.moveDir = dir;
  mask.value = true;
  window.addEventListener("mouseup", endMoveWindow)
  window.addEventListener("mousemove", resizeAndMove)
}

function resizeAndMove(e: MouseEvent) {
  let offsetX = e.screenX - windowMoveState.screenX;
  let offsetY = e.screenY - windowMoveState.screenY;
  if (windowMoveState.moveDir == 'right') {
    let newW = windowMoveState.width + offsetX;
    if (newW < wapWindow.minWidth) {
      newW = wapWindow.minWidth;
    }
    wapWindow.width = newW;
    return
  }
  if (windowMoveState.moveDir == 'bottom') {
    let newH = windowMoveState.height + offsetY;
    if (newH < wapWindow.minHeight) {
      newH = wapWindow.minHeight;
    }
    wapWindow.height = newH;
    return
  }
  if (windowMoveState.moveDir == 'top') {
    let newH = windowMoveState.height - offsetY;
    if(newH <= wapWindow.minHeight){
       return;
    }
    wapWindow.y = windowMoveState.top + offsetY;
    wapWindow.height = newH;
    return
  }
  if (windowMoveState.moveDir == 'left') {
   let newW = windowMoveState.width - offsetX;
    if(newW <= wapWindow.minWidth){
      return;
    }
    wapWindow.width=newW;
    wapWindow.x = windowMoveState.left + offsetX;
    return
  }
  if (windowMoveState.moveDir == 'move') {
    wapWindow.x = windowMoveState.left + offsetX;
    wapWindow.y = windowMoveState.top + offsetY;

    return
  }
}

function endMoveWindow() {
  mask.value = false;
  window.removeEventListener("mouseup", endMoveWindow);
  window.removeEventListener("mousemove", resizeAndMove);
}

</script>
<style scoped>
.window-div {
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50px;
  left: 100px;
  border-radius: 10px;
  box-shadow: 3px 3px 20px 3px #c2c2c7;
}

.title-tool {
  height: 25px;
  width: 100%;
}

.content {
  height: calc(100% - 25px);
  position: relative;
  user-select: none;
}

.iframe {
  width: 100%;
  height: 100%;
  position: absolute;
}

.iframe-mask {
  position: absolute;
}

.resizable {
  position: absolute;
}

.resizable-bottom {
  width: 100%;
  height: 3px;
}

.resizable-bottom, .resizable-top:hover {
  cursor: ns-resize;
}

.resizable-top {
  width: 100%;
  height: 3px;
  top: -3px;
}

.resizable-left {
  height: 100%;
  width: 3px;
  top: 0px;
  left: -3px;
}

.resizable-right {
  height: 100%;
  width: 3px;
  top: 0px;
  left: 100%;
}

.resizable-left, .resizable-right:hover {
  cursor: ew-resize;
}

.title-tool {
  width: 100%;
  display: flex;
}

.title {
  flex: 1;
  user-select: none;
  padding-left: 5px;
}

.tool {
  width: 120px;
  display: flex;
  user-select: none;
}

.tool-item {
  width: 40px;
  text-align: center;
}

.tool-item img {
  margin-top: 4px;
}

.tool .close:hover {
  background-color: red;
}

.tool .min:hover {
  background-color: gainsboro;
}

.tool .max:hover {
  background-color: gainsboro;
}
</style>
