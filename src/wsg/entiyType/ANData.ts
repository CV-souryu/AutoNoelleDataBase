import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { type EntityExpedition,type EntityExpeditionMessage , TransformEntityExpedition } from "./EntityExpedition"
import { type EntityItem,type EntityItemMessage , TransformEntityItem } from "./EntityItem"
import { type EntityError,type EntityErrorMessage , TransformEntityError } from "./EntityError"
import { type EntityShip,type EntityShipMessage , TransformEntityShip } from "./EntityShip"
import { type EntityMap,type EntityMapMessage , TransformEntityMap } from "./EntityMap"
import { type EntityEquip,type EntityEquipMessage , TransformEntityEquip } from "./EntityEquip"
import { type EntityFormation,type EntityFormationMessage , TransformEntityFormation } from "./EntityFormation"
import { type EntityShipSkill,type EntityShipSkillMessage , TransformEntityShipSkill } from "./EntityShipSkill"
import { type EntityTask,type EntityTaskMessage , TransformEntityTask } from "./EntityTask"
import { type EntityShipRule,type EntityShipRuleMessage , TransformEntityShipRule } from "./EntityShipRule"
import { type EntityCampaign,type EntityCampaignMessage , TransformEntityCampaign } from "./EntityCampaign"
import { type EntityCookBook,type EntityCookBookMessage , TransformEntityCookBook } from "./EntityCookBook"
export type ANData={
expeditions?:Record<number,EntityExpedition>;
items?:Record<number,EntityItem>;
errors?:Record<number,EntityError>;
ships?:Record<number,EntityShip>;
maps?:Record<number,EntityMap>;
equips?:Record<number,EntityEquip>;
protoCode?:Record<string,number>;
formations?:Record<number,EntityFormation>;
shipSkills?:Record<number,EntityShipSkill>;
tasks?:Record<number,EntityTask>;
versionInfo?:Record<string,string>;
activeRule?:Record<number,EntityShipRule>;
campaigns?:Record<number,EntityCampaign>;
cookBooks?:Record<number,EntityCookBook>;
}
export type ANDataMessage={
0?:Record<number,EntityExpeditionMessage>;
1?:Record<number,EntityItemMessage>;
2?:Record<number,EntityErrorMessage>;
3?:Record<number,EntityShipMessage>;
4?:Record<number,EntityMapMessage>;
5?:Record<number,EntityEquipMessage>;
6?:Record<string,number>;
7?:Record<number,EntityFormationMessage>;
8?:Record<number,EntityShipSkillMessage>;
9?:Record<number,EntityTaskMessage>;
10?:Record<string,string>;
11?:Record<number,EntityShipRuleMessage>;
12?:Record<number,EntityCampaignMessage>;
13?:Record<number,EntityCookBookMessage>;
}

export function TransformANData(message?:ANDataMessage):ANData|undefined{
    return message&&{
expeditions:MessageRecordTransform(message[0],TransformEntityExpedition),
items:MessageRecordTransform(message[1],TransformEntityItem),
errors:MessageRecordTransform(message[2],TransformEntityError),
ships:MessageRecordTransform(message[3],TransformEntityShip),
maps:MessageRecordTransform(message[4],TransformEntityMap),
equips:MessageRecordTransform(message[5],TransformEntityEquip),
protoCode:message[6],
formations:MessageRecordTransform(message[7],TransformEntityFormation),
shipSkills:MessageRecordTransform(message[8],TransformEntityShipSkill),
tasks:MessageRecordTransform(message[9],TransformEntityTask),
versionInfo:message[10],
activeRule:MessageRecordTransform(message[11],TransformEntityShipRule),
campaigns:MessageRecordTransform(message[12],TransformEntityCampaign),
cookBooks:MessageRecordTransform(message[13],TransformEntityCookBook),

    }
}
