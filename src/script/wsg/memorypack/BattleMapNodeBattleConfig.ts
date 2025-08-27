import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { BattleFormation } from "./BattleFormation.js";
import { BattleMapNodeFormationCheckConfig } from "./BattleMapNodeFormationCheckConfig.js";

export class BattleMapNodeBattleConfig {
    timeMin: number;
    timeOffset: number;
    battleFormation: BattleFormation;
    battleFormationCheck: Map<BattleFormation, BattleMapNodeFormationCheckConfig | null> | null;
    nightAtk: boolean;
    buffId: number;

    constructor() {
        this.timeMin = 0;
        this.timeOffset = 0;
        this.battleFormation = 0;
        this.battleFormationCheck = null;
        this.nightAtk = false;
        this.buffId = 0;

    }

    static serialize(value: BattleMapNodeBattleConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: BattleMapNodeBattleConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(6);
        writer.writeInt32(value.timeMin);
        writer.writeInt32(value.timeOffset);
        writer.writeInt32(value.battleFormation);
        writer.writeMap(value.battleFormationCheck, (writer, x) => writer.writeInt32(x), (writer, x) => BattleMapNodeFormationCheckConfig.serializeCore(writer, x));
        writer.writeBoolean(value.nightAtk);
        writer.writeInt32(value.buffId);

    }

    static serializeArray(value: (BattleMapNodeBattleConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (BattleMapNodeBattleConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => BattleMapNodeBattleConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): BattleMapNodeBattleConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): BattleMapNodeBattleConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new BattleMapNodeBattleConfig();
        if (count == 6) {
            value.timeMin = reader.readInt32();
            value.timeOffset = reader.readInt32();
            value.battleFormation = reader.readInt32();
            value.battleFormationCheck = reader.readMap(reader => reader.readInt32(), reader => BattleMapNodeFormationCheckConfig.deserializeCore(reader));
            value.nightAtk = reader.readBoolean();
            value.buffId = reader.readInt32();

        }
        else if (count > 6) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.timeMin = reader.readInt32(); if (count == 1) return value;
            value.timeOffset = reader.readInt32(); if (count == 2) return value;
            value.battleFormation = reader.readInt32(); if (count == 3) return value;
            value.battleFormationCheck = reader.readMap(reader => reader.readInt32(), reader => BattleMapNodeFormationCheckConfig.deserializeCore(reader)); if (count == 4) return value;
            value.nightAtk = reader.readBoolean(); if (count == 5) return value;
            value.buffId = reader.readInt32(); if (count == 6) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (BattleMapNodeBattleConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (BattleMapNodeBattleConfig | null)[] | null {
        return reader.readArray(reader => BattleMapNodeBattleConfig.deserializeCore(reader));
    }
}
