import {ref} from "vue";
import {FileVoType} from "../../js/type/type.ts";
import nav from "./nav.ts";


let selectFileRef = ref<FileVoType[]>([])


function setSelectFile(files: FileVoType[]) {
    for (let file of selectFileRef.value) {
        file.select = false;
    }
    for (let file of files) {
        file.select = true;
    }
    selectFileRef.value = files;
}

function pushSelectFile(file: FileVoType) {
    file.select = true;
    selectFileRef.value.push(file);
}

function getLastFile():FileVoType {
    return selectFileRef.value[selectFileRef.value.length - 1]
}

nav.addEventListener(() => {
    setSelectFile([]);
})
export default {
    getLastFile,
    setSelectFile,
    pushSelectFile,
    selectFileRef
}