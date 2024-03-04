import {createApp} from 'vue'
import contextmenu from "v-contextmenu";
import "v-contextmenu/dist/themes/default.css";
import osApi from "web-os-api"
import App from './Desktop.vue'
import windowManger from "./window/windowManger.ts";
console.log(osApi);
windowManger.init();

let elementApp = createApp(App);
elementApp.use(contextmenu)
elementApp.mount('#app')
