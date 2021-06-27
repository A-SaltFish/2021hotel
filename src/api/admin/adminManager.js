import * as ajax from "../../common/ajax";


export const deleteItem = id => ajax.get("/admin/manager/delete" ,{
    customerId:id
});

export const update = entity => ajax.put("/admin/manager", entity);

export const getPageCount = (id,name) =>
    ajax.get("/admin/manager/page/count", {
        managerId:id,
        managerName: name
    });

export const getPage = (index, id,name) =>
    ajax.get("/admin/manager/page/" + index, {
        managerId:id,
        managerName: name,
    });


export const createManager =(managerForm) =>ajax.put("/admin/manager/create/manager",managerForm);
export const createHotel =(hotelForm) =>ajax.put("/admin/manager/create/hotel",hotelForm);

export const pageSize = 20;
