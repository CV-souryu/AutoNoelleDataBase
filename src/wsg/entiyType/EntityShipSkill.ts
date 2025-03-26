import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityShipSkill={
id?:number;
title?:string;
skillLevelInfos?:Record<number,string[]>;
}
export type EntityShipSkillMessage={
0?:number;
1?:string;
3?:Record<number,string[]>;
}

export function TransformEntityShipSkill(message?:EntityShipSkillMessage):EntityShipSkill|undefined{
    return message&&{
id:message[0],
title:message[1],
skillLevelInfos:message[3],

    }
}
