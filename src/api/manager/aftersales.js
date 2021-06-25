import * as ajax from "../../common/ajax";

export const get = id => ajax.pureGet("/manager/aftersales/" + id);

export const update = entity => ajax.put("/manager/aftersales", entity);

export const getPageCount = (orderId,hotelName) =>
  ajax.get("/manager/aftersales/page/count", {
      managerId: orderId,
      hotelName:hotelName
  });

export const getPage = (index, orderId,hotelName) =>
  ajax.get("/manager/aftersales/page/" + index, {
      orderId: orderId,
      hotelName:hotelName
  });

export const pageSize = 20;
