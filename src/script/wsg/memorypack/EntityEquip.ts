import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EquipType } from "./EquipType.js";
import { ShipType } from "./ShipType.js";
import { EntityAttr } from "./EntityAttr.js";

export class EntityEquip {
    id: number;
    title: string | null;
    attr: Map<string | null, number> | null;
    equipType: EquipType;
    shipApply: number[] | null;
    shipTypeApply: ShipType[] | null;
    aluminiumUse: number;

    constructor() {
        this.id = 0;
        this.title = null;
        this.attr = null;
        this.equipType = 0;
        this.shipApply = null;
        this.shipTypeApply = null;
        this.aluminiumUse = 0;

    }

    static serialize(value: EntityEquip | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityEquip | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(7);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeMap(value.attr, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));
        writer.writeInt32(value.equipType);
        writer.writeArray(value.shipApply, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.shipTypeApply, (writer, x) => writer.writeInt32(x));
        writer.writeInt32(value.aluminiumUse);

    }

    static serializeArray(value: (EntityEquip | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityEquip | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityEquip.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityEquip | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityEquip | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityEquip();
        if (count == 7) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());
            value.equipType = reader.readInt32();
            value.shipApply = reader.readArray(reader => reader.readInt32());
            value.shipTypeApply = reader.readArray(reader => reader.readInt32());
            value.aluminiumUse = reader.readInt32();

        }
        else if (count > 7) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 3) return value;
            value.equipType = reader.readInt32(); if (count == 4) return value;
            value.shipApply = reader.readArray(reader => reader.readInt32()); if (count == 5) return value;
            value.shipTypeApply = reader.readArray(reader => reader.readInt32()); if (count == 6) return value;
            value.aluminiumUse = reader.readInt32(); if (count == 7) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityEquip | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityEquip | null)[] | null {
        return reader.readArray(reader => EntityEquip.deserializeCore(reader));
    }
}
