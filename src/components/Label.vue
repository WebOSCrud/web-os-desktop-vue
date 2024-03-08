<template>
  <div class="label-root">
    <img v-if="props.icon" draggable="false" :width="props.iconSize" :height="props.iconSize" :src="props.icon">
    <div :style="{width:props.iconSize+'px',height:props.iconSize+'px'}" v-else class="img-div"></div>
    <span :style="txtStyle" class="text">
      <slot></slot>
    </span>
  </div>
</template>
<script setup lang="ts">
import {computed} from "vue";

const props = withDefaults(defineProps<{
  iconSize?: number,
  icon?: string,
  text?: string,
  textSpace?:number
}>(), {
  iconSize: 23,
  textSpace: 3,
})
let txtStyle=computed(()=>{
  return{
    paddingLeft: props.textSpace+'px'
    // width: 'calc(100% - '+props.iconSize+'px)'
  }
})
</script>
<style scoped>
.label-root {
  display: flex;
  align-items: center;
  flex-wrap:nowrap;
  height: 100%;
}

.text {
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-all;
  white-space: nowrap;
  flex: 1;
  padding-left: 3px;
}

</style>