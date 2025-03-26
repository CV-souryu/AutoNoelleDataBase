import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type BattleMission={
enable?:boolean;
autoRestartDaily?:boolean;
autoStopWithFishing?:number;
autoDecompose?:boolean;
battleConfigId?:string;
completeCount?:number;
completeCountTarget?:number;
name?:string;
teamId?:number;
}
export type BattleMissionMessage={
0?:boolean;
1?:boolean;
2?:number;
3?:boolean;
4?:string;
5?:number;
6?:number;
7?:string;
8?:number;
}

export function TransformBattleMission(message?:BattleMissionMessage):BattleMission|undefined{
    return message&&{
enable:message[0],
autoRestartDaily:message[1],
autoStopWithFishing:message[2],
autoDecompose:message[3],
battleConfigId:message[4],
completeCount:message[5],
completeCountTarget:message[6],
name:message[7],
teamId:message[8],

    }
}
