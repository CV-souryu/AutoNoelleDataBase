import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class MissionBuildShipConfig {

    constructor() {

    }

    static serialize(value: MissionBuildShipConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionBuildShipConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(0);

    }

    static serializeArray(value: (MissionBuildShipConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionBuildShipConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionBuildShipConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionBuildShipConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionBuildShipConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionBuildShipConfig();
        if (count == 0) {

        }
        else if (count > 0) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionBuildShipConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionBuildShipConfig | null)[] | null {
        return reader.readArray(reader => MissionBuildShipConfig.deserializeCore(reader));
    }
}
