import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityItem,type EntityItemMessage , TransformEntityItem } from "./EntityItem"
export type EntityCampaign={
id?:number;
difficulty?:boolean;
product?:EntityItem;
}
export type EntityCampaignMessage={
0?:number;
1?:boolean;
2?:EntityItemMessage;
}

export function TransformEntityCampaign(message?:EntityCampaignMessage):EntityCampaign|undefined{
    return message&&{
id:message[0],
difficulty:message[1],
product:TransformEntityItem(message[2]),

    }
}
