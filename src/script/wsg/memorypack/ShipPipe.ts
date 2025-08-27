import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipType } from "./ShipType.js";
import { IActiveStoreItem } from "./IActiveStoreItem.js";
import { RangeInt } from "./RangeInt.js";

export class ShipPipe {
    id: string;
    name: string | null;
    description: string | null;
    shipTypeBan: ShipType[] | null;
    shipTypeApply: ShipType[] | null;
    levelRange: RangeInt | null;
    skillLevelRange: RangeInt | null;
    hpRate: RangeInt | null;
    isLock: boolean | null;
    isEvo: boolean | null;
    sixthCost: RangeInt | null;
    shipIdApply: number[] | null;
    shipIdBan: number[] | null;

    constructor() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = null;
        this.description = null;
        this.shipTypeBan = null;
        this.shipTypeApply = null;
        this.levelRange = null;
        this.skillLevelRange = null;
        this.hpRate = null;
        this.isLock = null;
        this.isEvo = null;
        this.sixthCost = null;
        this.shipIdApply = null;
        this.shipIdBan = null;

    }

    static serialize(value: ShipPipe | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipPipe | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(13);
        writer.writeGuid(value.id);
        writer.writeString(value.name);
        writer.writeString(value.description);
        writer.writeArray(value.shipTypeBan, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.shipTypeApply, (writer, x) => writer.writeInt32(x));
        RangeInt.serializeCore(writer, value.levelRange);
        RangeInt.serializeCore(writer, value.skillLevelRange);
        RangeInt.serializeCore(writer, value.hpRate);
        writer.writeNullableBoolean(value.isLock);
        writer.writeNullableBoolean(value.isEvo);
        RangeInt.serializeCore(writer, value.sixthCost);
        writer.writeArray(value.shipIdApply, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.shipIdBan, (writer, x) => writer.writeInt32(x));

    }

    static serializeArray(value: (ShipPipe | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipPipe | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipPipe.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipPipe | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipPipe | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipPipe();
        if (count == 13) {
            value.id = reader.readGuid();
            value.name = reader.readString();
            value.description = reader.readString();
            value.shipTypeBan = reader.readArray(reader => reader.readInt32());
            value.shipTypeApply = reader.readArray(reader => reader.readInt32());
            value.levelRange = RangeInt.deserializeCore(reader);
            value.skillLevelRange = RangeInt.deserializeCore(reader);
            value.hpRate = RangeInt.deserializeCore(reader);
            value.isLock = reader.readNullableBoolean();
            value.isEvo = reader.readNullableBoolean();
            value.sixthCost = RangeInt.deserializeCore(reader);
            value.shipIdApply = reader.readArray(reader => reader.readInt32());
            value.shipIdBan = reader.readArray(reader => reader.readInt32());

        }
        else if (count > 13) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readGuid(); if (count == 1) return value;
            value.name = reader.readString(); if (count == 2) return value;
            value.description = reader.readString(); if (count == 3) return value;
            value.shipTypeBan = reader.readArray(reader => reader.readInt32()); if (count == 4) return value;
            value.shipTypeApply = reader.readArray(reader => reader.readInt32()); if (count == 5) return value;
            value.levelRange = RangeInt.deserializeCore(reader); if (count == 6) return value;
            value.skillLevelRange = RangeInt.deserializeCore(reader); if (count == 7) return value;
            value.hpRate = RangeInt.deserializeCore(reader); if (count == 8) return value;
            value.isLock = reader.readNullableBoolean(); if (count == 9) return value;
            value.isEvo = reader.readNullableBoolean(); if (count == 10) return value;
            value.sixthCost = RangeInt.deserializeCore(reader); if (count == 11) return value;
            value.shipIdApply = reader.readArray(reader => reader.readInt32()); if (count == 12) return value;
            value.shipIdBan = reader.readArray(reader => reader.readInt32()); if (count == 13) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipPipe | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipPipe | null)[] | null {
        return reader.readArray(reader => ShipPipe.deserializeCore(reader));
    }
}
