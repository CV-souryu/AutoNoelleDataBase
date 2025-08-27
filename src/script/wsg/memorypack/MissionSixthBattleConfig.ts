import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class MissionSixthBattleConfig {
    autoRun: boolean;
    autoBuy: boolean;
    autoBuyWith: number;
    targets: number[] | null;
    minTickets: number;

    constructor() {
        this.autoRun = false;
        this.autoBuy = false;
        this.autoBuyWith = 0;
        this.targets = null;
        this.minTickets = 0;

    }

    static serialize(value: MissionSixthBattleConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionSixthBattleConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(5);
        writer.writeBoolean(value.autoRun);
        writer.writeBoolean(value.autoBuy);
        writer.writeInt32(value.autoBuyWith);
        writer.writeArray(value.targets, (writer, x) => writer.writeInt32(x));
        writer.writeInt32(value.minTickets);

    }

    static serializeArray(value: (MissionSixthBattleConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionSixthBattleConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionSixthBattleConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionSixthBattleConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionSixthBattleConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionSixthBattleConfig();
        if (count == 5) {
            value.autoRun = reader.readBoolean();
            value.autoBuy = reader.readBoolean();
            value.autoBuyWith = reader.readInt32();
            value.targets = reader.readArray(reader => reader.readInt32());
            value.minTickets = reader.readInt32();

        }
        else if (count > 5) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.autoRun = reader.readBoolean(); if (count == 1) return value;
            value.autoBuy = reader.readBoolean(); if (count == 2) return value;
            value.autoBuyWith = reader.readInt32(); if (count == 3) return value;
            value.targets = reader.readArray(reader => reader.readInt32()); if (count == 4) return value;
            value.minTickets = reader.readInt32(); if (count == 5) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionSixthBattleConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionSixthBattleConfig | null)[] | null {
        return reader.readArray(reader => MissionSixthBattleConfig.deserializeCore(reader));
    }
}
