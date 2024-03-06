import desktopApi, {DesktopEnv} from "web-os-api/dist/desktop/desktopEnv";
import {Menu, MessageBoxOption} from "web-os-api"
import windowManger from "./window/windowManger.ts";
import menuContent from "./menu/menuContent.ts";
import {FileOpenWapInfoListVo} from "../../../../web-os-js-api/src/api/os.vo.type.ts";


let desktopEnv: DesktopEnv = {
    creatWindow: windowManger.creatWindow,
    getWindow: windowManger.getWindow,
    showMenu: (menus: Menu[], x: number, y: number) => {
        menuContent.contentMenu.show(menus, x, y);
    },
    hideMenu: () => {
        menuContent.contentMenu.hide();
    },
    messageBox: (op: MessageBoxOption,call?:(confirm:boolean)=>void) => {
        let b = confirm(op.msg);
        if(call){
            call(b);
        }
    },
    openFileMode: (wapList: FileOpenWapInfoListVo) => {
        console.log(wapList)
    }

}


desktopApi.initDesktopEnv(desktopEnv);

export default desktopEnv;