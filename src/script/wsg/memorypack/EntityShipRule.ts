import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class EntityShipRule {
    id: number;
    content: Map<string | null, number> | null;

    constructor() {
        this.id = 0;
        this.content = null;

    }

    static serialize(value: EntityShipRule | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityShipRule | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeInt32(value.id);
        writer.writeMap(value.content, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));

    }

    static serializeArray(value: (EntityShipRule | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityShipRule | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityShipRule.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityShipRule | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityShipRule | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityShipRule();
        if (count == 2) {
            value.id = reader.readInt32();
            value.content = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.content = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityShipRule | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityShipRule | null)[] | null {
        return reader.readArray(reader => EntityShipRule.deserializeCore(reader));
    }
}
