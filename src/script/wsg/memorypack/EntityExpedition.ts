import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ItemCount } from "./ItemCount.js";

export class EntityExpedition {
    id: number;
    awards: (ItemCount | null)[] | null;
    bigAwards: (ItemCount | null)[] | null;
    needTime: number;
    title: string | null;

    constructor() {
        this.id = 0;
        this.awards = null;
        this.bigAwards = null;
        this.needTime = 0;
        this.title = null;

    }

    static serialize(value: EntityExpedition | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityExpedition | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(5);
        writer.writeInt32(value.id);
        writer.writeArray(value.awards, (writer, x) => ItemCount.serializeCore(writer, x));
        writer.writeArray(value.bigAwards, (writer, x) => ItemCount.serializeCore(writer, x));
        writer.writeInt32(value.needTime);
        writer.writeString(value.title);

    }

    static serializeArray(value: (EntityExpedition | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityExpedition | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityExpedition.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityExpedition | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityExpedition | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityExpedition();
        if (count == 5) {
            value.id = reader.readInt32();
            value.awards = reader.readArray(reader => ItemCount.deserializeCore(reader));
            value.bigAwards = reader.readArray(reader => ItemCount.deserializeCore(reader));
            value.needTime = reader.readInt32();
            value.title = reader.readString();

        }
        else if (count > 5) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.awards = reader.readArray(reader => ItemCount.deserializeCore(reader)); if (count == 2) return value;
            value.bigAwards = reader.readArray(reader => ItemCount.deserializeCore(reader)); if (count == 3) return value;
            value.needTime = reader.readInt32(); if (count == 4) return value;
            value.title = reader.readString(); if (count == 5) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityExpedition | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityExpedition | null)[] | null {
        return reader.readArray(reader => EntityExpedition.deserializeCore(reader));
    }
}
