import ajax from "./ajax";

import {message} from "antd";
import jsonp from "jsonp";

export function requestLogin(username, password){
    return ajax("/login", {username, password}, "POST");
}
export function requestWeather(city){
    const url = `http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`;
    return new Promise((resolve, reject)=>{
        jsonp(url, {param: "callback"}, (err, response)=>{
            if(err){
                message.error("请求天气暂时不可用，请稍后刷新重试");
                reject("请求天气暂时不可用，请稍后刷新重试");
            }else{
                message.info("天气已更新");
                const {dayPictureUrl, weather} = response.results[0].weather_data[0];
                resolve({dayPictureUrl, weather});
            }
        });
    })
}
