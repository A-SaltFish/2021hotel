import * as ajax from "../../common/ajax";

//获取当前页面的总计个数
export const getPageCount = managerId =>
    ajax.get("/manager/allorder/page/count", {
        customerId: managerId
    });

//获取当前用户的第index页的信息
export const getPage = (index) =>
    ajax.get("/manager/allorder/page/" + index, {});

export const pageSize = 20;
