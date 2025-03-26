import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type MissionCampaignBattleConfigTask,type MissionCampaignBattleConfigTaskMessage , TransformMissionCampaignBattleConfigTask } from "./MissionCampaignBattleConfigTask"
export type MissionCampaignBattleConfig={
campaignTasks?:MissionCampaignBattleConfigTask[];
dailyRestart?:boolean;
}
export type MissionCampaignBattleConfigMessage={
1?:MissionCampaignBattleConfigTaskMessage[];
2?:boolean;
}

export function TransformMissionCampaignBattleConfig(message?:MissionCampaignBattleConfigMessage):MissionCampaignBattleConfig|undefined{
    return message&&{
campaignTasks:MessageArrayTransform(message[1],TransformMissionCampaignBattleConfigTask),
dailyRestart:message[2],

    }
}
