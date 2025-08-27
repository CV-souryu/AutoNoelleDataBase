import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class RepairInfo {
    repairTime: bigint;
    pos: number;
    canRubBack: boolean;

    constructor() {
        this.repairTime = 0n;
        this.pos = 0;
        this.canRubBack = false;

    }

    static serialize(value: RepairInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: RepairInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt64(value.repairTime);
        writer.writeInt32(value.pos);
        writer.writeBoolean(value.canRubBack);

    }

    static serializeArray(value: (RepairInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (RepairInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => RepairInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): RepairInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): RepairInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new RepairInfo();
        if (count == 3) {
            value.repairTime = reader.readInt64();
            value.pos = reader.readInt32();
            value.canRubBack = reader.readBoolean();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.repairTime = reader.readInt64(); if (count == 1) return value;
            value.pos = reader.readInt32(); if (count == 2) return value;
            value.canRubBack = reader.readBoolean(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (RepairInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (RepairInfo | null)[] | null {
        return reader.readArray(reader => RepairInfo.deserializeCore(reader));
    }
}
