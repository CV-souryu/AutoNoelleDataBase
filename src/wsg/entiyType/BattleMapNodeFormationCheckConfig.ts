import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityMapNodeRouterInfo,type EntityMapNodeRouterInfoMessage , TransformEntityMapNodeRouterInfo } from "./EntityMapNodeRouterInfo"
export type BattleMapNodeFormationCheckConfig={
passCount?:number;
conditions?:EntityMapNodeRouterInfo[];
}
export type BattleMapNodeFormationCheckConfigMessage={
0?:number;
1?:EntityMapNodeRouterInfoMessage[];
}

export function TransformBattleMapNodeFormationCheckConfig(message?:BattleMapNodeFormationCheckConfigMessage):BattleMapNodeFormationCheckConfig|undefined{
    return message&&{
passCount:message[0],
conditions:MessageArrayTransform(message[1],TransformEntityMapNodeRouterInfo),

    }
}
