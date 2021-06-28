import * as ajax from "../../common/ajax";

export const list = () => ajax.pureGet("/customer/preOrder/list");

export const refund = orderId =>
  ajax.pureDelete("/customer/preOrder/" + orderId);
