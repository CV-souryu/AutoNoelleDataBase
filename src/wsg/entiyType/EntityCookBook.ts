import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type ItemCount,type ItemCountMessage , TransformItemCount } from "./ItemCount"
export type EntityCookBook={
id?:number;
title?:string;
cost?:ItemCount[];
}
export type EntityCookBookMessage={
0?:number;
1?:string;
2?:ItemCountMessage[];
}

export function TransformEntityCookBook(message?:EntityCookBookMessage):EntityCookBook|undefined{
    return message&&{
id:message[0],
title:message[1],
cost:MessageArrayTransform(message[2],TransformItemCount),

    }
}
