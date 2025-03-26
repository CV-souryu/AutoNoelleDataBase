import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type MissionTaskReciverConfig={
autoStart?:boolean;
}
export type MissionTaskReciverConfigMessage={
0?:boolean;
}

export function TransformMissionTaskReciverConfig(message?:MissionTaskReciverConfigMessage):MissionTaskReciverConfig|undefined{
    return message&&{
autoStart:message[0],

    }
}
