import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class FourBaseAttrInt {
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

    static serialize(value: FourBaseAttrInt | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: FourBaseAttrInt | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(4);
        writer.writeInt32(value.atk);
        writer.writeInt32(value.torpedo);
        writer.writeInt32(value.def);
        writer.writeInt32(value.airDef);

    }

    static serializeArray(value: (FourBaseAttrInt | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (FourBaseAttrInt | null)[] | null): void {
        writer.writeArray(value, (writer, x) => FourBaseAttrInt.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): FourBaseAttrInt | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): FourBaseAttrInt | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new FourBaseAttrInt();
        if (count == 4) {
            value.atk = reader.readInt32();
            value.torpedo = reader.readInt32();
            value.def = reader.readInt32();
            value.airDef = reader.readInt32();

        }
        else if (count > 4) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.atk = reader.readInt32(); if (count == 1) return value;
            value.torpedo = reader.readInt32(); if (count == 2) return value;
            value.def = reader.readInt32(); if (count == 3) return value;
            value.airDef = reader.readInt32(); if (count == 4) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (FourBaseAttrInt | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (FourBaseAttrInt | null)[] | null {
        return reader.readArray(reader => FourBaseAttrInt.deserializeCore(reader));
    }
}
