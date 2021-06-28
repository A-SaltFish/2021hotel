import * as ajax from "../../common/ajax";

export const list = () => ajax.pureGet("/customer/preOrder/list");

export const cancel = orderId =>
  ajax.pureDelete("/customer/preOrder/" + orderId);

export const refund = (orderId,reason) =>
    ajax.get("/customer/preOrder/refund" ,{
        orderId:orderId,
        reason:reason
    });

export const remark = (orderId,comment,rank) =>
    ajax.get("/customer/preOrder/remark" ,{
        orderId:orderId,
        comment:comment,
        rank:rank
    });
