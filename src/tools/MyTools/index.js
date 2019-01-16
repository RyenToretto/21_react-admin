export function doubleNum(num){
    if(num<10){
        return "0"+num
    }
    else{
        return num
    }
}

export function formateTime(timeStick){
    let today = new Date(timeStick);
    const year = doubleNum(today.getFullYear());
    const month = doubleNum(today.getMonth()+1);
    const date = doubleNum(today.getDate());
    const hours = doubleNum(today.getHours());
    const minutes = doubleNum(today.getMinutes());
    const seconds = doubleNum(today.getSeconds());
    return  year+"-"+month+"-"+date+" "+
            hours+":"+minutes+":"+seconds;
}
