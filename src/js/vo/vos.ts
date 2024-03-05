
export interface FileVo{
    name:string
    path:string
    dir:boolean
    size:number
    lastModifiedTime:number
}

export interface ResponseBody<T>{
    code:number
    msg:string
    data:T
}