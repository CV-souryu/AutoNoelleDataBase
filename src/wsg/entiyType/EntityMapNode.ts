import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { NodeType } from "./NodeType"
import { type PositionVector2,type PositionVector2Message , TransformPositionVector2 } from "./PositionVector2"
import { type EntityMapBuff,type EntityMapBuffMessage , TransformEntityMapBuff } from "./EntityMapBuff"
import { type EntityMapNodeRouter,type EntityMapNodeRouterMessage , TransformEntityMapNodeRouter } from "./EntityMapNodeRouter"
import { type EntityFormation,type EntityFormationMessage , TransformEntityFormation } from "./EntityFormation"
export type EntityMapNode={
nodeType?:NodeType;
roundabout?:boolean;
nightAtk?:boolean;
id?:number;
flag?:string;
postion?:PositionVector2;
buffs?:EntityMapBuff[];
nodeRouter?:EntityMapNodeRouter[];
formation?:EntityFormation[];
}
export type EntityMapNodeMessage={
0?:NodeType;
1?:boolean;
2?:boolean;
3?:number;
4?:string;
5?:PositionVector2Message;
6?:EntityMapBuffMessage[];
7?:EntityMapNodeRouterMessage[];
8?:EntityFormationMessage[];
}

export function TransformEntityMapNode(message?:EntityMapNodeMessage):EntityMapNode|undefined{
    return message&&{
nodeType:message[0],
roundabout:message[1],
nightAtk:message[2],
id:message[3],
flag:message[4],
postion:TransformPositionVector2(message[5]),
buffs:MessageArrayTransform(message[6],TransformEntityMapBuff),
nodeRouter:MessageArrayTransform(message[7],TransformEntityMapNodeRouter),
formation:MessageArrayTransform(message[8],TransformEntityFormation),

    }
}
