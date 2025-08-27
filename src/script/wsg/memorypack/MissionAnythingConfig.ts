import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class MissionAnythingConfig {
    autoDailyReward: boolean;
    autoCook: boolean;
    autoBuildShip: boolean;

    constructor() {
        this.autoDailyReward = false;
        this.autoCook = false;
        this.autoBuildShip = false;

    }

    static serialize(value: MissionAnythingConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionAnythingConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeBoolean(value.autoDailyReward);
        writer.writeBoolean(value.autoCook);
        writer.writeBoolean(value.autoBuildShip);

    }

    static serializeArray(value: (MissionAnythingConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionAnythingConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionAnythingConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionAnythingConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionAnythingConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionAnythingConfig();
        if (count == 3) {
            value.autoDailyReward = reader.readBoolean();
            value.autoCook = reader.readBoolean();
            value.autoBuildShip = reader.readBoolean();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.autoDailyReward = reader.readBoolean(); if (count == 1) return value;
            value.autoCook = reader.readBoolean(); if (count == 2) return value;
            value.autoBuildShip = reader.readBoolean(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionAnythingConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionAnythingConfig | null)[] | null {
        return reader.readArray(reader => MissionAnythingConfig.deserializeCore(reader));
    }
}
