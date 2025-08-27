import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipInfo } from "./ShipInfo.js";
import { ShipEquipInfoFix } from "./ShipEquipInfoFix.js";
import { EntityAttr } from "./EntityAttr.js";

export class ShipInfoFix {
    shipInfo: ShipInfo | null;
    equips: (ShipEquipInfoFix | null)[] | null;
    attr: Map<string | null, number> | null;

    constructor() {
        this.shipInfo = null;
        this.equips = null;
        this.attr = null;

    }

    static serialize(value: ShipInfoFix | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ShipInfoFix | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        ShipInfo.serializeCore(writer, value.shipInfo);
        writer.writeArray(value.equips, (writer, x) => ShipEquipInfoFix.serializeCore(writer, x));
        writer.writeMap(value.attr, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));

    }

    static serializeArray(value: (ShipInfoFix | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ShipInfoFix | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ShipInfoFix.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ShipInfoFix | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ShipInfoFix | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ShipInfoFix();
        if (count == 3) {
            value.shipInfo = ShipInfo.deserializeCore(reader);
            value.equips = reader.readArray(reader => ShipEquipInfoFix.deserializeCore(reader));
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.shipInfo = ShipInfo.deserializeCore(reader); if (count == 1) return value;
            value.equips = reader.readArray(reader => ShipEquipInfoFix.deserializeCore(reader)); if (count == 2) return value;
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ShipInfoFix | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ShipInfoFix | null)[] | null {
        return reader.readArray(reader => ShipInfoFix.deserializeCore(reader));
    }
}
