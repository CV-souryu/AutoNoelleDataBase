import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class ShipStatistics {
    damage: number;
    kills: number;
    battleCount: number;
    missAttack: number;
    maneuverWin: number;
    repairCount: number;
    consumeOil: number;
    consumeBullet: number;
    consumeFe: number;
    consumeAl: number;
    marryTime: number;
    buildRareShip: number;
    medal: number[] | null;
    createTime: number;

    constructor() {
        this.damage = 0;
        this.kills = 0;
        this.battleCount = 0;
        this.missAttack = 0;
        this.maneuverWin = 0;
        this.repairCount = 0;
        this.consumeOil = 0;
        this.consumeBullet = 0;
        this.consumeFe = 0;
        this.consumeAl = 0;
        this.marryTime = 0;
        this.buildRareShip = 0;
        this.medal = null;
        this.createTime = 0;

    }

    static serialize(value: ShipStatistics | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipStatistics | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(14);
        writer.writeInt32(value.damage);
        writer.writeInt32(value.kills);
        writer.writeInt32(value.battleCount);
        writer.writeInt32(value.missAttack);
        writer.writeInt32(value.maneuverWin);
        writer.writeInt32(value.repairCount);
        writer.writeInt32(value.consumeOil);
        writer.writeInt32(value.consumeBullet);
        writer.writeInt32(value.consumeFe);
        writer.writeInt32(value.consumeAl);
        writer.writeInt32(value.marryTime);
        writer.writeInt32(value.buildRareShip);
        writer.writeArray(value.medal, (writer, x) => writer.writeInt32(x));
        writer.writeInt32(value.createTime);

    }

    static serializeArray(value: (ShipStatistics | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipStatistics | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipStatistics.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipStatistics | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipStatistics | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipStatistics();
        if (count == 14) {
            value.damage = reader.readInt32();
            value.kills = reader.readInt32();
            value.battleCount = reader.readInt32();
            value.missAttack = reader.readInt32();
            value.maneuverWin = reader.readInt32();
            value.repairCount = reader.readInt32();
            value.consumeOil = reader.readInt32();
            value.consumeBullet = reader.readInt32();
            value.consumeFe = reader.readInt32();
            value.consumeAl = reader.readInt32();
            value.marryTime = reader.readInt32();
            value.buildRareShip = reader.readInt32();
            value.medal = reader.readArray(reader => reader.readInt32());
            value.createTime = reader.readInt32();

        }
        else if (count > 14) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.damage = reader.readInt32(); if (count == 1) return value;
            value.kills = reader.readInt32(); if (count == 2) return value;
            value.battleCount = reader.readInt32(); if (count == 3) return value;
            value.missAttack = reader.readInt32(); if (count == 4) return value;
            value.maneuverWin = reader.readInt32(); if (count == 5) return value;
            value.repairCount = reader.readInt32(); if (count == 6) return value;
            value.consumeOil = reader.readInt32(); if (count == 7) return value;
            value.consumeBullet = reader.readInt32(); if (count == 8) return value;
            value.consumeFe = reader.readInt32(); if (count == 9) return value;
            value.consumeAl = reader.readInt32(); if (count == 10) return value;
            value.marryTime = reader.readInt32(); if (count == 11) return value;
            value.buildRareShip = reader.readInt32(); if (count == 12) return value;
            value.medal = reader.readArray(reader => reader.readInt32()); if (count == 13) return value;
            value.createTime = reader.readInt32(); if (count == 14) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipStatistics | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipStatistics | null)[] | null {
        return reader.readArray(reader => ShipStatistics.deserializeCore(reader));
    }
}
