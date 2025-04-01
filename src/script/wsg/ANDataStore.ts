import { ANData } from "./memorypack/ANData";
const staticPath = import.meta.env.PUBLIC_STATIC_ASSETS
export class ANDataStore {
    static Data: ANData | undefined;
    static MapNodeTitle: Map<number, string> = new Map<number, string>()
    static DownLoadPromise:Promise<ANData|undefined>|undefined;
    static async Reload() {
        if (!ANDataStore.Data) {
            if(!!ANDataStore.DownLoadPromise){
                return await ANDataStore.DownLoadPromise
            }
            ANDataStore.Data = undefined;
            ANDataStore.DownLoadPromise=  fetch(staticPath+"/static/ANData.Web.MemoryPack.bin")
                .then((res) => res.arrayBuffer())
                .then((buffer) => ANData.deserialize(buffer))
                .then(data => {
                    if (!!data) {
                        ANDataStore.Data = data
                        ANDataStore.Include()
                    }
                    ANDataStore.DownLoadPromise = undefined;
                    return data||undefined
                })
            return await ANDataStore.DownLoadPromise;
        }
        return ANDataStore.Data
    }
    static Include() {
        ANDataStore.MapNodeTitle.clear()

        if (!!ANDataStore.Data) {

            const maps = ANDataStore.Data.maps;
            const formations = ANDataStore.Data.formations;
            const ships = ANDataStore.Data.ships;
            formations?.values().toArray().map(formation => {
                if (!formation) return;
                if (ships) {
                    formation.ships = formation?.ships?.map(ship=>{
                        if(ship){
                            return ships.get(ship.id)
                        }
                    }).filter((element): element is Exclude<typeof element, null | undefined> => !!element) || []
                }

            })

            maps?.values().toArray().map(map => {
                if(!map)return
                map.nodes?.map(mapNode => {

                    if (!mapNode) return
                    if (formations) {
                        
                        mapNode.formation = mapNode.formation?.map(formation => {
                            if (formation) {
                                return formations.get(formation.id)
                            }
                        }).filter((element): element is Exclude<typeof element, null | undefined> => !!element) || []
                    }
                    ANDataStore.MapNodeTitle.set(mapNode.id,`${map.title}-${mapNode.flag}`)
                })
            })
        }
    }
}