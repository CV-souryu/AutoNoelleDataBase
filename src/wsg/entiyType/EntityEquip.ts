import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityEquip={
id?:number;
title?:string;
attr?:Record<string,number>;
}
export type EntityEquipMessage={
0?:number;
1?:string;
2?:Record<string,number>;
}

export function TransformEntityEquip(message?:EntityEquipMessage):EntityEquip|undefined{
    return message&&{
id:message[0],
title:message[1],
attr:message[2],

    }
}
