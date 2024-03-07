import {MessageBoxOption} from "web-os-api"
import { ref} from "vue";
import Utils from "../../../util/Utils.ts";

export type MessageBoxRef ={
    id:number;
    msg: string;
    confirm: (confirm: boolean) => void;
    cancelBtn: boolean;
    type: "error" | "info" | "warn";
    title: string;
    okBtn: boolean;
    style:{
        left:string,
        top:string,
        zIndex:number
    }
};

let messageRef = ref<MessageBoxRef[]>([])

let autoId=1;
let zIndex=9999901;
function showMessage(op: MessageBoxOption): Promise<boolean> {
    console.log("showMessage",op)
    return new Promise((resolve,)=>{
        let type=Utils.getDefValue<"error" | "info" | "warn">(op.type,'info');
        let id=autoId++;
        let mbr:MessageBoxRef={
            id:id,
            type:Utils.getDefValue<"error" | "info" | "warn">(op.type,'info'),
            title:Utils.getDefValue<string>(op.title,type),
            msg:op.msg,
            okBtn:Utils.getDefValue<boolean>(op.okBtn,true),
            cancelBtn:Utils.getDefValue<boolean>(op.cancelBtn,true),
            confirm:(confirm:boolean)=>{
                for (let i = 0; i < messageRef.value.length; i++) {
                    if (messageRef.value[i].id == id) {
                        messageRef.value.splice(i,1);
                    }
                }
                resolve(confirm);
            },
            style:{
                left:"calc(50% + "+messageRef.value.length*10+"px)",
                top:"calc(50% + "+messageRef.value.length*10+"px)",
                zIndex:zIndex++
            }
        }
        messageRef.value.push(mbr);
    })

}

export default {
    messageRef,
    showMessage
}