import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class MissionRepairConfig {
    state: boolean;

    constructor() {
        this.state = false;

    }

    static serialize(value: MissionRepairConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionRepairConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(1);
        writer.writeBoolean(value.state);

    }

    static serializeArray(value: (MissionRepairConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionRepairConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionRepairConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionRepairConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionRepairConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionRepairConfig();
        if (count == 1) {
            value.state = reader.readBoolean();

        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.state = reader.readBoolean(); if (count == 1) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionRepairConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionRepairConfig | null)[] | null {
        return reader.readArray(reader => MissionRepairConfig.deserializeCore(reader));
    }
}
