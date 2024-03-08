<template>
  <teleport to="body">
    <div menu-div="true" ref="mainMenuHtml" v-show="showMenuRef" :style="mainMenuStyle"
         class="menu-base contextMenu-root">
      <div style="height: 7px"></div>
      <div class="menu-group">
        <div class="menu-group-item" title="重命">
          <img width="20" src="/filemanager/file/rename-active.svg">
        </div>
        <div class="menu-group-item">
          <img width="20" src="/filemanager/file/rename-active.svg">
        </div>
        <div class="menu-group-item">
          <img width="20" src="/filemanager/file/rename-active.svg">
        </div>
        <div class="menu-group-item">
          <img width="20" src="/filemanager/file/rename-active.svg">
        </div>
      </div>
      <div class="menu-item">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg"
               @mouseenter="showSubMenu($event,false)">菜单1</Label>
        <!--        <img src="/filemanager/file/rename-active.svg">-->
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item" @mouseenter="showSubMenu($event,false)">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单11212312121212阿达</Label>
        <!--        <img src="/filemanager/file/rename-active.svg">-->
      </div>
      <div class="menu-item" @mouseenter="showSubMenu($event)">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
        <img src="/filemanager/file/rename-active.svg">
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item" @mouseenter="showSubMenu($event)">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
        <img src="/filemanager/file/rename-active.svg">
      </div>
      <div class="menu-item" @mouseenter="showSubMenu($event)">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
        <img src="/filemanager/file/rename-active.svg">
      </div>
    </div>
  </teleport>
  <teleport to="body">
    <div menu-div="true" ref="subMenuHtml" :style="subMenuStyle" v-show="showSubMenuRef"
         class="menu-base sub-contextMenu-root">
      <div class="menu-item">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
      </div>
      <div class="menu-divider"></div>
      <div class="menu-item">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
      </div>
      <div class="menu-item">
        <Label :textSpace="10" icon="/filemanager/file/rename-active.svg">菜单</Label>
      </div>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {
  ref, reactive, nextTick
} from "vue";
import menuContent from "./menuContent.ts";
import {ContextMenu, Menu} from "web-os-api";
import Label from "../../../components/Label.vue";

let showMenuRef = ref(false);
let showSubMenuRef = ref(false);
let showSubMenuCount=0;
let contextMenu = ref([] as ContextMenu[]);
let mainMenuHtml = ref();
let subMenuHtml = ref();
let mainMenuStyle = reactive({
  left: '0',
  top: '0'
})
let subMenuStyle = reactive({
  left: '0',
  top: '0'
})

function show(menu: ContextMenu[], x: number, y: number) {
  contextMenu.value = menu;
  //@ts-ignore
  showMenuRef.value = true;
  showSubMenuRef.value=false;
  console.log(x, y);
  mainMenuStyle.left = x + 2 + "px";
  mainMenuStyle.top = y + 2 + "px";
  nextTick(() => {
    computedMainMenuPosition(x, y);
  })
}

function computedMainMenuPosition(x: number, y: number) {
  console.log("123")
  let div = mainMenuHtml.value as HTMLDivElement;
  let boundingClientRect = div.getBoundingClientRect();
  if (boundingClientRect.x + boundingClientRect.width + 10 > window.innerWidth) {
    mainMenuStyle.left = x - 2 - boundingClientRect.width + 'px';
  }
  if (boundingClientRect.y + boundingClientRect.height + 10 > window.innerHeight) {
    mainMenuStyle.top = y - 2 - boundingClientRect.height + 'px';
  }
}

function hide() {
  //@ts-ignore
  showMenuRef.value = false;
}


window.addEventListener("mousedown", (evt: MouseEvent) => {
  let target = evt.target as HTMLElement;
  let prent = target.parentElement;
  while (prent !== null && prent !== document.body) {
    if (prent.getAttribute("menu-div") === 'true') {
      return
    }
    prent = prent.parentElement;
  }
  hide();
})

function showSubMenu(event: MouseEvent, sub = true) {
  if (!sub) {
    if (showSubMenuRef.value == true) {
      console.log("close showSubMenuRef")
      let count=showSubMenuCount;
      setTimeout(() => {
        if (count == showSubMenuCount) {
          showSubMenuRef.value = false;
        }
      }, 500)
    }
    return
  }
  showSubMenuRef.value = true;
  showSubMenuCount++;
  let target = event.target as HTMLDivElement;
  let boundingClientRect = target.getBoundingClientRect();

  let x = boundingClientRect.x
  let y = boundingClientRect.y + 3

  let div = mainMenuHtml.value as HTMLDivElement;
  let mainMenuClientRect = div.getBoundingClientRect();
  x = x + mainMenuClientRect.width - 20;

  nextTick(() => {
    let subMenuDiv = subMenuHtml.value as HTMLDivElement;
    const {width, height} = subMenuDiv.getBoundingClientRect()
    if (x + width + 10 > window.innerWidth) {
      //显示在左边
      x = boundingClientRect.x - 8 - width;
    }
    if (y + width + 10 > window.innerHeight) {
      //朝上
      y = boundingClientRect.y - 10 - height + boundingClientRect.height;
    }
    subMenuStyle.left = x + "px";
    subMenuStyle.top = y + "px";
  })
}

function clickMenuItem(menu: Menu) {
  if (menu.click) {
    menu.click();
  }
}

menuContent.contentMenu.show = show;
menuContent.contentMenu.hide = hide;

</script>
<style scoped>

</style>
<style>
.menu-base {
  border-radius: 5px;
  user-select: none;
  background-color: white;
  min-width: 150px;
  position: absolute;
  top: 500px;
  left: 500px;
  z-index: 9999999;
  padding: 7px;
  box-shadow: 3px 3px 20px 3px #c2c2c7;
}

.sub-contextMenu-root {
  left: 600px;
}

.menu-group {
  display: flex;
  align-items: center;
  margin-left: 3px;
}

.menu-item {
  margin: 3px;
}

.menu-group-item {
  width: 30px;
  height: 30px;
  border-radius: 5px;
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.menu-group-item:first-child {
  margin-left: 0px;
}

.menu-group-item:hover {
  background-color: #e3e0e0;
}

.menu-item:hover {
  background-color: #e3e0e0;
}

.menu-item {
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
}

.contextMenu-root {
}

.menu-divider {
  height: 1px;
  width: 100%;
  background-color: #c2c2c7;
  margin-top: 3px;
  margin-bottom: 3px;
}
</style>