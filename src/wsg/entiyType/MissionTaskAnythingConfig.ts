import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type MissionTaskAnythingConfig={
autoDailyReward?:boolean;
autoCook?:boolean;
}
export type MissionTaskAnythingConfigMessage={
0?:boolean;
1?:boolean;
}

export function TransformMissionTaskAnythingConfig(message?:MissionTaskAnythingConfigMessage):MissionTaskAnythingConfig|undefined{
    return message&&{
autoDailyReward:message[0],
autoCook:message[1],

    }
}
