import {Menu} from "web-os-api/dist/desktop";

let contentMenu={
    show:()=>{},
    hide:()=>{},
} as {show:(menu:Menu[],x:number,y:number)=>void,hide:()=>void};




export default {
    contentMenu
}