<template>
  <teleport to="body">
    <div menu-div="true" ref="mainMenuHtml" v-show="showMenuRef" :style="mainMenuStyle"
         class="menu-base contextMenu-root">
      <!--      <div style="height: 7px"></div>-->
      <div class="menu-group" v-if="contextMenu.group.length>0">
        <div @click="clickMenuGroupItem(groupItem)" v-for="groupItem in contextMenu.group" class="menu-group-item"
             :title="groupItem.tip">
          <img :src="groupItem.icon">
        </div>
      </div>
      <template v-for="menu in contextMenu.menus">
        <div class="menu-divider" v-if="menu.divider==true"></div>
        <div :class="{'menu-item':true,
        'disabled':menu.enable===false,
        'menu-item-hover':menu.enable!==false
        }" @click="clickMenuItem(menu)" @mouseenter="showSubMenu($event,menu)" v-else-if="menu.show!==false">
          <Label :icon-size="20" :textSpace="10" :icon="menu.icon"
                 >{{ menu.label }}</Label>
          <img style="" v-if="menu.subMenu && menu.subMenu.length>0"
               src="/filemanager/min-arrow.svg">
        </div>
      </template>

    </div>
  </teleport>
  <teleport to="body">
    <div menu-div="true" ref="subMenuHtml" :style="subMenuStyle" v-show="showSubMenuRef"
         class="menu-base sub-contextMenu-root">
      <template v-for="menu in contextSubMenu">
        <div class="menu-divider" v-if="menu.divider==true && menu.show!==false"></div>
        <div :class="{'menu-item':true,
        'disabled':menu.enable===false,
        'menu-item-hover':menu.enable!==false
        }" v-if="menu.divider!==true && menu.show!==false">
          <Label :textSpace="10" :icon="menu.icon">{{ menu.label }}</Label>
        </div>
      </template>
    </div>
  </teleport>
</template>
<script setup lang="ts">
import {
  ref, reactive, nextTick
} from "vue";
import menuContent from "./menuContent.ts";
import {ContextMenu, GroupMenu, SubMenu} from "web-os-api";
import Label from "../../../components/Label.vue";
import {Menu} from "web-os-api";

let showMenuRef = ref(false);
let showSubMenuRef = ref(false);
let showSubMenuCount = 0;
let contextMenu = ref<ContextMenu>({group: [], menus: []});
let contextSubMenu = ref<SubMenu[]>([]);

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

function show(menu: ContextMenu, x: number, y: number) {
  contextMenu.value = menu;
  //@ts-ignore
  showMenuRef.value = true;
  showSubMenuRef.value = false;
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
  showSubMenuRef.value = false;
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


function showSubMenu(event: MouseEvent, menu: Menu) {
  let subMenu = menu.subMenu;
  if (menu.enable == false) {
    return;
  }
  if (!(subMenu && subMenu.length > 0)) {
    showSubMenuRef.value = false;
    return
  }
  subMenu = subMenu as SubMenu[];
  contextSubMenu.value = subMenu;
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

function clickMenuItem(menu: SubMenu) {
  hide()
  if (menu.click) {
    menu.click();
  }
}

function clickMenuGroupItem(menu: GroupMenu) {
  hide()
  if (menu.click) {
    menu.click();
  }
}

menuContent.contentMenu.show = show;
menuContent.contentMenu.hide = hide;

</script>
<style scoped>
.menu-base {
  border-radius: 8px;
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

.menu-base img {
  width: 20px;
  height: 20px;
}


.menu-group {
  display: flex;
  align-items: center;
  margin-left: 3px;
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
  margin-left: 2px;
}

.menu-group-item:hover {
  background-color: #e3e0e0;
}

.menu-item-hover:hover {
  background-color: #e3e0e0;
}

.menu-item {
  margin: 3px;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-item img {
  width: 10px;
  height: 10px;
  transform: rotate(-90deg);
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

.disabled {
  opacity: 0.5; /* 半透明 */
}
</style>