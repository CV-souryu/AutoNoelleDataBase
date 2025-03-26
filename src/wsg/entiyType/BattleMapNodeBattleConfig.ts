import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { BattleFormation } from "./BattleFormation"
import { type BattleMapNodeFormationCheckConfig,type BattleMapNodeFormationCheckConfigMessage , TransformBattleMapNodeFormationCheckConfig } from "./BattleMapNodeFormationCheckConfig"
export type BattleMapNodeBattleConfig={
timeMin?:number;
timeOffset?:number;
battleFormation?:BattleFormation;
battleFormationCheck?:Record<BattleFormation,BattleMapNodeFormationCheckConfig>;
nightAtk?:boolean;
buffId?:number;
}
export type BattleMapNodeBattleConfigMessage={
0?:number;
1?:number;
2?:BattleFormation;
3?:Record<BattleFormation,BattleMapNodeFormationCheckConfigMessage>;
4?:boolean;
5?:number;
}

export function TransformBattleMapNodeBattleConfig(message?:BattleMapNodeBattleConfigMessage):BattleMapNodeBattleConfig|undefined{
    return message&&{
timeMin:message[0],
timeOffset:message[1],
battleFormation:message[2],
battleFormationCheck:MessageRecordTransform(message[3],TransformBattleMapNodeFormationCheckConfig),
nightAtk:message[4],
buffId:message[5],

    }
}
