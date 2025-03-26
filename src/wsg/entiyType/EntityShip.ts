import { MessageRecordTransform , MessageArrayTransform } from "./Util"
import { ShipType } from "./ShipType"
import { type ShipSlotCapacity,type ShipSlotCapacityMessage , TransformShipSlotCapacity } from "./ShipSlotCapacity"
import { ShipCountry } from "./ShipCountry"
import { type ShipEvoInfo,type ShipEvoInfoMessage , TransformShipEvoInfo } from "./ShipEvoInfo"
import { type ItemCount,type ItemCountMessage , TransformItemCount } from "./ItemCount"
import { ShipTon } from "./ShipTon"
import { type EntityShipSkill,type EntityShipSkillMessage , TransformEntityShipSkill } from "./EntityShipSkill"
export type EntityShip={
id?:number;
title?:string;
classNo?:string;
strengthenLevelUpExp?:number;
attr?:Record<string,number>;
attrMax?:Record<string,number>;
attrSupply?:Record<string,number>;
attrStrengthen?:Record<string,number>;
shipType?:ShipType;
star?:number;
release?:boolean;
evoClass?:boolean;
evoCid?:number;
shipIndex?:number;
capacity?:ShipSlotCapacity;
country?:ShipCountry;
evoInfo?:ShipEvoInfo;
dismantle?:ItemCount[];
maxOil?:number;
maxAmmo?:number;
deepSea?:boolean;
cost?:number;
shipTon?:ShipTon;
skills?:Record<number,EntityShipSkill>;
}
export type EntityShipMessage={
0?:number;
1?:string;
2?:string;
3?:number;
4?:Record<string,number>;
5?:Record<string,number>;
6?:Record<string,number>;
7?:Record<string,number>;
8?:ShipType;
9?:number;
10?:boolean;
11?:boolean;
12?:number;
13?:number;
14?:ShipSlotCapacityMessage;
15?:ShipCountry;
17?:ShipEvoInfoMessage;
18?:ItemCountMessage[];
19?:number;
20?:number;
21?:boolean;
22?:number;
23?:ShipTon;
24?:Record<number,EntityShipSkillMessage>;
}

export function TransformEntityShip(message?:EntityShipMessage):EntityShip|undefined{
    return message&&{
id:message[0],
title:message[1],
classNo:message[2],
strengthenLevelUpExp:message[3],
attr:message[4],
attrMax:message[5],
attrSupply:message[6],
attrStrengthen:message[7],
shipType:message[8],
star:message[9],
release:message[10],
evoClass:message[11],
evoCid:message[12],
shipIndex:message[13],
capacity:TransformShipSlotCapacity(message[14]),
country:message[15],
evoInfo:TransformShipEvoInfo(message[17]),
dismantle:MessageArrayTransform(message[18],TransformItemCount),
maxOil:message[19],
maxAmmo:message[20],
deepSea:message[21],
cost:message[22],
shipTon:message[23],
skills:MessageRecordTransform(message[24],TransformEntityShipSkill),

    }
}
