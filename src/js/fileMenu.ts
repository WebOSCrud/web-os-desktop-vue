import {ContextMenu, WindowEvent} from "web-os-api"
import osApi from "web-os-api"
import axiosUtil from "./utile/axiosUtil.ts";
import {FileVo, ResponseBody} from "./vo/vos.ts";
import {FileVoType} from "./type/type.ts";
import windowManger from "../page/desktop/window/windowManger.ts";
import wapId from "./wapId.ts";
import VoToType from "../js/type/voToType.ts"

interface DirMenuCallback {
    open: (filePath: string) => void;
    paste: (filePath: string) => void;
    refresh: (filePath: string) => void;
    upload: (fileVoType: FileVoType) => void;
    newFile: (fileVoType: FileVoType) => void;
}


function deleteFile(fileVo: FileVoType) {
    axiosUtil.post("/files/delete", {
        path: fileVo.file.path
    }).then((res: ResponseBody<any>) => {
        console.log(res)
        fileVo.delete = true;
    })
}

function uploadFile(dir: FileVo, menuCallback: DirMenuCallback) {
    let fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.onchange = () => {
        //@ts-ignore
        let file = fileInput.files[0];
        if(!file){
            return
        }
        let wapWindow = windowManger.creatWindow({
            url: "/" + wapId + "/page/uploadfile/index.html",
            title: '正在上传文件......',
            windowType: "tool",
            iconUrl: "/" + wapId + "/fileupload.png",
            width: 400,
            height: 100
        }, {
            dir: dir,
            file: file
        });
        wapWindow.addEventListener("upload", (event: WindowEvent) => {
            console.log("upload over")
            console.log(event)
            let fileVo = event.data as FileVo;
            let fileVoType = VoToType.fileVoToType([fileVo])[0];
            menuCallback.upload(fileVoType);
        })
    }
    fileInput.click();
}

function creatFileMenu(fileVo: FileVoType): ContextMenu {
    let filePath = fileVo.file.path;
    console.log(filePath);
    return {
        group:[],
        menus:[]
    }
}

function creatDirMenu(fileVo: FileVoType, menuCallback: DirMenuCallback, desktop = false): ContextMenu {
    let filePath = fileVo.file.path;
    console.log(filePath)
    let isPaste = osApi.fileClipboard().type != null
    if (isPaste) {
        let dataFile = osApi.fileClipboard().data as FileVo
        if (dataFile.prentPath === filePath) {
            isPaste = false;
        }
    }
    console.log(desktop)
    console.log(menuCallback)
    return {
        group:[],
        menus:[]
    };
}


export default {
    creatFileMenu,
    creatDirMenu
}