import axios from "axios";

export default(url, data={}, method="GET")=>{
    return new Promise( async (resolve, reject)=>{
        let promiseAxios;
        
        if(method === "GET"){
            promiseAxios = axios.get(url, data, "GET");
        }else if(method === "POST"){
            promiseAxios = axios.post(url, data, "POST");
        }else{
            reject("ajax.js ---- method 传参错误");
        }
        
        promiseAxios.then(result=>{
            resolve(result.data);
        }).catch(error=>{
            reject("ajax.js ---- 请求错误");
        })
    })
}
