import * as ajax from "../../common/ajax";

//export const get = () => ajax.pureGet("/customer/info");
export const get=()=>ajax.pureGet("/hotel/info")

export const update=entity=>{
    alert("更新酒店");
    console.log(entity);
};

//export const update = entity => ajax.put("/customer/info", entity);
