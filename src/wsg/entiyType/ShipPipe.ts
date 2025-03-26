import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { ShipType } from "./ShipType"
import { type RangeInt,type RangeIntMessage , TransformRangeInt } from "./RangeInt"
export type ShipPipe={
name?:string;
shipTypeApply?:ShipType[];
levelRange?:RangeInt;
skillLevelRange?:RangeInt;
hpRate?:RangeInt;
isLock?:boolean;
isEvo?:boolean;
sixthCost?:RangeInt;
id?:string;
description?:string;
}
export type ShipPipeMessage={
3?:string;
4?:ShipType[];
5?:RangeIntMessage;
6?:RangeIntMessage;
7?:RangeIntMessage;
8?:boolean;
9?:boolean;
10?:RangeIntMessage;
0?:string;
2?:string;
}

export function TransformShipPipe(message?:ShipPipeMessage):ShipPipe|undefined{
    return message&&{
name:message[3],
shipTypeApply:message[4],
levelRange:TransformRangeInt(message[5]),
skillLevelRange:TransformRangeInt(message[6]),
hpRate:TransformRangeInt(message[7]),
isLock:message[8],
isEvo:message[9],
sixthCost:TransformRangeInt(message[10]),
id:message[0],
description:message[2],

    }
}
