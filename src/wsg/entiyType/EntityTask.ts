import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { TaskType } from "./TaskType"
import { type ItemCount,type ItemCountMessage , TransformItemCount } from "./ItemCount"
export type EntityTask={
id?:number;
title?:string;
targetCount?:number;
taskType?:TaskType;
awards?:ItemCount[];
}
export type EntityTaskMessage={
0?:number;
1?:string;
2?:number;
3?:TaskType;
4?:ItemCountMessage[];
}

export function TransformEntityTask(message?:EntityTaskMessage):EntityTask|undefined{
    return message&&{
id:message[0],
title:message[1],
targetCount:message[2],
taskType:message[3],
awards:MessageArrayTransform(message[4],TransformItemCount),

    }
}
