import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityShip,type EntityShipMessage , TransformEntityShip } from "./EntityShip"
export type EntityFormation={
id?:number;
formation?:number;
ships?:EntityShip[];
}
export type EntityFormationMessage={
0?:number;
1?:number;
2?:EntityShipMessage[];
}

export function TransformEntityFormation(message?:EntityFormationMessage):EntityFormation|undefined{
    return message&&{
id:message[0],
formation:message[1],
ships:MessageArrayTransform(message[2],TransformEntityShip),

    }
}
