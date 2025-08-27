import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class IntensifyInfo {
    exp: number;
    level: number;
    attr: string | null;

    constructor() {
        this.exp = 0;
        this.level = 0;
        this.attr = null;

    }

    static serialize(value: IntensifyInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: IntensifyInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.exp);
        writer.writeInt32(value.level);
        writer.writeString(value.attr);

    }

    static serializeArray(value: (IntensifyInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (IntensifyInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => IntensifyInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): IntensifyInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): IntensifyInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new IntensifyInfo();
        if (count == 3) {
            value.exp = reader.readInt32();
            value.level = reader.readInt32();
            value.attr = reader.readString();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.exp = reader.readInt32(); if (count == 1) return value;
            value.level = reader.readInt32(); if (count == 2) return value;
            value.attr = reader.readString(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (IntensifyInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (IntensifyInfo | null)[] | null {
        return reader.readArray(reader => IntensifyInfo.deserializeCore(reader));
    }
}
