<template>
  <div class="path-tool-div">
    <div class="path-nav">
      <div class="nav">
        <img src="/filemanager/arrow-left-active.png" height="18" width="18"/>
      </div>
      <div class="nav">
        <img src="/filemanager/arrow-right-active.png" height="18" width="18"/>
      </div>
      <div class="nav">
        <img src="/filemanager/arrow-right-active.png" height="18" width="18"/>
      </div>
      <div class="nav">
        <img src="/filemanager/refresh.png" height="18" width="18"/>
      </div>
    </div>
    <div style="width: 5px"></div>
    <div v-show="!showPathInput" class="nav-pc" @click="checkNavItemDiv">
      <img style="position: relative;top:1px" src="/filemanager/pc.png" height="18" width="18"/>
    </div>
    <div v-show="!showPathInput" ref="pathInputDiv" @click.self="inputPath" class="path-input">
      <div ref="navItemDiv" @click.self="inputPath" class="nav-item-div" :style="navItemStyle">
        <template v-for="navPath in navPaths">
          <div class="nav-item">
            >
          </div>
          <div @click="clickPathNav(navPath)" class="nav-item">
            {{ navPath.name }}
          </div>
        </template>
      </div>
    </div>
    <div v-show="showPathInput" class="input-div">
      <input ref="pathInput" v-model="pathInputValue" @keydown.enter="inputEnter" @focusout="inputFocusout">
      <div class="input-down-line"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {nextTick, onMounted, ref} from "vue";
import nav, {PathNav} from "../nav.ts"
import axiosUtil from "../../../js/utile/axiosUtil.ts";
import {ResponseBody} from "../../../js/vo/vos.ts";

let pathInputDiv = ref<HTMLDivElement>();
let navItemDiv = ref<HTMLDivElement>();
let showPathInput = ref(false);
let navPaths = nav.pathNavRef;
let pathInputValue = ref("");
let navItemStyle = ref({
  left: 0 + 'px',
})

let pathInput = ref<HTMLDivElement>();

function inputPath() {
  showPathInput.value = true;
  pathInputValue.value = nav.lastPathNav().path;
  nextTick(() => {
    pathInput.value?.focus()
  })
}

function inputEnter() {
  showPathInput.value = false;
}

function inputFocusout() {
  showPathInput.value = false;
  axiosUtil.post<PathNav[]>("/files/path/nav", {
    path: pathInputValue.value
  }).then(((res: ResponseBody<PathNav[]>) => {
    nav.setPathNav(res.data);
  }))
}

function checkNavItemDiv() {
  //@ts-ignore
  let pathInputDivRect = pathInputDiv.value.getBoundingClientRect();
  //@ts-ignore
  let navItemDivRect = navItemDiv.value.getBoundingClientRect();
  console.log(navItemDivRect.width, pathInputDivRect.width)
  if (navItemDivRect.width > pathInputDivRect.width) {
    navItemStyle.value.left = -(navItemDivRect.width - pathInputDivRect.width + 5) + "px"
  } else {
    navItemStyle.value.left = "0px"
  }
}

function clickPathNav(pathNav: PathNav) {
  if (pathNav == nav.lastPathNav()) {
    return
  }
  let newPathNav = [];
  for (let i = 0; i < navPaths.value.length; i++) {
    if (navPaths.value[i] == pathNav) {
      newPathNav.push(navPaths.value[i])
      break
    }
    newPathNav.push(navPaths.value[i])
  }
  nav.setPathNav(newPathNav);
}

window.addEventListener("resize", checkNavItemDiv)

onMounted(() => {
  checkNavItemDiv();
  nav.addEventListener(()=>{
    nextTick(()=>{
      checkNavItemDiv();
    })
  })
})
</script>
<style scoped>
.path-tool-div {
  width: 100%;
  height: 100%;
  display: flex;
}

.nav {
  width: 25px;
  height: 30px;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
}

.nav:hover {
  background-color: #e3e0e0;
}

.path-nav {
  height: 100%;
  display: flex;
  align-items: center;
}

.path-input {
  background-color: white;
  width: calc(100% - 153px);
  overflow: hidden;
  display: flex;
}

.nav-pc {
  display: flex;
  align-items: center;
  background-color: white;
  padding-left: 5px;
}

.nav-item-div {
  display: flex;
  user-select: none;
  align-items: center;
  position: relative;
}


.nav-item {
  margin-left: 5px;
  padding-left: 5px;
  padding-right: 5px;
  height: 70%;
  display: flex;
  align-items: center;
  border-radius: 5px;
  position: relative;
  white-space: nowrap;
}

.nav-item:hover {
  background-color: #e3e0e0;
}

.input-div {
  flex: 1;
  background-color: white;
  padding-left: 5px;
  padding-right: 5px;
}

.input-div input {
  width: 100%;
  border: none;
  outline: none;
  font-size: 18px;
  height: 30px;
}

.input-down-line {
  height: 3px;
  width: 100%;
  background-color: #0067c0;
}
</style>