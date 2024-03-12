import {ref} from "vue";

export interface PathNav {
    name: string,
    path: string
}

export type PathListener = (pathNav: PathNav) => void
let pathListeners: PathListener[] = [];
let pathNavRef = ref<PathNav[]>([]);

//用于控制前进后退
let pathDoNavRef = ref<PathNav[][]>([])
let pathDoNavIndexRef = ref(-1);
let isForwardOrforward = false;

function addEventListener(listener: PathListener) {
    pathListeners.push(listener);
}

function removeEventListener(listener: PathListener) {
    for (let i = 0; i < pathListeners.length; i++) {
        if (pathListeners[i] == listener) {
            pathListeners.splice(i, 1)
            return
        }
    }
}

function setPathNav(pathNavs: PathNav[]) {
    let samePath = true;
    if (pathNavs.length == pathNavRef.value.length) {
        for (let i = 0; i < pathNavs.length; i++) {
            if (pathNavRef.value[i].path != pathNavs[i].path) {
                samePath = false;
                break;
            }
        }
    } else {
        samePath = false;
    }
    if (samePath) {
        return
    }
    pathNavRef.value = pathNavs;
    let pathNav = lastPathNav();
    for (let i = 0; i < pathListeners.length; i++) {
        pathListeners[i](pathNav);
    }
    if (!isForwardOrforward) {
        pathDoNavRef.value?.push([...pathNavs]);
        pathDoNavIndexRef.value++;
    }
    isForwardOrforward = false;
}

function pushPathNav(pathNavs: PathNav) {
    console.log("pushPathNav")
    console.log(pathNavs)
    console.log(lastPathNav())
    if (lastPathNav().path == pathNavs.path) {
        return
    }
    pathNavRef.value.push(pathNavs);
    console.log("push path", pathNavs)
    for (let i = 0; i < pathListeners.length; i++) {
        pathListeners[i](pathNavs);
    }
    if (!isForwardOrforward) {
        pathDoNavRef.value?.push([...pathNavRef.value]);
        pathDoNavIndexRef.value++;
    }
    isForwardOrforward = false;
}

function lastPathNav(): PathNav {
    if (pathNavRef.value.length == 0) {
        return {path: "", name: ""};
    }
    return pathNavRef.value[pathNavRef.value.length - 1]
}

function forward() {
    if (pathDoNavIndexRef.value + 1 >= pathDoNavRef.value.length) {
        //执行
        return
    }
    console.log("forward")
    pathDoNavIndexRef.value++;
    isForwardOrforward = true;
    setPathNav(pathDoNavRef.value[pathDoNavIndexRef.value]);
}

function backward() {
    if (pathDoNavIndexRef.value == -1) {
        return
    }
    console.log("backward")
    pathDoNavIndexRef.value--;
    isForwardOrforward = true;
    if (pathDoNavIndexRef.value == -1) {
        setPathNav([]);
    } else {
        setPathNav(pathDoNavRef.value[pathDoNavIndexRef.value]);
    }

}

function uplevel() {
    if (pathNavRef.value.length == 0) {
        return
    }
    pathNavRef.value.pop();
    console.log(pathNavRef)
    let lpv = lastPathNav();
    for (let i = 0; i < pathListeners.length; i++) {
        pathListeners[i](lpv);
    }
    if (!isForwardOrforward) {
        pathDoNavRef.value?.push([...pathNavRef.value]);
        pathDoNavIndexRef.value++;
    }
    isForwardOrforward = false;
}

export default {
    addEventListener,
    removeEventListener,
    pathNavRef,
    lastPathNav,
    setPathNav,
    pushPathNav,
    pathDoNavIndexRef,
    pathDoNavRef,
    forward,
    backward,
    uplevel
}