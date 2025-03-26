import { MessageRecordTransform , MessageArrayTransform } from "./Util"
export type TeamArray<T>={
v1?:T;
v2?:T;
v3?:T;
v4?:T;
v5?:T;
v6?:T;
}
export type TeamArrayMessage<T>={
0?:T;
1?:T;
2?:T;
3?:T;
4?:T;
5?:T;
}

export function TransformTeamArray<TValue,TValueOut>(message:TeamArrayMessage<TValue>|undefined,transform:(v:TValue|undefined)=>TValueOut|undefined):TeamArray<TValueOut>{
    return{
        V1:transform(message?.[0]),
        V2:transform(message?.[1]),
        V3:transform(message?.[2]),
        V4:transform(message?.[3]),
        V5:transform(message?.[4]),
        V6:transform(message?.[6]),
    }
}

