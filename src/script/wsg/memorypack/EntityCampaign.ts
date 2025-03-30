import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityItem } from "./EntityItem.js";

export class EntityCampaign {
    id: number;
    difficulty: boolean;
    product: EntityItem | null;

    constructor() {
        this.id = 0;
        this.difficulty = false;
        this.product = null;

    }

    static serialize(value: EntityCampaign | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityCampaign | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeInt32(value.id);
        writer.writeBoolean(value.difficulty);
        EntityItem.serializeCore(writer, value.product);

    }

    static serializeArray(value: (EntityCampaign | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityCampaign | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityCampaign.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityCampaign | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityCampaign | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityCampaign();
        if (count == 3) {
            value.id = reader.readInt32();
            value.difficulty = reader.readBoolean();
            value.product = EntityItem.deserializeCore(reader);

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.difficulty = reader.readBoolean(); if (count == 2) return value;
            value.product = EntityItem.deserializeCore(reader); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityCampaign | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityCampaign | null)[] | null {
        return reader.readArray(reader => EntityCampaign.deserializeCore(reader));
    }
}
