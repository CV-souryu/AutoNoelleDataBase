import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityMapBuff={
id?:number;
desc?:string;
}
export type EntityMapBuffMessage={
0?:number;
1?:string;
}

export function TransformEntityMapBuff(message?:EntityMapBuffMessage):EntityMapBuff|undefined{
    return message&&{
id:message[0],
desc:message[1],

    }
}
