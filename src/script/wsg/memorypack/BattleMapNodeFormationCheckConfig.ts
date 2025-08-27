import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityMapNodeRouterInfo } from "./EntityMapNodeRouterInfo.js";

export class BattleMapNodeFormationCheckConfig {
    passCount: number;
    conditions: (EntityMapNodeRouterInfo | null)[] | null;

    constructor() {
        this.passCount = 0;
        this.conditions = null;

    }

    static serialize(value: BattleMapNodeFormationCheckConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: BattleMapNodeFormationCheckConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeInt32(value.passCount);
        writer.writeArray(value.conditions, (writer, x) => EntityMapNodeRouterInfo.serializeCore(writer, x));

    }

    static serializeArray(value: (BattleMapNodeFormationCheckConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (BattleMapNodeFormationCheckConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => BattleMapNodeFormationCheckConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): BattleMapNodeFormationCheckConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): BattleMapNodeFormationCheckConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new BattleMapNodeFormationCheckConfig();
        if (count == 2) {
            value.passCount = reader.readInt32();
            value.conditions = reader.readArray(reader => EntityMapNodeRouterInfo.deserializeCore(reader));

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.passCount = reader.readInt32(); if (count == 1) return value;
            value.conditions = reader.readArray(reader => EntityMapNodeRouterInfo.deserializeCore(reader)); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (BattleMapNodeFormationCheckConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (BattleMapNodeFormationCheckConfig | null)[] | null {
        return reader.readArray(reader => BattleMapNodeFormationCheckConfig.deserializeCore(reader));
    }
}
