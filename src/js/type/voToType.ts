import {FileVo} from "../vo/vos.ts";
import {FileVoType} from "./type.ts";

function fileVoToType(files: FileVo[]): FileVoType[] {
    let fileTypes = new Array<FileVoType>(files.length);
    for (let i = 0; i < files.length; i++) {
        fileTypes[i] = {
            file: files[i],
            rename: false,
            delete: false
        }
    }
    return fileTypes;
}

export default {
    fileVoToType
}