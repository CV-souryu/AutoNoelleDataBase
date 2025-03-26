import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type EntityError={
id?:number;
text?:string;
}
export type EntityErrorMessage={
0?:number;
1?:string;
}

export function TransformEntityError(message?:EntityErrorMessage):EntityError|undefined{
    return message&&{
id:message[0],
text:message[1],

    }
}
