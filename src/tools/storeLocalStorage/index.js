import store from "store";

export default {
    local(key_name, value){
        if(value){
            store.set(key_name, value);
        }else{
            return store.get(key_name);
        }
    },
    remove(key_name){
        store.remove(key_name);
    }
}