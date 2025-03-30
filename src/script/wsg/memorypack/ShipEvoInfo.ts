import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ItemCount } from "./ItemCount.js";

export class ShipEvoInfo {
    level: number;
    costItem: (ItemCount | null)[] | null;

    constructor() {
        this.level = 0;
        this.costItem = null;

    }

    static serialize(value: ShipEvoInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipEvoInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeInt32(value.level);
        writer.writeArray(value.costItem, (writer, x) => ItemCount.serializeCore(writer, x));

    }

    static serializeArray(value: (ShipEvoInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipEvoInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipEvoInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipEvoInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipEvoInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipEvoInfo();
        if (count == 2) {
            value.level = reader.readInt32();
            value.costItem = reader.readArray(reader => ItemCount.deserializeCore(reader));

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.level = reader.readInt32(); if (count == 1) return value;
            value.costItem = reader.readArray(reader => ItemCount.deserializeCore(reader)); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipEvoInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipEvoInfo | null)[] | null {
        return reader.readArray(reader => ShipEvoInfo.deserializeCore(reader));
    }
}
