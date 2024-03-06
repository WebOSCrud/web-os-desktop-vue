import {Menu, WindowEvent} from "web-os-api"
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

function creatFileMenu(fileVo: FileVoType): Menu[] {
    let filePath = fileVo.file.path;
    return [{
        label: "打开",
        click: () => {
            osApi.openFile(filePath)
        }
    }, {
        label: "打开方式",
        click: () => {
        }
    }, {
        label: '',
        divider: true
    }, {
        label: "删除",
        click: () => {
            deleteFile(fileVo)
        }
    }, {
        label: "复制",
        click: () => {
            osApi.fileClipboard().type = 'copy'
            osApi.fileClipboard().data = fileVo.file;
        }
    }, {
        label: "剪切",
        click: () => {
            osApi.fileClipboard().type = 'cut'
            osApi.fileClipboard().data = fileVo.file;
        }
    }, {
        label: '',
        divider: true
    }, {
        label: "上传文件",
        enable: true,
    }, {
        label: "下载"
    }, {
        label: '',
        divider: true
    }, {
        label: '重命名',
        click: () => {
            fileVo.rename = true;
        }
    }]
}

function creatDirMenu(fileVo: FileVoType, menuCallback: DirMenuCallback, desktop = false): Menu[] {
    let filePath = fileVo.file.path;
    console.log(filePath)
    let isPaste = osApi.fileClipboard().type != null
    if (isPaste) {
        let dataFile = osApi.fileClipboard().data as FileVo
        if (dataFile.prentPath === filePath) {
            isPaste = false;
        }
    }
    let menus: Menu[] = [
        {
            label: "刷新",
            click: () => {
                console.log("refresh")
                menuCallback.refresh(filePath);
            }
        }, {
            label: "打开",
            show: !desktop,
            click: () => {
                menuCallback.open(filePath);
            }
        }, {
            label: '',
            divider: true,
            show: !desktop,
        }, {
            label: "删除",
            show: !desktop,
            click() {
                deleteFile(fileVo);
            },
        }, {
            label: "复制",
            show: !desktop,
            click: () => {
                osApi.fileClipboard().type = 'copy'
                osApi.fileClipboard().data = fileVo.file;
            },
        }, {
            label: "剪切",
            show: !desktop,
            click: () => {
                osApi.fileClipboard().type = 'cut'
                osApi.fileClipboard().data = fileVo.file;
            },
        }, {
            label: '',
            divider: true
        }, {
            label: "粘贴",
            enable: !isPaste,
            click: () => {
                menuCallback.paste(filePath)
            }
        }, {
            label: '',
            divider: true
        }, {
            label: "上传文件",
            click() {
                uploadFile(fileVo.file, menuCallback)
            },
        }, {
            label: "打包下载",
            show: !desktop
        }, {
            label: '',
            divider: true
        }, {
            label: '重命名',
            show: !desktop,
            click: () => {
                fileVo.rename = true
            }
        }]
    console.log(desktop)
    return menus;
}


export default {
    creatFileMenu,
    creatDirMenu
}