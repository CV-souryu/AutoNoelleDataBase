import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipType } from "./ShipType.js";
import { IActiveStoreItem } from "./IActiveStoreItem.js";

export class ShipReadyPipe {
    id: string;
    name: string | null;
    description: string | null;
    shipType: ShipType;
    equipApply1: number[] | null;
    equipApply2: number[] | null;
    equipApply3: number[] | null;
    equipApply4: number[] | null;

    constructor() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = null;
        this.description = null;
        this.shipType = 0;
        this.equipApply1 = null;
        this.equipApply2 = null;
        this.equipApply3 = null;
        this.equipApply4 = null;

    }

    static serialize(value: ShipReadyPipe | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipReadyPipe | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(8);
        writer.writeGuid(value.id);
        writer.writeString(value.name);
        writer.writeString(value.description);
        writer.writeInt32(value.shipType);
        writer.writeArray(value.equipApply1, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.equipApply2, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.equipApply3, (writer, x) => writer.writeInt32(x));
        writer.writeArray(value.equipApply4, (writer, x) => writer.writeInt32(x));

    }

    static serializeArray(value: (ShipReadyPipe | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipReadyPipe | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipReadyPipe.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipReadyPipe | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipReadyPipe | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipReadyPipe();
        if (count == 8) {
            value.id = reader.readGuid();
            value.name = reader.readString();
            value.description = reader.readString();
            value.shipType = reader.readInt32();
            value.equipApply1 = reader.readArray(reader => reader.readInt32());
            value.equipApply2 = reader.readArray(reader => reader.readInt32());
            value.equipApply3 = reader.readArray(reader => reader.readInt32());
            value.equipApply4 = reader.readArray(reader => reader.readInt32());

        }
        else if (count > 8) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readGuid(); if (count == 1) return value;
            value.name = reader.readString(); if (count == 2) return value;
            value.description = reader.readString(); if (count == 3) return value;
            value.shipType = reader.readInt32(); if (count == 4) return value;
            value.equipApply1 = reader.readArray(reader => reader.readInt32()); if (count == 5) return value;
            value.equipApply2 = reader.readArray(reader => reader.readInt32()); if (count == 6) return value;
            value.equipApply3 = reader.readArray(reader => reader.readInt32()); if (count == 7) return value;
            value.equipApply4 = reader.readArray(reader => reader.readInt32()); if (count == 8) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipReadyPipe | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipReadyPipe | null)[] | null {
        return reader.readArray(reader => ShipReadyPipe.deserializeCore(reader));
    }
}
