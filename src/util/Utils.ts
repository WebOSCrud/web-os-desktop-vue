
export default {
     getDefValue<T>(value:T|undefined|null,def:T):T{
         if (value == undefined || value == null) {
             return def;
         }else {
             return value;
         }
    }
}