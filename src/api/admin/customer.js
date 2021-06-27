import * as ajax from "../../common/ajax";


export const deleteItem = id => ajax.get("/admin/customer/delete" ,{
    customerId:id
});

export const update = entity => ajax.put("/admin/department", entity);

export const getPageCount = (id,name) =>
  ajax.get("/admin/customer/page/count", {
      customerId:id,
      customerName: name
  });

export const getPage = (index, id,name) =>
  ajax.get("/admin/customer/page/" + index, {
    customerName: name,
      customerId:id
  });


export const createCustomer = form =>ajax.put("/admin/customer/create",form);

export const pageSize = 20;
