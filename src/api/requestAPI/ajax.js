import axios from "axios";

export default(url, data={}, method="GET")=>{
    return new Promise( async (resolve, reject)=>{
        let promiseAxios;
        
        if(method === "GET"){
            // params 配置指定的是 query 参数
            promiseAxios = axios.get(url, {params:data});
        }else if(method === "POST"){
            promiseAxios = axios.post(url, data);
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
