import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { BattleFormation } from "./BattleFormation.js";

export class MissionCampaignBattleConfigTask {
    count: number;
    id: number;
    formation: BattleFormation;

    constructor() {
        this.count = 0;
        this.id = 0;
        this.formation = 0;

    }

    static serialize(value: MissionCampaignBattleConfigTask | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionCampaignBattleConfigTask | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.count);
        writer.writeInt32(value.id);
        writer.writeInt32(value.formation);

    }

    static serializeArray(value: (MissionCampaignBattleConfigTask | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionCampaignBattleConfigTask | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionCampaignBattleConfigTask.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionCampaignBattleConfigTask | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionCampaignBattleConfigTask | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionCampaignBattleConfigTask();
        if (count == 3) {
            value.count = reader.readInt32();
            value.id = reader.readInt32();
            value.formation = reader.readInt32();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.count = reader.readInt32(); if (count == 1) return value;
            value.id = reader.readInt32(); if (count == 2) return value;
            value.formation = reader.readInt32(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionCampaignBattleConfigTask | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionCampaignBattleConfigTask | null)[] | null {
        return reader.readArray(reader => MissionCampaignBattleConfigTask.deserializeCore(reader));
    }
}
