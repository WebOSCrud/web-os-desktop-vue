import {
    WapWindow,
    WindowEvenListener,
    WindowEvent,
    WindowEventType,
    WindowOption,
    WindowType
} from "web-os-api";

import {reactive} from "vue";
import Utils from "../../../util/Utils.ts";

let autoWapId = 1;

const windows: VueWapWindowState[] = reactive([]);

let focusWindowState: VueWapWindowState | null = null;

export interface VueWapWindowState {
    wapWindow: WapWindow,
    extState: {
        zIndex: number,
        focus: boolean
    }
}

function creatWindow(op: WindowOption, args?: any): WapWindow {
    let id = autoWapId++;
    let width = Utils.getDefValue<number>(op.width, 520);
    let height = Utils.getDefValue<number>(op.height, 400)
    let eventListeners=new Map<WindowEventType,WindowEvenListener[]>;
    let  pushEvent=function (type: WindowEventType, event: WindowEvent) {
        let listeners = eventListeners.get(type);
        if (listeners != undefined) {
            for (let i = 0; i < listeners.length; i++) {
                listeners[i](event);
            }
        }
    }
    let wapWindow: WapWindow = {
        url: op.url,
        title: Utils.getDefValue<string>(op.title, "无标题"),
        icon: Utils.getDefValue<string>(op.iconUrl, "/Application.png"),
        width: width,
        height: height,
        maximizable: Utils.getDefValue<boolean>(op.maximizable, true),
        minimizable: Utils.getDefValue<boolean>(op.minimizable, true),
        background: Utils.getDefValue<string>(op.background, '#f3f3f3'),
        minWidth: Utils.getDefValue<number>(op.minWidth, 200),
        minHeight: Utils.getDefValue<number>(op.minHeight, 200),
        maxWidth: Utils.getDefValue<number>(op.maxWidth, 100000),
        maxHeight: Utils.getDefValue<number>(op.maxHeight, 100000),
        resizable: Utils.getDefValue<boolean>(op.resizable, true),
        movable: Utils.getDefValue<boolean>(op.movable, true),
        windowType: () => {
            return Utils.getDefValue<WindowType>(op.windowType, 'normal');
        },
        max: () => {
            pushEvent("max", new WindowEvent());
        },
        min: () => {
            pushEvent("min", new WindowEvent());
        },
        close: () => {
            console.log("close window")
            let windowEvent = new WindowEvent();
            pushEvent("close", windowEvent)
            console.log(windowEvent)
            if(windowEvent.defaultPrevented){
                return
            }
            for (let i = 0; i < windows.length; i++) {
                if (windows[i].wapWindow.id() == id) {
                    windows.splice(i,1);
                }
            }
        },
        id: () => {
            return id
        },
        args(): any {
            return args;
        },
        addEventListener(type: WindowEventType, listener: WindowEvenListener) {
            let listeners = eventListeners.get(type);
            if (listeners == undefined) {
                listeners=[] as WindowEvenListener[];
                eventListeners.set(type,listeners)
            }
            listeners.push(listener);
        },
        removeEventListener(type: WindowEventType, listener: WindowEvenListener) {
            let listeners = eventListeners.get(type);
            if (listeners != undefined) {
                for (let i = 0; i < listeners.length; i++) {
                    if (listeners[i] == listener) {
                        listeners.splice(i,1);
                        return
                    }
                }
            }
        },
        pushEvent:pushEvent,
        x: Utils.getDefValue<number>(op.x, (window.innerWidth-width)/2),
        y: Utils.getDefValue<number>(op.y, (window.innerHeight-height)/2)
    }
    let refWapWindow = reactive(wapWindow);
    let vueState = {
        wapWindow: refWapWindow,
        extState: {
            zIndex: 100,
            focus: false,
        },
        eventListeners:eventListeners
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
    if (vueWapWindowState.extState.focus) {
        return
    }
    let zIndex = 100;
    if (focusWindowState != null) {
        zIndex = focusWindowState.extState.zIndex
        focusWindowState.extState.focus = false;
        vueWapWindowState.wapWindow.pushEvent("unfocus",new WindowEvent());
    }
    focusWindowState = vueWapWindowState;
    focusWindowState.extState.focus = true;
    focusWindowState.extState.zIndex = ++zIndex;
    vueWapWindowState.wapWindow.pushEvent("focus",new WindowEvent());
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

