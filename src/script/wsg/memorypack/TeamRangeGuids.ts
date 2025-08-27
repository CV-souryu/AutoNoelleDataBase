import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class TeamRangeGuids {
    values: (string[] | null)[] | null;

    constructor() {
        this.values = null;

    }

    static serialize(value: TeamRangeGuids | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: TeamRangeGuids | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(1);
        writer.writeArray(value.values, (writer, x) => writer.writeArray(x, (writer, x) => writer.writeGuid(x)));

    }

    static serializeArray(value: (TeamRangeGuids | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (TeamRangeGuids | null)[] | null): void {
        writer.writeArray(value, (writer, x) => TeamRangeGuids.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): TeamRangeGuids | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): TeamRangeGuids | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new TeamRangeGuids();
        if (count == 1) {
            value.values = reader.readArray(reader => reader.readArray(reader => reader.readGuid()));

        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.values = reader.readArray(reader => reader.readArray(reader => reader.readGuid())); if (count == 1) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (TeamRangeGuids | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (TeamRangeGuids | null)[] | null {
        return reader.readArray(reader => TeamRangeGuids.deserializeCore(reader));
    }
}
