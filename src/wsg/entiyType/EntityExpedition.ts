import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type ItemCount,type ItemCountMessage , TransformItemCount } from "./ItemCount"
export type EntityExpedition={
id?:number;
awards?:ItemCount[];
bigAwards?:ItemCount[];
needTime?:number;
title?:string;
}
export type EntityExpeditionMessage={
0?:number;
1?:ItemCountMessage[];
2?:ItemCountMessage[];
3?:number;
4?:string;
}

export function TransformEntityExpedition(message?:EntityExpeditionMessage):EntityExpedition|undefined{
    return message&&{
id:message[0],
awards:MessageArrayTransform(message[1],TransformItemCount),
bigAwards:MessageArrayTransform(message[2],TransformItemCount),
needTime:message[3],
title:message[4],

    }
}
