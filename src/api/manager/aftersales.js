import * as ajax from "../../common/ajax";

export const getPageCount = (orderId,roomName) =>
  ajax.get("/manager/aftersales/page/count", {
      orderId: orderId,
      roomName:roomName
  });

export const getPage = (index, orderId,roomName) =>
  ajax.get("/manager/aftersales/page/" + index, {
      orderId: orderId,
      roomName:roomName
  });

export const pageSize = 20;
