

<template>
 <div @click="Api.currentWindow().title='哈哈哈'">121</div>
 <div @click="newWinodw">new windw</div>
</template>
<script setup lang="ts">

import Api from "web-os-api"

console.log(Api)
console.log(Api.currentWindow());
Api.currentWindow().title="pppp"
function newWinodw(event:MouseEvent){
  Api.showMenu([{
    label: "Github", click: () => {
      Api.currentWindow().title="jajjaj"
    }
  },{
    label:"菜单2ssssssssssssss",
    divider:true
  }],event)
}
</script>
<style scoped>
</style>
