import {Menu} from "web-os-api/dist/desktop"

function creatFileMenu(filePath: string): Menu[] {
    console.log(filePath)
    return [{
        label: "打开",
    }, {
        label: "打开方式",
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
        label: '重命名',
    }]
}

function creatDirMenu(filePath: string, desktop = false): Menu[] {
    console.log(filePath)
    let menus = [
        {
            label: "刷新",
        }, {
            label: "打开",
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
            label: "粘贴"
        }, {
            label: '',
            divider: true
        }, {
            label: '重命名',
        }]
    if (desktop) {
         menus.splice(1, 1)
    }
    console.log(menus)
    return menus;
}


export default {
    creatFileMenu,
    creatDirMenu
}