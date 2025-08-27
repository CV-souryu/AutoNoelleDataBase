import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipType } from "./ShipType.js";
import { ShipCountry } from "./ShipCountry.js";
import { ShipTon } from "./ShipTon.js";
import { EquipType } from "./EquipType.js";
import { EntityAttr } from "./EntityAttr.js";
import { ShipSlotCapacity } from "./ShipSlotCapacity.js";
import { ShipEvoInfo } from "./ShipEvoInfo.js";
import { EntityShipSkill } from "./EntityShipSkill.js";
import { FourBaseItemInt } from "./FourBaseItemInt.js";
import { FourBaseAttrInt } from "./FourBaseAttrInt.js";

export class EntityShip {
    id: number;
    title: string | null;
    classNo: string | null;
    strengthenLevelUpExp: number;
    attr: Map<string | null, number> | null;
    attrMax: Map<string | null, number> | null;
    shipType: ShipType;
    star: number;
    release: boolean;
    evoClass: boolean;
    evoCid: number;
    shipIndex: number;
    capacity: ShipSlotCapacity | null;
    country: ShipCountry;
    evoInfo: ShipEvoInfo | null;
    maxOil: number;
    maxAmmo: number;
    deepSea: boolean;
    cost: number;
    shipTon: ShipTon;
    skills: Map<number, EntityShipSkill | null> | null;
    equipmentNum: number;
    equipmentTypeApply: EquipType[] | null;
    dismantleObj: FourBaseItemInt | null;
    strengthenSupply: FourBaseAttrInt | null;
    strengthenMax: FourBaseAttrInt | null;

    constructor() {
        this.id = 0;
        this.title = null;
        this.classNo = null;
        this.strengthenLevelUpExp = 0;
        this.attr = null;
        this.attrMax = null;
        this.shipType = 0;
        this.star = 0;
        this.release = false;
        this.evoClass = false;
        this.evoCid = 0;
        this.shipIndex = 0;
        this.capacity = null;
        this.country = 0;
        this.evoInfo = null;
        this.maxOil = 0;
        this.maxAmmo = 0;
        this.deepSea = false;
        this.cost = 0;
        this.shipTon = 0;
        this.skills = null;
        this.equipmentNum = 0;
        this.equipmentTypeApply = null;
        this.dismantleObj = null;
        this.strengthenSupply = null;
        this.strengthenMax = null;

    }

    static serialize(value: EntityShip | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityShip | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(26);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeString(value.classNo);
        writer.writeInt32(value.strengthenLevelUpExp);
        writer.writeMap(value.attr, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));
        writer.writeMap(value.attrMax, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));
        writer.writeInt32(value.shipType);
        writer.writeInt32(value.star);
        writer.writeBoolean(value.release);
        writer.writeBoolean(value.evoClass);
        writer.writeInt32(value.evoCid);
        writer.writeInt32(value.shipIndex);
        ShipSlotCapacity.serializeCore(writer, value.capacity);
        writer.writeInt32(value.country);
        ShipEvoInfo.serializeCore(writer, value.evoInfo);
        writer.writeInt32(value.maxOil);
        writer.writeInt32(value.maxAmmo);
        writer.writeBoolean(value.deepSea);
        writer.writeInt32(value.cost);
        writer.writeInt32(value.shipTon);
        writer.writeMap(value.skills, (writer, x) => writer.writeInt32(x), (writer, x) => EntityShipSkill.serializeCore(writer, x));
        writer.writeInt32(value.equipmentNum);
        writer.writeArray(value.equipmentTypeApply, (writer, x) => writer.writeInt32(x));
        FourBaseItemInt.serializeCore(writer, value.dismantleObj);
        FourBaseAttrInt.serializeCore(writer, value.strengthenSupply);
        FourBaseAttrInt.serializeCore(writer, value.strengthenMax);

    }

    static serializeArray(value: (EntityShip | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityShip | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityShip.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityShip | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityShip | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityShip();
        if (count == 26) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.classNo = reader.readString();
            value.strengthenLevelUpExp = reader.readInt32();
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());
            value.attrMax = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());
            value.shipType = reader.readInt32();
            value.star = reader.readInt32();
            value.release = reader.readBoolean();
            value.evoClass = reader.readBoolean();
            value.evoCid = reader.readInt32();
            value.shipIndex = reader.readInt32();
            value.capacity = ShipSlotCapacity.deserializeCore(reader);
            value.country = reader.readInt32();
            value.evoInfo = ShipEvoInfo.deserializeCore(reader);
            value.maxOil = reader.readInt32();
            value.maxAmmo = reader.readInt32();
            value.deepSea = reader.readBoolean();
            value.cost = reader.readInt32();
            value.shipTon = reader.readInt32();
            value.skills = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkill.deserializeCore(reader));
            value.equipmentNum = reader.readInt32();
            value.equipmentTypeApply = reader.readArray(reader => reader.readInt32());
            value.dismantleObj = FourBaseItemInt.deserializeCore(reader);
            value.strengthenSupply = FourBaseAttrInt.deserializeCore(reader);
            value.strengthenMax = FourBaseAttrInt.deserializeCore(reader);

        }
        else if (count > 26) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.classNo = reader.readString(); if (count == 3) return value;
            value.strengthenLevelUpExp = reader.readInt32(); if (count == 4) return value;
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 5) return value;
            value.attrMax = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 6) return value;
            value.shipType = reader.readInt32(); if (count == 7) return value;
            value.star = reader.readInt32(); if (count == 8) return value;
            value.release = reader.readBoolean(); if (count == 9) return value;
            value.evoClass = reader.readBoolean(); if (count == 10) return value;
            value.evoCid = reader.readInt32(); if (count == 11) return value;
            value.shipIndex = reader.readInt32(); if (count == 12) return value;
            value.capacity = ShipSlotCapacity.deserializeCore(reader); if (count == 13) return value;
            value.country = reader.readInt32(); if (count == 14) return value;
            value.evoInfo = ShipEvoInfo.deserializeCore(reader); if (count == 15) return value;
            value.maxOil = reader.readInt32(); if (count == 16) return value;
            value.maxAmmo = reader.readInt32(); if (count == 17) return value;
            value.deepSea = reader.readBoolean(); if (count == 18) return value;
            value.cost = reader.readInt32(); if (count == 19) return value;
            value.shipTon = reader.readInt32(); if (count == 20) return value;
            value.skills = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkill.deserializeCore(reader)); if (count == 21) return value;
            value.equipmentNum = reader.readInt32(); if (count == 22) return value;
            value.equipmentTypeApply = reader.readArray(reader => reader.readInt32()); if (count == 23) return value;
            value.dismantleObj = FourBaseItemInt.deserializeCore(reader); if (count == 24) return value;
            value.strengthenSupply = FourBaseAttrInt.deserializeCore(reader); if (count == 25) return value;
            value.strengthenMax = FourBaseAttrInt.deserializeCore(reader); if (count == 26) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityShip | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityShip | null)[] | null {
        return reader.readArray(reader => EntityShip.deserializeCore(reader));
    }
}
