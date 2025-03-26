import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type BattleMission,type BattleMissionMessage , TransformBattleMission } from "./BattleMission"
export type MissionBattleConfig={
activeBattle?:BattleMission[];
allowDailyRestart?:boolean;
}
export type MissionBattleConfigMessage={
0?:BattleMissionMessage[];
1?:boolean;
}

export function TransformMissionBattleConfig(message?:MissionBattleConfigMessage):MissionBattleConfig|undefined{
    return message&&{
activeBattle:MessageArrayTransform(message[0],TransformBattleMission),
allowDailyRestart:message[1],

    }
}
