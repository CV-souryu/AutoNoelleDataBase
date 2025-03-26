import  { type ANData ,type ANDataMessage,TransformANData } from "#src/wsg/entiyType";
import msgpack from '@ygoe/msgpack';
import localforage from "localforage";
import { ANDataInclude } from "#src/wsg/ANDataInclude";
const {deserialize} = msgpack
type ANDataStore = {
    $data?: ANData | undefined;
};
const DATA_KEY = "ANDATA_MESSAGE";
const ANDataStore: ANDataStore = {
    $data: undefined,
};
const deserializeData=(buffer?: ArrayBuffer | undefined)=> {
    if (!buffer) return false;
    console.time("反序列化")
    const resultMessage = deserialize(buffer) as ANDataMessage
    const result = TransformANData(resultMessage);
    result && ANDataInclude(result);
    console.timeEnd("反序列化")

    console.log(result);


    // ANDataInclude(result)

    ANDataStore.$data = result;
    localforage.setItem(DATA_KEY, buffer)


    return !!ANDataStore.$data;
    // this.data = ANData.deserialize(buffer) || undefined

    // console.log(this.data)
  }
const ANDataStoreReload = async () => {
    if (!!ANDataStore.$data) {
        return ANDataStore.$data;
    }
    await localforage.getItem<ArrayBuffer>(DATA_KEY)
    .then((res) => {
        if (!res) {
            return fetch(
                "https://static.web.auto.noelle.cool/ANData.Web.MessagePack.bin",
                {
                    method: "GET",
                }
            ).then((res) => res.arrayBuffer());
        }
        return res;
    })
    .then((res) =>deserializeData(res))
    .then(()=>{
        if(!ANDataStore.$data){
            localforage.removeItem(DATA_KEY)
        }
    });
};

export default {
    ANDataStore,
    ANDataStoreReload,
};
