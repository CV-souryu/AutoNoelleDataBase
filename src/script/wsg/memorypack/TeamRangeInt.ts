import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { RangeInt } from "./RangeInt.js";

export class TeamRangeInt {
    values: (RangeInt | null)[] | null;

    constructor() {
        this.values = null;

    }

    static serialize(value: TeamRangeInt | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: TeamRangeInt | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(1);
        writer.writeArray(value.values, (writer, x) => RangeInt.serializeCore(writer, x));

    }

    static serializeArray(value: (TeamRangeInt | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (TeamRangeInt | null)[] | null): void {
        writer.writeArray(value, (writer, x) => TeamRangeInt.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): TeamRangeInt | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): TeamRangeInt | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new TeamRangeInt();
        if (count == 1) {
            value.values = reader.readArray(reader => RangeInt.deserializeCore(reader));

        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.values = reader.readArray(reader => RangeInt.deserializeCore(reader)); if (count == 1) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (TeamRangeInt | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (TeamRangeInt | null)[] | null {
        return reader.readArray(reader => TeamRangeInt.deserializeCore(reader));
    }
}
