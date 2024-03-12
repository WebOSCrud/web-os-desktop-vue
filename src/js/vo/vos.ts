
export interface FileVo{
    name:string
    path:string
    dir:boolean
    size:number
    lastModifiedTime:number,
    prentPath:string
    hidde:boolean
    extName:string
}

export interface ResponseBody<T>{
    code:number
    msg:string
    data:T
}