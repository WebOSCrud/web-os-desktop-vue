import {api, FileTypeVo} from "web-os-api"

let types = await api.file.getTypes();
let map = new Map<string, FileTypeVo>();

for (let i = 0; i < types.data.length; i++) {
    let fileTypeVo = types.data[i];
    map.set(fileTypeVo.extName, types.data[i]);
}


export default {
    getFileType(extName: string): FileTypeVo | undefined {
        return map.get(extName);
    }
}
