import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class TrackBattleRewardInfo {
    shipId: number;
    battlePoint: number;
    battleResult: number;
    count: bigint;

    constructor() {
        this.shipId = 0;
        this.battlePoint = 0;
        this.battleResult = 0;
        this.count = 0n;

    }

    static serialize(value: TrackBattleRewardInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: TrackBattleRewardInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeInt32(value.shipId);
        writer.writeInt32(value.battlePoint);
        writer.writeInt32(value.battleResult);
        writer.writeUint64(value.count);

    }

    static serializeArray(value: (TrackBattleRewardInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (TrackBattleRewardInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => TrackBattleRewardInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): TrackBattleRewardInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): TrackBattleRewardInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new TrackBattleRewardInfo();
        if (count == 4) {
            value.shipId = reader.readInt32();
            value.battlePoint = reader.readInt32();
            value.battleResult = reader.readInt32();
            value.count = reader.readUint64();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.shipId = reader.readInt32(); if (count == 1) return value;
            value.battlePoint = reader.readInt32(); if (count == 2) return value;
            value.battleResult = reader.readInt32(); if (count == 3) return value;
            value.count = reader.readUint64(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (TrackBattleRewardInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (TrackBattleRewardInfo | null)[] | null {
        return reader.readArray(reader => TrackBattleRewardInfo.deserializeCore(reader));
    }
}
