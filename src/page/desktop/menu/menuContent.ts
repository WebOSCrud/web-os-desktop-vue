import {ContextMenu} from "web-os-api";

let contentMenu={
    show:()=>{},
    hide:()=>{},
} as {show:(menu:ContextMenu[],x:number,y:number)=>void,hide:()=>void};




export default {
    contentMenu
}