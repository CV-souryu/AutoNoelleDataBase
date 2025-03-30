import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ItemCount } from "./ItemCount.js";

export class EntityCookBook {
    id: number;
    title: string | null;
    cost: (ItemCount | null)[] | null;

    constructor() {
        this.id = 0;
        this.title = null;
        this.cost = null;

    }

    static serialize(value: EntityCookBook | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityCookBook | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeArray(value.cost, (writer, x) => ItemCount.serializeCore(writer, x));

    }

    static serializeArray(value: (EntityCookBook | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityCookBook | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityCookBook.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityCookBook | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityCookBook | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityCookBook();
        if (count == 3) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.cost = reader.readArray(reader => ItemCount.deserializeCore(reader));

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.cost = reader.readArray(reader => ItemCount.deserializeCore(reader)); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityCookBook | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityCookBook | null)[] | null {
        return reader.readArray(reader => EntityCookBook.deserializeCore(reader));
    }
}
