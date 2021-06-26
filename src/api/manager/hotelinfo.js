import * as ajax from "../../common/ajax";

//export const get = () => ajax.pureGet("/customer/info");
export const get=()=>ajax.pureGet("/manager/info")

export const update = entity => ajax.put("/manager/info", entity);
