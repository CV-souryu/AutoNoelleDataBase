import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class ActiveGlobalConfig {
    enableDecompose: boolean;
    decomposeShipPipe: string[] | null;
    enableQuickRepair: boolean;
    repairInDay: number;

    constructor() {
        this.enableDecompose = false;
        this.decomposeShipPipe = null;
        this.enableQuickRepair = false;
        this.repairInDay = 0;

    }

    static serialize(value: ActiveGlobalConfig | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ActiveGlobalConfig | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeBoolean(value.enableDecompose);
        writer.writeArray(value.decomposeShipPipe, (writer, x) => writer.writeGuid(x));
        writer.writeBoolean(value.enableQuickRepair);
        writer.writeInt32(value.repairInDay);

    }

    static serializeArray(value: (ActiveGlobalConfig | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ActiveGlobalConfig | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ActiveGlobalConfig.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ActiveGlobalConfig | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ActiveGlobalConfig | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ActiveGlobalConfig();
        if (count == 4) {
            value.enableDecompose = reader.readBoolean();
            value.decomposeShipPipe = reader.readArray(reader => reader.readGuid());
            value.enableQuickRepair = reader.readBoolean();
            value.repairInDay = reader.readInt32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.enableDecompose = reader.readBoolean(); if (count == 1) return value;
            value.decomposeShipPipe = reader.readArray(reader => reader.readGuid()); if (count == 2) return value;
            value.enableQuickRepair = reader.readBoolean(); if (count == 3) return value;
            value.repairInDay = reader.readInt32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ActiveGlobalConfig | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ActiveGlobalConfig | null)[] | null {
        return reader.readArray(reader => ActiveGlobalConfig.deserializeCore(reader));
    }
}
