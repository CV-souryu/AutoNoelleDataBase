import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type MissionRepairConfig={
autoCheck?:boolean;
}
export type MissionRepairConfigMessage={
0?:boolean;
}

export function TransformMissionRepairConfig(message?:MissionRepairConfigMessage):MissionRepairConfig|undefined{
    return message&&{
autoCheck:message[0],

    }
}
