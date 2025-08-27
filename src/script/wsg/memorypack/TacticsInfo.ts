import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class TacticsInfo {
    id: number;
    exp: number;
    state: number;

    constructor() {
        this.id = 0;
        this.exp = 0;
        this.state = 0;

    }

    static serialize(value: TacticsInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: TacticsInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeInt32(value.exp);
        writer.writeInt32(value.state);

    }

    static serializeArray(value: (TacticsInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (TacticsInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => TacticsInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): TacticsInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): TacticsInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new TacticsInfo();
        if (count == 3) {
            value.id = reader.readInt32();
            value.exp = reader.readInt32();
            value.state = reader.readInt32();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.exp = reader.readInt32(); if (count == 2) return value;
            value.state = reader.readInt32(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (TacticsInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (TacticsInfo | null)[] | null {
        return reader.readArray(reader => TacticsInfo.deserializeCore(reader));
    }
}
