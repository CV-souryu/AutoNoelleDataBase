import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type ShipSlotCapacity={
slot1?:number;
slot2?:number;
slot3?:number;
slot4?:number;
}
export type ShipSlotCapacityMessage={
0?:number;
1?:number;
2?:number;
3?:number;
}

export function TransformShipSlotCapacity(message?:ShipSlotCapacityMessage):ShipSlotCapacity|undefined{
    return message&&{
slot1:message[0],
slot2:message[1],
slot3:message[2],
slot4:message[3],

    }
}
