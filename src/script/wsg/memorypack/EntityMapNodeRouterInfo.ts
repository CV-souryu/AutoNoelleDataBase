import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { ShipType } from "./ShipType.js";
import { RouteType } from "./RouteType.js";

export class EntityMapNodeRouterInfo {
    number: number;
    shipType: ShipType;
    routeType: RouteType;

    constructor() {
        this.number = 0;
        this.shipType = 0;
        this.routeType = 0;

    }

    static serialize(value: EntityMapNodeRouterInfo | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityMapNodeRouterInfo | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeFloat32(value.number);
        writer.writeInt32(value.shipType);
        writer.writeInt32(value.routeType);

    }

    static serializeArray(value: (EntityMapNodeRouterInfo | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityMapNodeRouterInfo | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityMapNodeRouterInfo.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityMapNodeRouterInfo | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityMapNodeRouterInfo | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityMapNodeRouterInfo();
        if (count == 3) {
            value.number = reader.readFloat32();
            value.shipType = reader.readInt32();
            value.routeType = reader.readInt32();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.number = reader.readFloat32(); if (count == 1) return value;
            value.shipType = reader.readInt32(); if (count == 2) return value;
            value.routeType = reader.readInt32(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityMapNodeRouterInfo | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityMapNodeRouterInfo | null)[] | null {
        return reader.readArray(reader => EntityMapNodeRouterInfo.deserializeCore(reader));
    }
}
