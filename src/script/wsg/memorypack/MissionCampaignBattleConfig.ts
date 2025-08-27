import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { MissionCampaignBattleConfigTask } from "./MissionCampaignBattleConfigTask.js";

export class MissionCampaignBattleConfig {
    campaignTasks: (MissionCampaignBattleConfigTask | null)[] | null;
    dailyRestart: boolean;

    constructor() {
        this.campaignTasks = null;
        this.dailyRestart = false;

    }

    static serialize(value: MissionCampaignBattleConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: MissionCampaignBattleConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(2);
        writer.writeArray(value.campaignTasks, (writer, x) => MissionCampaignBattleConfigTask.serializeCore(writer, x));
        writer.writeBoolean(value.dailyRestart);

    }

    static serializeArray(value: (MissionCampaignBattleConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (MissionCampaignBattleConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => MissionCampaignBattleConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): MissionCampaignBattleConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): MissionCampaignBattleConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new MissionCampaignBattleConfig();
        if (count == 2) {
            value.campaignTasks = reader.readArray(reader => MissionCampaignBattleConfigTask.deserializeCore(reader));
            value.dailyRestart = reader.readBoolean();

        }
        else if (count > 2) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.campaignTasks = reader.readArray(reader => MissionCampaignBattleConfigTask.deserializeCore(reader)); if (count == 1) return value;
            value.dailyRestart = reader.readBoolean(); if (count == 2) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (MissionCampaignBattleConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (MissionCampaignBattleConfig | null)[] | null {
        return reader.readArray(reader => MissionCampaignBattleConfig.deserializeCore(reader));
    }
}
