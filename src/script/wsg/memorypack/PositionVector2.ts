import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class PositionVector2 {
    x: number;
    y: number;

    constructor() {
        this.x = 0;
        this.y = 0;

    }

    static serialize(value: PositionVector2 | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: PositionVector2 | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeFloat32(value.x);
        writer.writeFloat32(value.y);

    }

    static serializeArray(value: (PositionVector2 | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (PositionVector2 | null)[] | null): void {
        writer.writeArray(value, (writer, x) => PositionVector2.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): PositionVector2 | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): PositionVector2 | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new PositionVector2();
        if (count == 2) {
            value.x = reader.readFloat32();
            value.y = reader.readFloat32();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.x = reader.readFloat32(); if (count == 1) return value;
            value.y = reader.readFloat32(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (PositionVector2 | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (PositionVector2 | null)[] | null {
        return reader.readArray(reader => PositionVector2.deserializeCore(reader));
    }
}
