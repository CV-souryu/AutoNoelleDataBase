import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityMapNodeRouterInfo } from "./EntityMapNodeRouterInfo.js";

export class EntityMapNodeRouter {
    conditions: (EntityMapNodeRouterInfo | null)[] | null;
    id: number;
    passCount: number;
    weight: number;
    showBy: Set<number> | null;
    missBy: Set<number> | null;

    constructor() {
        this.conditions = null;
        this.id = 0;
        this.passCount = 0;
        this.weight = 0;
        this.showBy = null;
        this.missBy = null;

    }

    static serialize(value: EntityMapNodeRouter | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityMapNodeRouter | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(6);
        writer.writeArray(value.conditions, (writer, x) => EntityMapNodeRouterInfo.serializeCore(writer, x));
        writer.writeInt32(value.id);
        writer.writeInt32(value.passCount);
        writer.writeFloat32(value.weight);
        writer.writeSet(value.showBy, (writer, x) => writer.writeInt32(x));
        writer.writeSet(value.missBy, (writer, x) => writer.writeInt32(x));

    }

    static serializeArray(value: (EntityMapNodeRouter | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityMapNodeRouter | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityMapNodeRouter.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityMapNodeRouter | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityMapNodeRouter | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityMapNodeRouter();
        if (count == 6) {
            value.conditions = reader.readArray(reader => EntityMapNodeRouterInfo.deserializeCore(reader));
            value.id = reader.readInt32();
            value.passCount = reader.readInt32();
            value.weight = reader.readFloat32();
            value.showBy = reader.readSet(reader => reader.readInt32());
            value.missBy = reader.readSet(reader => reader.readInt32());

        }
        else if (count > 6) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.conditions = reader.readArray(reader => EntityMapNodeRouterInfo.deserializeCore(reader)); if (count == 1) return value;
            value.id = reader.readInt32(); if (count == 2) return value;
            value.passCount = reader.readInt32(); if (count == 3) return value;
            value.weight = reader.readFloat32(); if (count == 4) return value;
            value.showBy = reader.readSet(reader => reader.readInt32()); if (count == 5) return value;
            value.missBy = reader.readSet(reader => reader.readInt32()); if (count == 6) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityMapNodeRouter | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityMapNodeRouter | null)[] | null {
        return reader.readArray(reader => EntityMapNodeRouter.deserializeCore(reader));
    }
}
