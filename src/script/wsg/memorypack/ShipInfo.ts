import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipEquipInfo } from "./ShipEquipInfo.js";
import { IntensifyInfo } from "./IntensifyInfo.js";
import { ShipEquipRecordInfo } from "./ShipEquipRecordInfo.js";
import { TacticsInfo } from "./TacticsInfo.js";
import { RepairInfo } from "./RepairInfo.js";
import { ShipStatistics } from "./ShipStatistics.js";

export class ShipInfo {
    id: number;
    cid: number;
    level: number;
    exp: number;
    name: string | null;
    love: number;
    state: number;
    nowSkill: number;
    skillLevel: number;
    nowHp: number;
    nowOil: number;
    nowBullet: number;
    skin: number;
    room: number;
    lock: boolean;
    tactics: number[] | null;
    marry: boolean;
    equips: (ShipEquipInfo | null)[] | null;
    intensify: (IntensifyInfo | null)[] | null;
    record: (ShipEquipRecordInfo | null)[] | null;
    allTactics: (TacticsInfo | null)[] | null;
    repair: RepairInfo | null;
    statistics: ShipStatistics | null;

    constructor() {
        this.id = 0;
        this.cid = 0;
        this.level = 0;
        this.exp = 0;
        this.name = null;
        this.love = 0;
        this.state = 0;
        this.nowSkill = 0;
        this.skillLevel = 0;
        this.nowHp = 0;
        this.nowOil = 0;
        this.nowBullet = 0;
        this.skin = 0;
        this.room = 0;
        this.lock = false;
        this.tactics = null;
        this.marry = false;
        this.equips = null;
        this.intensify = null;
        this.record = null;
        this.allTactics = null;
        this.repair = null;
        this.statistics = null;

    }

    static serialize(value: ShipInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(23);
        writer.writeInt32(value.id);
        writer.writeInt32(value.cid);
        writer.writeInt32(value.level);
        writer.writeInt32(value.exp);
        writer.writeString(value.name);
        writer.writeInt32(value.love);
        writer.writeInt32(value.state);
        writer.writeInt32(value.nowSkill);
        writer.writeInt32(value.skillLevel);
        writer.writeInt32(value.nowHp);
        writer.writeFloat32(value.nowOil);
        writer.writeFloat32(value.nowBullet);
        writer.writeInt32(value.skin);
        writer.writeInt32(value.room);
        writer.writeBoolean(value.lock);
        writer.writeArray(value.tactics, (writer, x) => writer.writeInt32(x));
        writer.writeBoolean(value.marry);
        writer.writeArray(value.equips, (writer, x) => ShipEquipInfo.serializeCore(writer, x));
        writer.writeArray(value.intensify, (writer, x) => IntensifyInfo.serializeCore(writer, x));
        writer.writeArray(value.record, (writer, x) => ShipEquipRecordInfo.serializeCore(writer, x));
        writer.writeArray(value.allTactics, (writer, x) => TacticsInfo.serializeCore(writer, x));
        RepairInfo.serializeCore(writer, value.repair);
        ShipStatistics.serializeCore(writer, value.statistics);

    }

    static serializeArray(value: (ShipInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipInfo();
        if (count == 23) {
            value.id = reader.readInt32();
            value.cid = reader.readInt32();
            value.level = reader.readInt32();
            value.exp = reader.readInt32();
            value.name = reader.readString();
            value.love = reader.readInt32();
            value.state = reader.readInt32();
            value.nowSkill = reader.readInt32();
            value.skillLevel = reader.readInt32();
            value.nowHp = reader.readInt32();
            value.nowOil = reader.readFloat32();
            value.nowBullet = reader.readFloat32();
            value.skin = reader.readInt32();
            value.room = reader.readInt32();
            value.lock = reader.readBoolean();
            value.tactics = reader.readArray(reader => reader.readInt32());
            value.marry = reader.readBoolean();
            value.equips = reader.readArray(reader => ShipEquipInfo.deserializeCore(reader));
            value.intensify = reader.readArray(reader => IntensifyInfo.deserializeCore(reader));
            value.record = reader.readArray(reader => ShipEquipRecordInfo.deserializeCore(reader));
            value.allTactics = reader.readArray(reader => TacticsInfo.deserializeCore(reader));
            value.repair = RepairInfo.deserializeCore(reader);
            value.statistics = ShipStatistics.deserializeCore(reader);

        }
        else if (count > 23) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.cid = reader.readInt32(); if (count == 2) return value;
            value.level = reader.readInt32(); if (count == 3) return value;
            value.exp = reader.readInt32(); if (count == 4) return value;
            value.name = reader.readString(); if (count == 5) return value;
            value.love = reader.readInt32(); if (count == 6) return value;
            value.state = reader.readInt32(); if (count == 7) return value;
            value.nowSkill = reader.readInt32(); if (count == 8) return value;
            value.skillLevel = reader.readInt32(); if (count == 9) return value;
            value.nowHp = reader.readInt32(); if (count == 10) return value;
            value.nowOil = reader.readFloat32(); if (count == 11) return value;
            value.nowBullet = reader.readFloat32(); if (count == 12) return value;
            value.skin = reader.readInt32(); if (count == 13) return value;
            value.room = reader.readInt32(); if (count == 14) return value;
            value.lock = reader.readBoolean(); if (count == 15) return value;
            value.tactics = reader.readArray(reader => reader.readInt32()); if (count == 16) return value;
            value.marry = reader.readBoolean(); if (count == 17) return value;
            value.equips = reader.readArray(reader => ShipEquipInfo.deserializeCore(reader)); if (count == 18) return value;
            value.intensify = reader.readArray(reader => IntensifyInfo.deserializeCore(reader)); if (count == 19) return value;
            value.record = reader.readArray(reader => ShipEquipRecordInfo.deserializeCore(reader)); if (count == 20) return value;
            value.allTactics = reader.readArray(reader => TacticsInfo.deserializeCore(reader)); if (count == 21) return value;
            value.repair = RepairInfo.deserializeCore(reader); if (count == 22) return value;
            value.statistics = ShipStatistics.deserializeCore(reader); if (count == 23) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipInfo | null)[] | null {
        return reader.readArray(reader => ShipInfo.deserializeCore(reader));
    }
}
