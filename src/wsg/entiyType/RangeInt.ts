import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type RangeInt={
min?:number;
max?:number;
}
export type RangeIntMessage={
0?:number;
1?:number;
}

export function TransformRangeInt(message?:RangeIntMessage):RangeInt|undefined{
    return message&&{
min:message[0],
max:message[1],

    }
}
