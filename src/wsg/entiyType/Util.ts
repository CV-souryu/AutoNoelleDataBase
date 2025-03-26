
type Transfom<TValue,TValueOut> = (value:TValue)=>TValueOut;
export function MessageRecordTransform<TKey extends number | string, TValue, TValueOut>(value: Record<TKey, TValue>|undefined, transform:Transfom<TValue,TValueOut|undefined>): Record<TKey, TValueOut>|undefined {
    const result = {} as Record<TKey, TValueOut>;
    value&& Object.entries<TValue>(value).reduce((v, c) => {const value = transform(c[1]);value&&( v[c[0]] =value); return v }, result)
    return result;
}

export function MessageArrayTransform<TValue,TValueOut>(value:TValue[]|undefined,transform:Transfom<TValue,TValueOut|undefined>):TValueOut[]|undefined{
    return value&&value.map(transform).filter(item=>item!==undefined)
}
