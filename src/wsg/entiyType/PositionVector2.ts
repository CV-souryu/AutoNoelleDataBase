import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type PositionVector2={
x?:number;
y?:number;
}
export type PositionVector2Message={
0?:number;
1?:number;
}

export function TransformPositionVector2(message?:PositionVector2Message):PositionVector2|undefined{
    return message&&{
x:message[0],
y:message[1],

    }
}
