import {ContextMenu, WindowEvent} from "web-os-api"
import osApi, {api} from "web-os-api"
import axiosUtil from "./utile/axiosUtil.ts";
import {FileVo, ResponseBody} from "./vo/vos.ts";
import {FileVoType} from "./type/type.ts";
import windowManger from "../page/desktop/window/windowManger.ts";
import wapId from "./wapId.ts";
import VoToType from "../js/type/voToType.ts"

let wapIdUrl = "/" + wapId;

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
        if (!file) {
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
        group: [{
            icon: wapIdUrl + "/filemanager/file/svg/cut.svg",
            tip: "剪切",
        }, {
            icon: wapIdUrl + "/filemanager/file/svg/copy.svg",
            tip: "复制",
        }, {
            icon: wapIdUrl + "/filemanager/file/svg/rename.svg",
            tip: "重命名",
        },
            {
                icon: wapIdUrl + "/filemanager/file/svg/delete.svg",
                tip: "删除",
                click() {
                    deleteFile(fileVo);
                },
            }],
        menus: [
            {
                label: "打开",
                icon: api.file.scrUrl.fileIcon(fileVo.file.path),
                click() {
                    osApi.openFile(fileVo.file.path)
                },
            },
            {
                label: "打开方式",
            },
            {
                label: "",
                divider: true,
            },
            {
                label: "复制文件地址",
                click() {
                    navigator.clipboard.writeText(fileVo.file.path).then(() => {
                        console.log("===")
                    }).catch(err => {
                        osApi.messageBox({type: "error", msg: err})
                    })
                },
            },
            {
                label: "",
                divider: true,
            },
            {
                label: "下载",
            },
        ]
    }
}

function creatDirMenu(fileVo: FileVoType, menuCallback: DirMenuCallback, desktop = false, dirOut = false): ContextMenu {
    return {
        group: [],
        menus: [
            {
                label: "刷新",
                show: dirOut,
                click() {
                    menuCallback.refresh(fileVo.file.path);
                },
            },
            {
                label: "排序",
                show: dirOut,
            },
            {
                label: "",
                show: dirOut,
                divider: true,
            },
            {
                label: "新建",
                icon: wapIdUrl + "/filemanager/file/svg/new.svg",
                subMenu: [
                    {
                        label: "文件夹",
                        icon: api.file.scrUrl.fileIcon(fileVo.file.path),
                    }
                ]
            },
            {
                label: "复制文件地址",
                enable: !desktop,
                click() {
                    console.log("复制文件地址")
                    navigator.clipboard.writeText(fileVo.file.path).then(() => {
                        console.log("===")
                    }).catch(err => {
                        osApi.messageBox({type: "error", msg: err})
                    })
                },
            },
            {
                label: "",
                divider: true,
            },
            {
                label: "上传文件",
                show: dirOut,
                click() {
                    uploadFile(fileVo.file, menuCallback)
                },
            },
        ]
    };
}


export default {
    creatFileMenu,
    creatDirMenu
}