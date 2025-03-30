import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityShipSkillLevelInfo } from "./EntityShipSkillLevelInfo.js";

export class EntityShipSkill {
    id: number;
    title: string | null;
    skillLevelInfos: Map<number, EntityShipSkillLevelInfo | null> | null;

    constructor() {
        this.id = 0;
        this.title = null;
        this.skillLevelInfos = null;

    }

    static serialize(value: EntityShipSkill | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityShipSkill | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeMap(value.skillLevelInfos, (writer, x) => writer.writeInt32(x), (writer, x) => EntityShipSkillLevelInfo.serializeCore(writer, x));

    }

    static serializeArray(value: (EntityShipSkill | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityShipSkill | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityShipSkill.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityShipSkill | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityShipSkill | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityShipSkill();
        if (count == 3) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.skillLevelInfos = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkillLevelInfo.deserializeCore(reader));

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.skillLevelInfos = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkillLevelInfo.deserializeCore(reader)); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityShipSkill | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityShipSkill | null)[] | null {
        return reader.readArray(reader => EntityShipSkill.deserializeCore(reader));
    }
}
