import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class EntityMapBuff {
    id: number;
    desc: string | null;

    constructor() {
        this.id = 0;
        this.desc = null;

    }

    static serialize(value: EntityMapBuff | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityMapBuff | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeInt32(value.id);
        writer.writeString(value.desc);

    }

    static serializeArray(value: (EntityMapBuff | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityMapBuff | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityMapBuff.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityMapBuff | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityMapBuff | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityMapBuff();
        if (count == 2) {
            value.id = reader.readInt32();
            value.desc = reader.readString();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.desc = reader.readString(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityMapBuff | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityMapBuff | null)[] | null {
        return reader.readArray(reader => EntityMapBuff.deserializeCore(reader));
    }
}
