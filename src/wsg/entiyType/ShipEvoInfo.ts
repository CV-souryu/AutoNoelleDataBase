import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type ItemCount,type ItemCountMessage , TransformItemCount } from "./ItemCount"
export type ShipEvoInfo={
level?:number;
costItem?:ItemCount[];
}
export type ShipEvoInfoMessage={
0?:number;
1?:ItemCountMessage[];
}

export function TransformShipEvoInfo(message?:ShipEvoInfoMessage):ShipEvoInfo|undefined{
    return message&&{
level:message[0],
costItem:MessageArrayTransform(message[1],TransformItemCount),

    }
}
