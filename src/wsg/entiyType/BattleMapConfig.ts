import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type TeamArray,type TeamArrayMessage , TransformTeamArray } from "./TeamArray"
import { type RangeInt,type RangeIntMessage , TransformRangeInt } from "./RangeInt"
import { type BattleMapNodeConfig,type BattleMapNodeConfigMessage , TransformBattleMapNodeConfig } from "./BattleMapNodeConfig"
export type BattleMapConfig={
name?:string;
mapInitNodeId?:number;
teamHPCondition?:TeamArray<RangeInt>;
nodeConfigs?:Record<number,BattleMapNodeConfig>;
id?:string;
description?:string;
}
export type BattleMapConfigMessage={
3?:string;
4?:number;
5?:TeamArrayMessage<RangeIntMessage>;
6?:Record<number,BattleMapNodeConfigMessage>;
0?:string;
2?:string;
}

export function TransformBattleMapConfig(message?:BattleMapConfigMessage):BattleMapConfig|undefined{
    return message&&{
name:message[3],
mapInitNodeId:message[4],
teamHPCondition:TransformTeamArray(message[5],TransformRangeInt),
nodeConfigs:MessageRecordTransform(message[6],TransformBattleMapNodeConfig),
id:message[0],
description:message[2],

    }
}
