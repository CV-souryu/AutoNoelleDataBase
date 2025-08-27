import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class BattleMission {
    enable: boolean;
    autoRestartDaily: boolean;
    autoStopWithFishing: number;
    autoDecompose: boolean;
    battleConfigId: string;
    completeCount: number;
    completeCountTarget: number;
    name: string | null;
    teamId: number;
    teamChecker: string;
    teamCheckerContinue: boolean;

    constructor() {
        this.enable = false;
        this.autoRestartDaily = false;
        this.autoStopWithFishing = 0;
        this.autoDecompose = false;
        this.battleConfigId = "00000000-0000-0000-0000-000000000000";
        this.completeCount = 0;
        this.completeCountTarget = 0;
        this.name = null;
        this.teamId = 0;
        this.teamChecker = "00000000-0000-0000-0000-000000000000";
        this.teamCheckerContinue = false;

    }

    static serialize(value: BattleMission | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: BattleMission | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(11);
        writer.writeBoolean(value.enable);
        writer.writeBoolean(value.autoRestartDaily);
        writer.writeInt32(value.autoStopWithFishing);
        writer.writeBoolean(value.autoDecompose);
        writer.writeGuid(value.battleConfigId);
        writer.writeInt32(value.completeCount);
        writer.writeInt32(value.completeCountTarget);
        writer.writeString(value.name);
        writer.writeInt32(value.teamId);
        writer.writeGuid(value.teamChecker);
        writer.writeBoolean(value.teamCheckerContinue);

    }

    static serializeArray(value: (BattleMission | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (BattleMission | null)[] | null): void {
        writer.writeArray(value, (writer, x) => BattleMission.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): BattleMission | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): BattleMission | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new BattleMission();
        if (count == 11) {
            value.enable = reader.readBoolean();
            value.autoRestartDaily = reader.readBoolean();
            value.autoStopWithFishing = reader.readInt32();
            value.autoDecompose = reader.readBoolean();
            value.battleConfigId = reader.readGuid();
            value.completeCount = reader.readInt32();
            value.completeCountTarget = reader.readInt32();
            value.name = reader.readString();
            value.teamId = reader.readInt32();
            value.teamChecker = reader.readGuid();
            value.teamCheckerContinue = reader.readBoolean();

        }
        else if (count > 11) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.enable = reader.readBoolean(); if (count == 1) return value;
            value.autoRestartDaily = reader.readBoolean(); if (count == 2) return value;
            value.autoStopWithFishing = reader.readInt32(); if (count == 3) return value;
            value.autoDecompose = reader.readBoolean(); if (count == 4) return value;
            value.battleConfigId = reader.readGuid(); if (count == 5) return value;
            value.completeCount = reader.readInt32(); if (count == 6) return value;
            value.completeCountTarget = reader.readInt32(); if (count == 7) return value;
            value.name = reader.readString(); if (count == 8) return value;
            value.teamId = reader.readInt32(); if (count == 9) return value;
            value.teamChecker = reader.readGuid(); if (count == 10) return value;
            value.teamCheckerContinue = reader.readBoolean(); if (count == 11) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (BattleMission | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (BattleMission | null)[] | null {
        return reader.readArray(reader => BattleMission.deserializeCore(reader));
    }
}
