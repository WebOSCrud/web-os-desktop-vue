import desktopApi, {DesktopEnv} from "web-os-api/dist/desktop/desktopEnv";
import {ContextMenu, MessageBoxOption} from "web-os-api"
import windowManger from "./window/windowManger.ts";
import menuContent from "./menu/menuContent.ts";
import {FileOpenWapInfoListVo} from "../../../../web-os-js-api/src/api/os.vo.type.ts";
import messageBox from "./mesage/messageBox.ts";


let desktopEnv: DesktopEnv = {
    creatWindow: windowManger.creatWindow,
    getWindow: windowManger.getWindow,
    showMenu: (menus: ContextMenu, x: number, y: number) => {
        menuContent.contentMenu.show(menus, x, y);
    },
    hideMenu: () => {
        menuContent.contentMenu.hide();
    },
    messageBox: (op: MessageBoxOption):Promise<boolean> => {
        console.log("messageBox desktopEnv", op)
        return messageBox.showMessage(op);
    },
    openFileMode: (wapList: FileOpenWapInfoListVo) => {
        console.log(wapList)
    }

}


desktopApi.initDesktopEnv(desktopEnv);

export default desktopEnv;