import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type TeamArray,type TeamArrayMessage , TransformTeamArray } from "./TeamArray"
import { type RangeInt,type RangeIntMessage , TransformRangeInt } from "./RangeInt"
import { type BattleMapNodeBattleConfig,type BattleMapNodeBattleConfigMessage , TransformBattleMapNodeBattleConfig } from "./BattleMapNodeBattleConfig"
import { type BattleMapNodeFormationCheckConfig,type BattleMapNodeFormationCheckConfigMessage , TransformBattleMapNodeFormationCheckConfig } from "./BattleMapNodeFormationCheckConfig"
export type BattleMapNodeConfig={
isEndPoint?:boolean;
teamHPCondition?:TeamArray<RangeInt>;
battleConfig?:BattleMapNodeBattleConfig;
nodeBackConfig?:BattleMapNodeFormationCheckConfig;
nodeRoundConfig?:BattleMapNodeFormationCheckConfig;
}
export type BattleMapNodeConfigMessage={
0?:boolean;
1?:TeamArrayMessage<RangeIntMessage>;
2?:BattleMapNodeBattleConfigMessage;
3?:BattleMapNodeFormationCheckConfigMessage;
4?:BattleMapNodeFormationCheckConfigMessage;
}

export function TransformBattleMapNodeConfig(message?:BattleMapNodeConfigMessage):BattleMapNodeConfig|undefined{
    return message&&{
isEndPoint:message[0],
teamHPCondition:TransformTeamArray(message[1],TransformRangeInt),
battleConfig:TransformBattleMapNodeBattleConfig(message[2]),
nodeBackConfig:TransformBattleMapNodeFormationCheckConfig(message[3]),
nodeRoundConfig:TransformBattleMapNodeFormationCheckConfig(message[4]),

    }
}
