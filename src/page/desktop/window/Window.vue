<template>
  <div :class="{'window-div':true,'window-transition':!mask}" :windowId="wapWindow.id()" :style="windowStyle"
       @mousedown="focusWindow">
    <div class="title-tool">
      <div class="title" @mousedown="startMoveWindow($event,'move')">
        <Label :icon="wapWindow.icon" :icon-size="16">{{ wapWindow.title }}</Label>
      </div>
      <div class="tool" draggable="false">
        <div :class="{'tool-item':true,'min':window.minimizable}" @click="minWindow"
             v-if="props.window.windowType()=='normal'">
          <img draggable="false" width="16" src="/minimize.png">
        </div>
        <div :class="{'tool-item':true,'max':window.maximizable}" @click="maxWindow"
             v-if="props.window.windowType()=='normal'">
          <img draggable="false" v-if="max" width="16" src="/maximize.png">
          <img draggable="false" v-else width="16" src="/maxmin.png">
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
    <template v-if="props.window.windowType()=='normal' && !max">
      <div class="resizable resizable-top" @mousedown="startMoveWindow($event,'top')"></div>
      <div class="resizable resizable-left" @mousedown="startMoveWindow($event,'left')"></div>
      <div class="resizable resizable-bottom" @mousedown="startMoveWindow($event,'bottom')"></div>
      <div class="resizable resizable-right" @mousedown="startMoveWindow($event,'right')"></div>
    </template>
  </div>
</template>
<script setup lang="ts">

import {computed, ref} from "vue";
import Label from "../../../components/Label.vue";
import windowManger from "./windowManger.ts";
import {WapWindow, WindowEvent} from "web-os-api"

let props = defineProps<{
  window: WapWindow
}>();
let wapWindow = props.window;
let scale = ref(1);
let max = ref(false);
let min = ref(false);
let mask = ref(false);
let maxWindowState = {
  top: 0,
  left: 0,
  width: 0,
  height: 0,
}
let minWindowState = {
  top: 0,
  left: 0,
}
let vueWapWindowState = windowManger.getVueWapWindowState(wapWindow.id());
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
    backgroundColor: wapWindow.background,
    transform: 'scale(' + scale.value + ')'
  }
})
props.window.addEventListener("max", (event: WindowEvent) => {
  if (event.defaultPrevented) {
    return
  }
  if (!max.value) {
    //最大化
    max.value = true;
    maxWindowState.top = wapWindow.y;
    maxWindowState.left = wapWindow.x;
    maxWindowState.width = wapWindow.width;
    maxWindowState.height = wapWindow.height;
    wapWindow.x = 0;
    wapWindow.y = 0;
    wapWindow.width = window.innerWidth;
    wapWindow.height = window.innerHeight - 30;
  }
})

props.window.addEventListener("min", (event: WindowEvent) => {
  if (event.defaultPrevented) {
    return
  }
  if (!min.value) {
    //最小化
    min.value = true;
    minWindowState.left = wapWindow.x;
    minWindowState.top = wapWindow.y;
    wapWindow.x = 0;
    wapWindow.y = window.innerHeight;
    scale.value = 0.1;
    windowManger.getVueWapWindowState(wapWindow.id()).extState.focus = false;
  }
})
props.window.addEventListener("focus", (event: WindowEvent) => {
  if (!min.value) {
    return
  }
  //最小化复原
  min.value = false;
  scale.value = 1;
  wapWindow.x = minWindowState.left;
  wapWindow.y = minWindowState.top;
})

function maxWindow() {
  if (wapWindow.maximizable !== true) {
    return
  }
  if (!max.value) {
    wapWindow.pushEvent("max", new WindowEvent());
  } else {
    max.value = false;
    wapWindow.x = maxWindowState.left;
    wapWindow.y = maxWindowState.top;
    wapWindow.width = maxWindowState.width;
    wapWindow.height = maxWindowState.height;
  }
}

function minWindow() {
  if (wapWindow.minimizable !== true) {
    return
  }
  if (!min.value) {
    wapWindow.pushEvent("min", new WindowEvent());
  }
}

function focusWindow() {
  windowManger.focusWindow(wapWindow.id());
}

function startMoveWindow(e: MouseEvent, dir: string) {
  if (max.value) {
    return
  }
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
    if (newW > wapWindow.maxWidth) {
      newW = wapWindow.maxWidth;
    }
    wapWindow.width = newW;
    return
  }
  if (windowMoveState.moveDir == 'bottom') {
    let newH = windowMoveState.height + offsetY;
    if (newH < wapWindow.minHeight) {
      newH = wapWindow.minHeight;
    }
    if (newH > wapWindow.maxHeight) {
      newH = wapWindow.maxHeight;
    }
    wapWindow.height = newH;
    return
  }
  if (windowMoveState.moveDir == 'top') {
    let newH = windowMoveState.height - offsetY;
    if (newH <= wapWindow.minHeight) {
      return;
    }
    if (newH > wapWindow.maxHeight) {
      return;
    }
    wapWindow.y = windowMoveState.top + offsetY;
    wapWindow.height = newH;
    return
  }
  if (windowMoveState.moveDir == 'left') {
    let newW = windowMoveState.width - offsetX;
    if (newW <= wapWindow.minWidth) {
      return;
    }
    if (newW > wapWindow.maxWidth) {
      return;
    }
    wapWindow.width = newW;
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
  transform-origin: top left;
}

.window-transition {
  transition: top 0.3s ease, left 0.3s ease, width 0.3s ease, height 0.3s ease, transform 0.3s ease;
}

.title-tool {
  height: 35px;
  width: 100%;
}

.content {
  height: calc(100% - 35px);
  position: relative;
  user-select: none;
}

.iframe {
  width: calc(100% - 4px);
  height: calc(100% - 5px);
  position: absolute;
  left: 2px;
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
  justify-content: flex-end;
}

.tool-item {
  width: 40px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.tool .close{
  border-top-right-radius: 10px;
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
