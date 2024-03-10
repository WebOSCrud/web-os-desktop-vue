<template>
  <div class="app-root">
    <div class="file-name">{{ file.name }}</div>
    <Progress :progress="progress"></Progress>
  </div>
</template>
<script setup lang="ts">

import osApi, {WindowEvent} from "web-os-api"
import {FileVo, ResponseBody} from "../../js/vo/vos.ts";
import axiosUtil from "../../js/utile/axiosUtil.ts";
import {AxiosError, AxiosProgressEvent, AxiosResponse} from "axios";
import Progress from "../../components/Progress.vue";
import {onMounted, ref} from "vue";

console.log("？？？？？？？？？")
let args = osApi.currentWindow().args() as { dir: FileVo, file: File };
console.log(args)

let file = args.file;
let progress = ref(0);

let param = new FormData() //创建form对象，私有，无法直接获取，只能通过get来查看其中的元素
param.append('file', file)
param.append("dir", args.dir.path)


let close = false;
onMounted(() => {
  axiosUtil.axios.post("/files/upload", param, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    transformRequest: [function (data) {
      return data
    }],
    onUploadProgress(progressEvent: AxiosProgressEvent) {
      let total = progressEvent.total as number;
      let persent = (progressEvent.loaded / total * 100 | 0)		//上传进度百分比
      console.log(persent)
      if (persent >= 99) {
        persent = 99;
      }
      progress.value = persent;
    },
  }).then((res: AxiosResponse<ResponseBody<FileVo>>) => {
    console.log(res)
    close = true;
    progress.value = 100;
    osApi.currentWindow().pushEvent("upload", new WindowEvent(res.data.data));
    setTimeout(() => {
      osApi.currentWindow().close()
    }, 500)
  }).catch((err: AxiosError) => {
    console.log(err)
    close = true;
    osApi.messageBox({type: 'error', msg: err.message})
    osApi.currentWindow().close();
  })
})


osApi.currentWindow().addEventListener("close", (event: WindowEvent) => {
  console.log("close")
  if (close) {
    return
  }
  //阻止默认事件操作
  event.preventDefault();

  //是否可以关闭
  osApi.messageBox({type: 'info', msg: "是否取消上传"}).then(confirm => {
    console.log("是否取消上传:" + confirm)
    if (confirm) {
      close = true;
      osApi.currentWindow().close();
    }
  })
})

</script>
<style scoped>
.app-root {
  padding: 5px;
}

.file-name {
  width: 100%;
  white-space: nowrap; /* 防止文本换行 */
  overflow: hidden; /* 隐藏溢出的文本 */
  text-overflow: ellipsis; /* 使用省略号表示溢出的文本 */
}
</style>
