import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type IActiveStoreItem={
id?:string;
name?:string;
description?:string;
}
export type IActiveStoreItemMessage={
0?:string;
1?:string;
2?:string;
}

export function TransformIActiveStoreItem(message?:IActiveStoreItemMessage):IActiveStoreItem|undefined{
    return message&&{
id:message[0],
name:message[1],
description:message[2],

    }
}
