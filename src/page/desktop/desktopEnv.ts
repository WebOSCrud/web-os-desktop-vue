import desktopApi,{DesktopEnv} from "web-os-api/dist/desktop/desktopEnv";
import {Menu} from "web-os-api"
import windowManger from "./window/windowManger.ts";
import menuContent from "./menu/menuContent.ts";


let desktopEnv:DesktopEnv={
    creatWindow:windowManger.creatWindow,
    getWindow:windowManger.getWindow,
    showMenu:(menus:Menu[],x:number,y:number)=>{
        menuContent.contentMenu.show(menus,x,y);
    },
    hideMenu:()=>{
        menuContent.contentMenu.hide();
    }
}


desktopApi.initDesktopEnv(desktopEnv);

export default desktopEnv;