import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class FourBaseItemInt {
    fuel: number;
    ammo: number;
    steel: number;
    aluminum: number;

    constructor() {
        this.fuel = 0;
        this.ammo = 0;
        this.steel = 0;
        this.aluminum = 0;

    }

    static serialize(value: FourBaseItemInt | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: FourBaseItemInt | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeInt32(value.fuel);
        writer.writeInt32(value.ammo);
        writer.writeInt32(value.steel);
        writer.writeInt32(value.aluminum);

    }

    static serializeArray(value: (FourBaseItemInt | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (FourBaseItemInt | null)[] | null): void {
        writer.writeArray(value, (writer, x) => FourBaseItemInt.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): FourBaseItemInt | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): FourBaseItemInt | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new FourBaseItemInt();
        if (count == 4) {
            value.fuel = reader.readInt32();
            value.ammo = reader.readInt32();
            value.steel = reader.readInt32();
            value.aluminum = reader.readInt32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.fuel = reader.readInt32(); if (count == 1) return value;
            value.ammo = reader.readInt32(); if (count == 2) return value;
            value.steel = reader.readInt32(); if (count == 3) return value;
            value.aluminum = reader.readInt32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (FourBaseItemInt | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (FourBaseItemInt | null)[] | null {
        return reader.readArray(reader => FourBaseItemInt.deserializeCore(reader));
    }
}
