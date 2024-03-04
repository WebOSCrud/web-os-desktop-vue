<template>
  <v-contextmenu ref="contextmenu">
    <template v-for="menu in menus" :key="menu.label">
      <v-contextmenu-divider v-if="menu.divider === true"/>
      <v-contextmenu-submenu v-else-if="menu.suMenu" :disabled="menu.enable=== true ? true:false">
        <template #title>
          <Label :icon="menu.icon">{{ menu.label }}</Label>
        </template>
        <template #default>
          <template v-for="subMenu in menu.suMenu" :key="subMenu.label">
            <v-contextmenu-divider v-if="subMenu.divider === true"/>
            <v-contextmenu-item v-else @click="clickMenuItem(subMenu)"
                                :disabled="subMenu.enable=== true ? true:false">
              <Label :icon="subMenu.icon">{{ subMenu.label }}</Label>
            </v-contextmenu-item>
          </template>
        </template>
      </v-contextmenu-submenu>
      <v-contextmenu-item v-else @click="clickMenuItem(menu)"
                          :disabled="menu.enable=== true ? true:false">
        <Label :icon="menu.icon">{{ menu.label }}</Label>
      </v-contextmenu-item>

    </template>

  </v-contextmenu>
</template>
<script setup lang="ts">
import {
  ref,
} from "vue";
import menuContent from "./menuContent.ts";
import {Menu} from "web-os-api";
import Label from "../../../components/Label.vue";


let contextmenu = ref()

let menus = ref([] as Menu[]);

function show(menu: Menu[], x: number, y: number) {
  menus.value = menu;
  //@ts-ignore
  contextmenu.value.show({top: y+2, left: x+2});
}

window.addEventListener("mousedown", (evt: MouseEvent) => {
  let target = evt.target as HTMLElement;
  let prent = target.parentElement;
  while (prent !== null && prent !== document.body) {
    if (prent.getAttribute("class") === 'v-contextmenu') {
      return
    }
    prent = prent.parentElement;
  }
  hide();
})


function hide() {
  //@ts-ignore
  contextmenu.value.hide();
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
.v-contextmenu-submenu__arrow {
  top: 10px
}
</style>