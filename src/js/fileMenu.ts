import {Menu} from "web-os-api"


interface FileMenuCallback {
    open: (filePath: string) => void;
    delete: (filePath: string) => void;
    rename: (filePath: string) => void;
}

interface DirMenuCallback extends FileMenuCallback {
    paste: (filePath: string) => void;
    refresh: (filePath: string) => void;
}

function creatFileMenu(filePath: string, menuCallback: FileMenuCallback): Menu[] {
    return [{
        label: "打开",
        click: () => {
            menuCallback.open(filePath);
        }
    }, {
        label: "打开方式",
    }, {
        label: '',
        divider: true
    }, {
        label: "删除",
        click: () => {
            menuCallback.delete(filePath);
        }
    }, {
        label: "复制",
        click: () => {

        }
    }, {
        label: "剪切",
        click: () => {
        }
    }, {
        label: '',
        divider: true
    }, {
        label: "上传文件"
    }, {
        label: "下载"
    }, {
        label: '',
        divider: true
    }, {
        label: '重命名',
        click: () => {
            menuCallback.rename(filePath);
        }
    }]
}

function creatDirMenu(filePath: string, menuCallback: DirMenuCallback, desktop = false): Menu[] {
    console.log(filePath)
    let menus = [
        {
            label: "刷新",
            click: () => {
                menuCallback.refresh(filePath);
            }
        }, {
            label: "打开",
            click: () => {
                menuCallback.open(filePath);
            }
        }, {
            label: '',
            divider: true
        }, {
            label: "删除"
        }, {
            label: "复制"
        }, {
            label: "剪切"
        }, {
            label: '',
            divider: true
        }, {
            label: "粘贴",
            click: () => {
                menuCallback.paste(filePath)
            }
        }, {
            label: '',
            divider: true
        }, {
            label: "上传文件"
        }, {
            label: "打包下载"
        }, {
            label: '',
            divider: true
        }, {
            label: '重命名',
            click: () => {
                menuCallback.rename(filePath);
            }
        }]
    if (desktop) {
        menus.splice(1, 1)
        menus.splice(9, 3)
    }
    console.log(desktop)
    return menus;
}


export default {
    creatFileMenu,
    creatDirMenu
}