import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { MapType } from "./MapType"
import { type EntityMapNode,type EntityMapNodeMessage , TransformEntityMapNode } from "./EntityMapNode"
export type EntityMap={
id?:number;
title?:string;
mapType?:MapType;
initNodeId?:number;
nodes?:EntityMapNode[];
mapName?:string;
}
export type EntityMapMessage={
0?:number;
1?:string;
2?:MapType;
3?:number;
4?:EntityMapNodeMessage[];
5?:string;
}

export function TransformEntityMap(message?:EntityMapMessage):EntityMap|undefined{
    return message&&{
id:message[0],
title:message[1],
mapType:message[2],
initNodeId:message[3],
nodes:MessageArrayTransform(message[4],TransformEntityMapNode),
mapName:message[5],

    }
}
