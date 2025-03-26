import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityItem={
id?:number;
title?:string;
}
export type EntityItemMessage={
0?:number;
1?:string;
}

export function TransformEntityItem(message?:EntityItemMessage):EntityItem|undefined{
    return message&&{
id:message[0],
title:message[1],

    }
}
