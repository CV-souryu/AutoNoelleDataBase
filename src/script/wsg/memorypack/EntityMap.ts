import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { MapType } from "./MapType.js";
import { EntityMapNode } from "./EntityMapNode.js";

export class EntityMap {
    id: number;
    title: string | null;
    mapType: MapType;
    initNodeId: number;
    nodes: (EntityMapNode | null)[] | null;
    mapName: string | null;

    constructor() {
        this.id = 0;
        this.title = null;
        this.mapType = 0;
        this.initNodeId = 0;
        this.nodes = null;
        this.mapName = null;

    }

    static serialize(value: EntityMap | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityMap | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(6);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeInt32(value.mapType);
        writer.writeInt32(value.initNodeId);
        writer.writeArray(value.nodes, (writer, x) => EntityMapNode.serializeCore(writer, x));
        writer.writeString(value.mapName);

    }

    static serializeArray(value: (EntityMap | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityMap | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityMap.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityMap | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityMap | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityMap();
        if (count == 6) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.mapType = reader.readInt32();
            value.initNodeId = reader.readInt32();
            value.nodes = reader.readArray(reader => EntityMapNode.deserializeCore(reader));
            value.mapName = reader.readString();

        }
        else if (count > 6) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.mapType = reader.readInt32(); if (count == 3) return value;
            value.initNodeId = reader.readInt32(); if (count == 4) return value;
            value.nodes = reader.readArray(reader => EntityMapNode.deserializeCore(reader)); if (count == 5) return value;
            value.mapName = reader.readString(); if (count == 6) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityMap | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityMap | null)[] | null {
        return reader.readArray(reader => EntityMap.deserializeCore(reader));
    }
}
