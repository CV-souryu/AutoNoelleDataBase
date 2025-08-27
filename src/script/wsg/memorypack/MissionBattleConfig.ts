import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { BattleMission } from "./BattleMission.js";

export class MissionBattleConfig {
    activeBattle: (BattleMission | null)[] | null;
    allowDailyRestart: boolean;

    constructor() {
        this.activeBattle = null;
        this.allowDailyRestart = false;

    }

    static serialize(value: MissionBattleConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionBattleConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeArray(value.activeBattle, (writer, x) => BattleMission.serializeCore(writer, x));
        writer.writeBoolean(value.allowDailyRestart);

    }

    static serializeArray(value: (MissionBattleConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionBattleConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionBattleConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionBattleConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionBattleConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionBattleConfig();
        if (count == 2) {
            value.activeBattle = reader.readArray(reader => BattleMission.deserializeCore(reader));
            value.allowDailyRestart = reader.readBoolean();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.activeBattle = reader.readArray(reader => BattleMission.deserializeCore(reader)); if (count == 1) return value;
            value.allowDailyRestart = reader.readBoolean(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionBattleConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionBattleConfig | null)[] | null {
        return reader.readArray(reader => MissionBattleConfig.deserializeCore(reader));
    }
}
