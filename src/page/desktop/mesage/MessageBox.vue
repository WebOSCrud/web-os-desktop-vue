<template>
  <Teleport to="body">
    <div class="message-mask" v-show="messageRefs.length>0">
    </div>
    <template v-for="message in messageRefs" :key="message.id">
      <div class="message-root" :style="message.style">
        <div class="title-tool">
          <div class="title">
            <Label v-if="message.type=='error'" :icon="'/error.png'"
                   :icon-size="16">{{ message.title }}</Label>
            <Label v-else-if="message.type=='warn'" :icon="'/warn.png'"
                   :icon-size="16">{{ message.title }}</Label>
            <Label v-else :icon="'/info.png'" :icon-size="16">{{ message.title }}</Label>
          </div>
          <div class="tool" draggable="false">
            <div class="tool-item close">
              <img draggable="false" @click="confirm(false,message)" width="16" src="/close.png">
            </div>
          </div>
        </div>
        <div class="content">
          <div class="content-msg" v-html="message.msg">
          </div>
          <div class="footer">
            <Button class="button" v-if="message.okBtn !== false" @click="confirm(true,message)">确定
            </Button>
            <Button class="button" v-if="message.cancelBtn !== false" type="cancel"
                    @click="confirm(false,message)">取消
            </Button>
          </div>
        </div>
      </div>
    </template>
  </Teleport>
</template>
<script setup lang="ts">

import Label from "../../../components/Label.vue";
import messageBox, {MessageBoxRef} from "./messageBox.ts";
import Button from "../../../components/Button.vue";

let messageRefs = messageBox.messageRef;

function confirm(confirm: boolean, m: MessageBoxRef) {
  m.confirm(confirm);
}


</script>
<style scoped>
.message-root {
  width: 400px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 3px 3px 20px 3px #c2c2c7;
  transform-origin: top left;
  z-index: 9999999;
  background-color: rgb(243, 243, 243);
}

.message-mask {
  width: 100vw;
  height: 100vh;
  position: absolute;
  z-index: 9999900;
  left: 0;
  top: 0;
  background-color: rgb(188 187 187 / 60%);
}

.title-tool {
  height: 25px;
  width: 100%;
}

.content {
  position: relative;
  user-select: none;
  padding: 10px;
  display: flex;
  flex-direction: column;
}

.footer {
  display: flex;
  justify-content: flex-end
}

.button {
  margin-left: 5px;
}

.content-msg {
  flex: 1;
  overflow: hidden;
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
}

.tool-item img {
  margin-top: 4px;
}

.tool .close:hover {
  background-color: red;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

</style>
