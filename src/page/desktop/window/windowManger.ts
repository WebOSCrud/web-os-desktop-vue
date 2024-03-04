import {WapWindow, WindowOption} from "web-os-api";

import {reactive} from "vue";
import Utils from "../../../util/Utils.ts";

let wapId = 1;

const windows: VueWapWindowState[] = reactive([]);

let focusWindowState: VueWapWindowState | null = null;

export interface VueWapWindowState {
    wapWindow: WapWindow,
    extState: {
        zIndex: number,
        focus: boolean
    }
}

function creatWindow(op: WindowOption): WapWindow {
    let id = wapId++;
    let wapWindow: WapWindow = {
        url: op.url,
        title: Utils.getDefValue<string>(op.title, "无标题"),
        icon: Utils.getDefValue<string>(op.iconUrl, "/Application.png"),
        width: Utils.getDefValue<number>(op.width, 520),
        height: Utils.getDefValue<number>(op.height, 400),
        maximizable: Utils.getDefValue<boolean>(op.maximizable, true),
        minimizable: Utils.getDefValue<boolean>(op.minimizable, true),
        background: Utils.getDefValue<string>(op.background, '#f3f3f3'),
        minWidth: Utils.getDefValue<number>(op.minWidth, 200),
        minHeight: Utils.getDefValue<number>(op.minWidth, 200),
        maxWidth: Utils.getDefValue<number>(op.minWidth, -1),
        maxHeight: Utils.getDefValue<number>(op.minWidth, -1),
        resizable: Utils.getDefValue<boolean>(op.resizable, true),
        movable: Utils.getDefValue<boolean>(op.movable, true),
        max: () => {
        },
        min: () => {
        },
        close: () => {
            for (let i = 0; i < windows.length; i++) {
                if (windows[i].wapWindow.id() == id) {
                    windows.splice(i, 1);
                    return
                }
            }
        },
        id: () => {
            return id
        },
        x: Utils.getDefValue<number>(op.x, -1),
        y: Utils.getDefValue<number>(op.y, -1)
    }
    let refWapWindow = reactive(wapWindow);
    let vueState = {
        wapWindow: refWapWindow,
        extState: {
            zIndex: 100,
            focus: false
        },
    }
    windows.push(vueState);
    focusWindow(id);
    return refWapWindow;
}

function getVueWapWindowState(id: number): VueWapWindowState {
    for (let i = 0; i < windows.length; i++) {
        if (windows[i].wapWindow.id() == id) {
            return windows[i];
        }
    }
    return {} as VueWapWindowState;
}

function focusWindow(id: number) {
    let vueWapWindowState = getVueWapWindowState(id);
    let zIndex = 100;
    if (focusWindowState != null) {
        zIndex = focusWindowState.extState.zIndex
        focusWindowState.extState.focus = false;
    }
    focusWindowState = vueWapWindowState;
    focusWindowState.extState.focus = true;
    focusWindowState.extState.zIndex = ++zIndex;
}

function getWindow(id: number): WapWindow {
    return getVueWapWindowState(id).wapWindow;
}

export default {
    getVueWapWindowState,
    focusWindow,
    creatWindow,
    getWindow,
    windows: windows,
    init: () => {
        console.log("windowManger init")
    },
}

