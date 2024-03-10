import {ref} from "vue";

export interface PathNav {
    name: string,
    path: string
}

export type PathListener = (pathNav: PathNav) => void
let pathListeners: PathListener[] = [];
let pathNavRef = ref<PathNav[]>([]);


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
    pathNavRef.value = pathNavs;
    let pathNav = lastPathNav();
    for (let i = 0; i < pathListeners.length; i++) {
        pathListeners[i](pathNav);
    }
}

function pushPathNav(pathNavs: PathNav) {
    pathNavRef.value.push(pathNavs);
    console.log("push path",pathNavs)
    for (let i = 0; i < pathListeners.length; i++) {
        pathListeners[i](pathNavs);
    }
}

function lastPathNav():PathNav{
    if(pathNavRef.value.length==0){
        return {path:"",name:""};
    }
    return pathNavRef.value[pathNavRef.value.length-1]
}


export default {
    addEventListener,
    removeEventListener,
    pathNavRef,
    lastPathNav,
    setPathNav,
    pushPathNav,
}