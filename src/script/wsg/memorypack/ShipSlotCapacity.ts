import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class ShipSlotCapacity {
    slot1: number;
    slot2: number;
    slot3: number;
    slot4: number;

    constructor() {
        this.slot1 = 0;
        this.slot2 = 0;
        this.slot3 = 0;
        this.slot4 = 0;

    }

    static serialize(value: ShipSlotCapacity | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipSlotCapacity | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeInt32(value.slot1);
        writer.writeInt32(value.slot2);
        writer.writeInt32(value.slot3);
        writer.writeInt32(value.slot4);

    }

    static serializeArray(value: (ShipSlotCapacity | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipSlotCapacity | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipSlotCapacity.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipSlotCapacity | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipSlotCapacity | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipSlotCapacity();
        if (count == 4) {
            value.slot1 = reader.readInt32();
            value.slot2 = reader.readInt32();
            value.slot3 = reader.readInt32();
            value.slot4 = reader.readInt32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.slot1 = reader.readInt32(); if (count == 1) return value;
            value.slot2 = reader.readInt32(); if (count == 2) return value;
            value.slot3 = reader.readInt32(); if (count == 3) return value;
            value.slot4 = reader.readInt32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipSlotCapacity | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipSlotCapacity | null)[] | null {
        return reader.readArray(reader => ShipSlotCapacity.deserializeCore(reader));
    }
}
