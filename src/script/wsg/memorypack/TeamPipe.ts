import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { IActiveStoreItem } from "./IActiveStoreItem.js";
import { TeamRangeGuids } from "./TeamRangeGuids.js";

export class TeamPipe {
    id: string;
    name: string | null;
    description: string | null;
    shipCheckers: TeamRangeGuids | null;
    shipReadys: TeamRangeGuids | null;

    constructor() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = null;
        this.description = null;
        this.shipCheckers = null;
        this.shipReadys = null;

    }

    static serialize(value: TeamPipe | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: TeamPipe | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(5);
        writer.writeGuid(value.id);
        writer.writeString(value.name);
        writer.writeString(value.description);
        TeamRangeGuids.serializeCore(writer, value.shipCheckers);
        TeamRangeGuids.serializeCore(writer, value.shipReadys);

    }

    static serializeArray(value: (TeamPipe | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (TeamPipe | null)[] | null): void {
        writer.writeArray(value, (writer, x) => TeamPipe.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): TeamPipe | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): TeamPipe | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new TeamPipe();
        if (count == 5) {
            value.id = reader.readGuid();
            value.name = reader.readString();
            value.description = reader.readString();
            value.shipCheckers = TeamRangeGuids.deserializeCore(reader);
            value.shipReadys = TeamRangeGuids.deserializeCore(reader);

        }
        else if (count > 5) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readGuid(); if (count == 1) return value;
            value.name = reader.readString(); if (count == 2) return value;
            value.description = reader.readString(); if (count == 3) return value;
            value.shipCheckers = TeamRangeGuids.deserializeCore(reader); if (count == 4) return value;
            value.shipReadys = TeamRangeGuids.deserializeCore(reader); if (count == 5) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (TeamPipe | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (TeamPipe | null)[] | null {
        return reader.readArray(reader => TeamPipe.deserializeCore(reader));
    }
}
