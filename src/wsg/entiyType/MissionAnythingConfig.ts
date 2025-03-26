import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type MissionAnythingConfig={
autoDailyReward?:boolean;
autoCook?:boolean;
autoBuildShip?:boolean;
}
export type MissionAnythingConfigMessage={
0?:boolean;
1?:boolean;
2?:boolean;
}

export function TransformMissionAnythingConfig(message?:MissionAnythingConfigMessage):MissionAnythingConfig|undefined{
    return message&&{
autoDailyReward:message[0],
autoCook:message[1],
autoBuildShip:message[2],

    }
}
