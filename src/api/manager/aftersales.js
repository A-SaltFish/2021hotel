import * as ajax from "../../common/ajax";

export const getPageCount = (orderId,roomName) =>
  ajax.get("/manager/aftersales/page/count", {
      orderId: orderId,
      roomName:roomName
  });

//退款
export const backRefund=orderId=>ajax.get("/manager/aftersales/refund",{
    orderId:orderId
});

//退单仲裁
export const judge=orderId=>ajax.get("/manager/aftersales/judge",{
    orderId:orderId
});

export const getPage = (index, orderId,roomName) =>
  ajax.get("/manager/aftersales/page/" + index, {
      orderId: orderId,
      roomName:roomName
  });

export const pageSize = 20;
