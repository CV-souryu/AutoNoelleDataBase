import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class ShipEquipInfo {
    id: number;
    carryType: number;
    num: number;

    constructor() {
        this.id = 0;
        this.carryType = 0;
        this.num = 0;

    }

    static serialize(value: ShipEquipInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipEquipInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeInt32(value.carryType);
        writer.writeInt32(value.num);

    }

    static serializeArray(value: (ShipEquipInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipEquipInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipEquipInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipEquipInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipEquipInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipEquipInfo();
        if (count == 3) {
            value.id = reader.readInt32();
            value.carryType = reader.readInt32();
            value.num = reader.readInt32();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.carryType = reader.readInt32(); if (count == 2) return value;
            value.num = reader.readInt32(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipEquipInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipEquipInfo | null)[] | null {
        return reader.readArray(reader => ShipEquipInfo.deserializeCore(reader));
    }
}
