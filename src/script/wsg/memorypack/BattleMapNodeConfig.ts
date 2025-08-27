import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { TeamRangeInt } from "./TeamRangeInt.js";
import { RangeInt } from "./RangeInt.js";
import { BattleMapNodeBattleConfig } from "./BattleMapNodeBattleConfig.js";
import { BattleMapNodeFormationCheckConfig } from "./BattleMapNodeFormationCheckConfig.js";

export class BattleMapNodeConfig {
    isEndPoint: boolean;
    teamHPCondition: TeamRangeInt | null;
    battleConfig: BattleMapNodeBattleConfig | null;
    nodeBackConfig: BattleMapNodeFormationCheckConfig | null;
    nodeRoundConfig: BattleMapNodeFormationCheckConfig | null;

    constructor() {
        this.isEndPoint = false;
        this.teamHPCondition = null;
        this.battleConfig = null;
        this.nodeBackConfig = null;
        this.nodeRoundConfig = null;

    }

    static serialize(value: BattleMapNodeConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: BattleMapNodeConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(5);
        writer.writeBoolean(value.isEndPoint);
        TeamRangeInt.serializeCore(writer, value.teamHPCondition);
        BattleMapNodeBattleConfig.serializeCore(writer, value.battleConfig);
        BattleMapNodeFormationCheckConfig.serializeCore(writer, value.nodeBackConfig);
        BattleMapNodeFormationCheckConfig.serializeCore(writer, value.nodeRoundConfig);

    }

    static serializeArray(value: (BattleMapNodeConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (BattleMapNodeConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => BattleMapNodeConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): BattleMapNodeConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): BattleMapNodeConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new BattleMapNodeConfig();
        if (count == 5) {
            value.isEndPoint = reader.readBoolean();
            value.teamHPCondition = TeamRangeInt.deserializeCore(reader);
            value.battleConfig = BattleMapNodeBattleConfig.deserializeCore(reader);
            value.nodeBackConfig = BattleMapNodeFormationCheckConfig.deserializeCore(reader);
            value.nodeRoundConfig = BattleMapNodeFormationCheckConfig.deserializeCore(reader);

        }
        else if (count > 5) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.isEndPoint = reader.readBoolean(); if (count == 1) return value;
            value.teamHPCondition = TeamRangeInt.deserializeCore(reader); if (count == 2) return value;
            value.battleConfig = BattleMapNodeBattleConfig.deserializeCore(reader); if (count == 3) return value;
            value.nodeBackConfig = BattleMapNodeFormationCheckConfig.deserializeCore(reader); if (count == 4) return value;
            value.nodeRoundConfig = BattleMapNodeFormationCheckConfig.deserializeCore(reader); if (count == 5) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (BattleMapNodeConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (BattleMapNodeConfig | null)[] | null {
        return reader.readArray(reader => BattleMapNodeConfig.deserializeCore(reader));
    }
}
