import ajax from "./ajax";

import {message} from "antd";
import jsonp from "jsonp";

// const SERVER = 'http://localhost:5000';

// username, password ---- 请求登录
export function requestLogin(username, password){
    return ajax("/login", {username, password}, "POST");
}
// city 查询天气
export function requestWeather(city){
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve, reject)=>{
        jsonp(url, {param: "callback"}, (err, response)=>{
            if(err){
                message.error("请求天气暂时不可用，请稍后刷新重试");
                reject("请求天气暂时不可用，请稍后刷新重试");
            }else{
                message.success("天气已更新");
                const {dayPictureUrl, weather} = response.results[0].weather_data[0];
                resolve({dayPictureUrl, weather});
            }
        });
    })
}

// parentId, categoryName ---- 增加 品类
export function requestAddClass(parentId, categoryName) {
    const url = "/manage/category/add";
    return ajax(url, {parentId, categoryName}, "POST");
}

// categoryId, categoryName ---- 修改 品类
export function requestUpadteClass(categoryId, categoryName) {
    const url = "/manage/category/update";
    return ajax(url, {categoryId, categoryName}, "POST");
}

// parentId ---- 查询 品类
export function requestQueryClass(parentId) {
    const url = "/manage/category/list";
    return ajax(url, {parentId}, "GET");
}

// pageNum pageSize ---- 获取商品分页列表
export function requestGetProducts(pageNum, pageSize) {
    const url = "/manage/product/list";
    return ajax(url, {pageNum, pageSize}, "GET");
}
