import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class FourBaseItemFloat {
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

    static serialize(value: FourBaseItemFloat | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: FourBaseItemFloat | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeFloat32(value.fuel);
        writer.writeFloat32(value.ammo);
        writer.writeFloat32(value.steel);
        writer.writeFloat32(value.aluminum);

    }

    static serializeArray(value: (FourBaseItemFloat | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (FourBaseItemFloat | null)[] | null): void {
        writer.writeArray(value, (writer, x) => FourBaseItemFloat.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): FourBaseItemFloat | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): FourBaseItemFloat | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new FourBaseItemFloat();
        if (count == 4) {
            value.fuel = reader.readFloat32();
            value.ammo = reader.readFloat32();
            value.steel = reader.readFloat32();
            value.aluminum = reader.readFloat32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.fuel = reader.readFloat32(); if (count == 1) return value;
            value.ammo = reader.readFloat32(); if (count == 2) return value;
            value.steel = reader.readFloat32(); if (count == 3) return value;
            value.aluminum = reader.readFloat32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (FourBaseItemFloat | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (FourBaseItemFloat | null)[] | null {
        return reader.readArray(reader => FourBaseItemFloat.deserializeCore(reader));
    }
}
