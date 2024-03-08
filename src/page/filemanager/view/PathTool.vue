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
    <div v-show="!showPathInput" @click="inputPath" ref="pathInputDiv" class="path-input">
      <div ref="navItemDiv" class="nav-item-div" :style="navItemStyle">
        <template v-for="i in 2">
          <div class="nav-item">
            >
          </div>
          <div class="nav-item">
            D:\{{ i }}
          </div>
        </template>
      </div>
    </div>
    <div v-show="showPathInput" class="input-div">
      <input @focusout="inputFocusout">
      <div class="input-down-line"></div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {onMounted, ref} from "vue";

let pathInputDiv = ref<HTMLDivElement>();
let navItemDiv = ref<HTMLDivElement>();
let showPathInput = ref(false);
let navItemStyle = ref({
  left: 0 + 'px',
})

function inputPath() {
  showPathInput.value = true;
}
function inputFocusout(){
  showPathInput.value = false;
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

window.addEventListener("resize", checkNavItemDiv)

onMounted(() => {
  checkNavItemDiv();
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
.input-down-line{
  height: 3px;
  width: 100%;
  background-color: #0067c0;
}
</style>