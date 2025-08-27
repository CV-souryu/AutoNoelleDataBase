import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class FourBaseAttrFloat {
    atk: number;
    torpedo: number;
    def: number;
    airDef: number;

    constructor() {
        this.atk = 0;
        this.torpedo = 0;
        this.def = 0;
        this.airDef = 0;

    }

    static serialize(value: FourBaseAttrFloat | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: FourBaseAttrFloat | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeFloat32(value.atk);
        writer.writeFloat32(value.torpedo);
        writer.writeFloat32(value.def);
        writer.writeFloat32(value.airDef);

    }

    static serializeArray(value: (FourBaseAttrFloat | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (FourBaseAttrFloat | null)[] | null): void {
        writer.writeArray(value, (writer, x) => FourBaseAttrFloat.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): FourBaseAttrFloat | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): FourBaseAttrFloat | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new FourBaseAttrFloat();
        if (count == 4) {
            value.atk = reader.readFloat32();
            value.torpedo = reader.readFloat32();
            value.def = reader.readFloat32();
            value.airDef = reader.readFloat32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.atk = reader.readFloat32(); if (count == 1) return value;
            value.torpedo = reader.readFloat32(); if (count == 2) return value;
            value.def = reader.readFloat32(); if (count == 3) return value;
            value.airDef = reader.readFloat32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (FourBaseAttrFloat | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (FourBaseAttrFloat | null)[] | null {
        return reader.readArray(reader => FourBaseAttrFloat.deserializeCore(reader));
    }
}
