import * as ajax from "../../common/ajax";

export const list = () => ajax.pureGet("/manager/room/list");

export const createRoom = form =>ajax.put("/manager/room/create",form);

export const editRoom = form =>ajax.put("/manager/room/edit",form);

export const deleteRoom=roomId=>ajax.get("/manager/room/delete", {
    roomId: roomId
});
