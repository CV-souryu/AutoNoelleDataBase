import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { IActiveStoreItem } from "./IActiveStoreItem.js";
import { TeamRangeInt } from "./TeamRangeInt.js";
import { RangeInt } from "./RangeInt.js";
import { BattleMapNodeConfig } from "./BattleMapNodeConfig.js";

export class BattleMapConfig {
    id: string;
    name: string | null;
    description: string | null;
    mapInitNodeId: number;
    teamHPCondition: TeamRangeInt | null;
    nodeConfigs: Map<number, BattleMapNodeConfig | null> | null;

    constructor() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = null;
        this.description = null;
        this.mapInitNodeId = 0;
        this.teamHPCondition = null;
        this.nodeConfigs = null;

    }

    static serialize(value: BattleMapConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: BattleMapConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(6);
        writer.writeGuid(value.id);
        writer.writeString(value.name);
        writer.writeString(value.description);
        writer.writeInt32(value.mapInitNodeId);
        TeamRangeInt.serializeCore(writer, value.teamHPCondition);
        writer.writeMap(value.nodeConfigs, (writer, x) => writer.writeInt32(x), (writer, x) => BattleMapNodeConfig.serializeCore(writer, x));

    }

    static serializeArray(value: (BattleMapConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (BattleMapConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => BattleMapConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): BattleMapConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): BattleMapConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new BattleMapConfig();
        if (count == 6) {
            value.id = reader.readGuid();
            value.name = reader.readString();
            value.description = reader.readString();
            value.mapInitNodeId = reader.readInt32();
            value.teamHPCondition = TeamRangeInt.deserializeCore(reader);
            value.nodeConfigs = reader.readMap(reader => reader.readInt32(), reader => BattleMapNodeConfig.deserializeCore(reader));

        }
        else if (count > 6) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readGuid(); if (count == 1) return value;
            value.name = reader.readString(); if (count == 2) return value;
            value.description = reader.readString(); if (count == 3) return value;
            value.mapInitNodeId = reader.readInt32(); if (count == 4) return value;
            value.teamHPCondition = TeamRangeInt.deserializeCore(reader); if (count == 5) return value;
            value.nodeConfigs = reader.readMap(reader => reader.readInt32(), reader => BattleMapNodeConfig.deserializeCore(reader)); if (count == 6) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (BattleMapConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (BattleMapConfig | null)[] | null {
        return reader.readArray(reader => BattleMapConfig.deserializeCore(reader));
    }
}
