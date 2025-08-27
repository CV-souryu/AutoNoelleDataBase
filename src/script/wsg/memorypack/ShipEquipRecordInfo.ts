import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class ShipEquipRecordInfo {
    equips: number[] | null;
    index: number;

    constructor() {
        this.equips = null;
        this.index = 0;

    }

    static serialize(value: ShipEquipRecordInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipEquipRecordInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeArray(value.equips, (writer, x) => writer.writeInt32(x));
        writer.writeInt32(value.index);

    }

    static serializeArray(value: (ShipEquipRecordInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipEquipRecordInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipEquipRecordInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipEquipRecordInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipEquipRecordInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipEquipRecordInfo();
        if (count == 2) {
            value.equips = reader.readArray(reader => reader.readInt32());
            value.index = reader.readInt32();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.equips = reader.readArray(reader => reader.readInt32()); if (count == 1) return value;
            value.index = reader.readInt32(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipEquipRecordInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipEquipRecordInfo | null)[] | null {
        return reader.readArray(reader => ShipEquipRecordInfo.deserializeCore(reader));
    }
}
