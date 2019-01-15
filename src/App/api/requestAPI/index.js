import ajax from "./ajax";
export default {
    login(username, password){
        return ajax("/login", {username, password}, "POST");
    }
}