import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityItem } from "./EntityItem.js";

export class ItemCount {
    item: EntityItem | null;
    count: number;

    constructor() {
        this.item = null;
        this.count = 0;

    }

    static serialize(value: ItemCount | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ItemCount | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        EntityItem.serializeCore(writer, value.item);
        writer.writeInt32(value.count);

    }

    static serializeArray(value: (ItemCount | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ItemCount | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ItemCount.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ItemCount | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ItemCount | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ItemCount();
        if (count == 2) {
            value.item = EntityItem.deserializeCore(reader);
            value.count = reader.readInt32();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.item = EntityItem.deserializeCore(reader); if (count == 1) return value;
            value.count = reader.readInt32(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ItemCount | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ItemCount | null)[] | null {
        return reader.readArray(reader => ItemCount.deserializeCore(reader));
    }
}
