import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityShipSkillLevelInfo={
id?:number;
attr?:Record<string,number>;
desc?:string;
}
export type EntityShipSkillLevelInfoMessage={
0?:number;
1?:Record<string,number>;
2?:string;
}

export function TransformEntityShipSkillLevelInfo(message?:EntityShipSkillLevelInfoMessage):EntityShipSkillLevelInfo|undefined{
    return message&&{
id:message[0],
attr:message[1],
desc:message[2],

    }
}
