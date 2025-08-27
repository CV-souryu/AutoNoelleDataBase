import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class MissionTaskReciverConfig {
    autoStart: boolean;

    constructor() {
        this.autoStart = false;

    }

    static serialize(value: MissionTaskReciverConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionTaskReciverConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(1);
        writer.writeBoolean(value.autoStart);

    }

    static serializeArray(value: (MissionTaskReciverConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionTaskReciverConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionTaskReciverConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionTaskReciverConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionTaskReciverConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionTaskReciverConfig();
        if (count == 1) {
            value.autoStart = reader.readBoolean();

        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.autoStart = reader.readBoolean(); if (count == 1) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionTaskReciverConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionTaskReciverConfig | null)[] | null {
        return reader.readArray(reader => MissionTaskReciverConfig.deserializeCore(reader));
    }
}
