import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityItem,type EntityItemMessage , TransformEntityItem } from "./EntityItem"
export type ItemCount={
item?:EntityItem;
count?:number;
}
export type ItemCountMessage={
0?:EntityItemMessage;
1?:number;
}

export function TransformItemCount(message?:ItemCountMessage):ItemCount|undefined{
    return message&&{
item:TransformEntityItem(message[0]),
count:message[1],

    }
}
