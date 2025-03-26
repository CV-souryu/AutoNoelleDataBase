import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { ShipType } from "./ShipType"
import { RouteType } from "./RouteType"
export type EntityMapNodeRouterInfo={
number?:number;
shipType?:ShipType;
routeType?:RouteType;
}
export type EntityMapNodeRouterInfoMessage={
0?:number;
1?:ShipType;
2?:RouteType;
}

export function TransformEntityMapNodeRouterInfo(message?:EntityMapNodeRouterInfoMessage):EntityMapNodeRouterInfo|undefined{
    return message&&{
number:message[0],
shipType:message[1],
routeType:message[2],

    }
}
