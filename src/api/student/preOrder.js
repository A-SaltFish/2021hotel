import * as ajax from "../../common/ajax";

export const list = () => ajax.pureGet("/student/course/list");

export const refund = orderId =>
  ajax.pureDelete("/student/course/" + orderId);
