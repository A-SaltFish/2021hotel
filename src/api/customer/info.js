import * as ajax from "../../common/ajax";

export const get = () => ajax.pureGet("/customer/info");

export const update = entity => ajax.put("/customer/info", entity);
