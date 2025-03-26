import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type ActiveGlobalConfig={
enableDecompose?:boolean;
decomposeShipPipe?:string[];
enableQuickRepair?:boolean;
repairInDay?:number;
}
export type ActiveGlobalConfigMessage={
0?:boolean;
1?:string[];
2?:boolean;
3?:number;
}

export function TransformActiveGlobalConfig(message?:ActiveGlobalConfigMessage):ActiveGlobalConfig|undefined{
    return message&&{
enableDecompose:message[0],
decomposeShipPipe:message[1],
enableQuickRepair:message[2],
repairInDay:message[3],

    }
}
