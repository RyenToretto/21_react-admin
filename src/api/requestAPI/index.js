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

// productDesc pageNum pageSize
// productName pageNum pageSize ---- 搜索 获取到 产品分页列表
export function requestSearchProduct(pageNum, pageSize, searchType, searchName) {
    const url = "/manage/product/search";
    return ajax(url, {pageNum, pageSize, [searchType]:searchName}, "GET");
}

// productId, status ---- 更新商品状态(上架/下架)
export function requestProductStatus(productId, status) {
    const url = "/manage/product/updateStatus";
    return ajax(url, {productId, status}, "POST");
}

// name ---- 请求删除已上传的图片
export function requestDeleteImg(name) {
    const url = "/manage/img/delete";
    return ajax(url, {name}, "POST");
}

// {...} 商品的 提交 或者 修改
export function requestCommitUpdate({_id, name, desc, categoryId, pCategoryId, price, imgs, detail}) {
    let url = "";
    if(_id){
        url = "/manage/product/update";
    }else{
        url = "/manage/product/add";
    }
    return ajax(url, {_id, name, desc, categoryId, pCategoryId, price, imgs, detail}, "POST");
}

// 请求获取 所有角色
export function requestRoleList() {
    const url = "/manage/role/list";
    return ajax(url, "GET");
}

// roleName ---- 请求 创建角色
export function requestRoleAdd(roleName) {
    const url = "/manage/role/add";
    return ajax(url, {roleName}, "POST");
}

// role:{...} ---- 请求 更新角色(给角色设置权限)
export function requestRoleUpdate(role) {
    const url = "/manage/role/update";
    return ajax(url, role, "POST");
}

// 请求获取 所有用户的列表
export function requestAllUser() {
    const url = "/manage/user/list";
    return ajax(url, "GET");
}

// 请求删除 一个用户
export function requestDeleteUser(userId) {
    const url = "/manage/user/delete";
    return ajax(url, {userId},"POST");
}

// 请求创建 一个新用户
export function requestAddUser({username, password, phone, email, role_id}) {
    const url = "/manage/user/add";
    return ajax(url, {username, password, phone, email, role_id},"POST");
}

// 请求创建 一个新用户
export function requestUpdateUser({username, _id, phone, email, role_id}) {
    const url = "/manage/user/update";
    return ajax(url, {username, _id, phone, email, role_id},"POST");
}
