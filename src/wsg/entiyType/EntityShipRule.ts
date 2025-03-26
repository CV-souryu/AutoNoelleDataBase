import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityShipRule={
id?:number;
content?:Record<string,number>;
}
export type EntityShipRuleMessage={
0?:number;
1?:Record<string,number>;
}

export function TransformEntityShipRule(message?:EntityShipRuleMessage):EntityShipRule|undefined{
    return message&&{
id:message[0],
content:message[1],

    }
}
