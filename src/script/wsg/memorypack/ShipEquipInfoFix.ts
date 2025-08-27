import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipEquipInfo } from "./ShipEquipInfo.js";

export class ShipEquipInfoFix {
    shipEquipInfo: ShipEquipInfo | null;

    constructor() {
        this.shipEquipInfo = null;

    }

    static serialize(value: ShipEquipInfoFix | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipEquipInfoFix | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(1);
        ShipEquipInfo.serializeCore(writer, value.shipEquipInfo);

    }

    static serializeArray(value: (ShipEquipInfoFix | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipEquipInfoFix | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipEquipInfoFix.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipEquipInfoFix | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipEquipInfoFix | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipEquipInfoFix();
        if (count == 1) {
            value.shipEquipInfo = ShipEquipInfo.deserializeCore(reader);

        }
        else if (count > 1) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.shipEquipInfo = ShipEquipInfo.deserializeCore(reader); if (count == 1) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipEquipInfoFix | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipEquipInfoFix | null)[] | null {
        return reader.readArray(reader => ShipEquipInfoFix.deserializeCore(reader));
    }
}
