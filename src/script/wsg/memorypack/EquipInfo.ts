import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class EquipInfo {
    id: number;
    num: number;
    lock: boolean;

    constructor() {
        this.id = 0;
        this.num = 0;
        this.lock = false;

    }

    static serialize(value: EquipInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EquipInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeInt32(value.num);
        writer.writeBoolean(value.lock);

    }

    static serializeArray(value: (EquipInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EquipInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EquipInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EquipInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EquipInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EquipInfo();
        if (count == 3) {
            value.id = reader.readInt32();
            value.num = reader.readInt32();
            value.lock = reader.readBoolean();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.num = reader.readInt32(); if (count == 2) return value;
            value.lock = reader.readBoolean(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EquipInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EquipInfo | null)[] | null {
        return reader.readArray(reader => EquipInfo.deserializeCore(reader));
    }
}
