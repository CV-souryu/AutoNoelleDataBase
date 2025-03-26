import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { BattleFormation } from "./BattleFormation"
export type MissionCampaignBattleConfigTask={
count?:number;
id?:number;
formation?:BattleFormation;
}
export type MissionCampaignBattleConfigTaskMessage={
0?:number;
1?:number;
2?:BattleFormation;
}

export function TransformMissionCampaignBattleConfigTask(message?:MissionCampaignBattleConfigTaskMessage):MissionCampaignBattleConfigTask|undefined{
    return message&&{
count:message[0],
id:message[1],
formation:message[2],

    }
}
