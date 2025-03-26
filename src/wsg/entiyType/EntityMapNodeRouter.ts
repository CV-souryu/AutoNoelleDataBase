import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityMapNodeRouterInfo,type EntityMapNodeRouterInfoMessage , TransformEntityMapNodeRouterInfo } from "./EntityMapNodeRouterInfo"
export type EntityMapNodeRouter={
conditions?:EntityMapNodeRouterInfo[];
id?:number;
passCount?:number;
weight?:number;
showBy?:number[];
missBy?:number[];
}
export type EntityMapNodeRouterMessage={
0?:EntityMapNodeRouterInfoMessage[];
1?:number;
2?:number;
3?:number;
4?:number[];
5?:number[];
}

export function TransformEntityMapNodeRouter(message?:EntityMapNodeRouterMessage):EntityMapNodeRouter|undefined{
    return message&&{
conditions:MessageArrayTransform(message[0],TransformEntityMapNodeRouterInfo),
id:message[1],
passCount:message[2],
weight:message[3],
showBy:message[4],
missBy:message[5],

    }
}
