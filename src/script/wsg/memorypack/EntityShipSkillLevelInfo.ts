import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityAttr } from "./EntityAttr.js";

export class EntityShipSkillLevelInfo {
    id: number;
    attr: Map<string | null, number> | null;
    desc: string | null;

    constructor() {
        this.id = 0;
        this.attr = null;
        this.desc = null;

    }

    static serialize(value: EntityShipSkillLevelInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityShipSkillLevelInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeMap(value.attr, (writer, x) => writer.writeString(x), (writer, x) => writer.writeFloat64(x));
        writer.writeString(value.desc);

    }

    static serializeArray(value: (EntityShipSkillLevelInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityShipSkillLevelInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityShipSkillLevelInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityShipSkillLevelInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityShipSkillLevelInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityShipSkillLevelInfo();
        if (count == 3) {
            value.id = reader.readInt32();
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64());
            value.desc = reader.readString();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.attr = reader.readMap(reader => reader.readString(), reader => reader.readFloat64()); if (count == 2) return value;
            value.desc = reader.readString(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityShipSkillLevelInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityShipSkillLevelInfo | null)[] | null {
        return reader.readArray(reader => EntityShipSkillLevelInfo.deserializeCore(reader));
    }
}
