import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { NodeType } from "./NodeType.js";
import { PositionVector2 } from "./PositionVector2.js";
import { EntityMapBuff } from "./EntityMapBuff.js";
import { EntityMapNodeRouter } from "./EntityMapNodeRouter.js";
import { EntityFormation } from "./EntityFormation.js";

export class EntityMapNode {
    nodeType: NodeType;
    roundabout: boolean;
    nightAtk: boolean;
    id: number;
    flag: string | null;
    postion: PositionVector2 | null;
    buffs: (EntityMapBuff | null)[] | null;
    nodeRouter: (EntityMapNodeRouter | null)[] | null;
    formation: (EntityFormation | null)[] | null;

    constructor() {
        this.nodeType = 0;
        this.roundabout = false;
        this.nightAtk = false;
        this.id = 0;
        this.flag = null;
        this.postion = null;
        this.buffs = null;
        this.nodeRouter = null;
        this.formation = null;

    }

    static serialize(value: EntityMapNode | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityMapNode | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(9);
        writer.writeInt32(value.nodeType);
        writer.writeBoolean(value.roundabout);
        writer.writeBoolean(value.nightAtk);
        writer.writeInt32(value.id);
        writer.writeString(value.flag);
        PositionVector2.serializeCore(writer, value.postion);
        writer.writeArray(value.buffs, (writer, x) => EntityMapBuff.serializeCore(writer, x));
        writer.writeArray(value.nodeRouter, (writer, x) => EntityMapNodeRouter.serializeCore(writer, x));
        writer.writeArray(value.formation, (writer, x) => EntityFormation.serializeCore(writer, x));

    }

    static serializeArray(value: (EntityMapNode | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityMapNode | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityMapNode.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityMapNode | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityMapNode | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityMapNode();
        if (count == 9) {
            value.nodeType = reader.readInt32();
            value.roundabout = reader.readBoolean();
            value.nightAtk = reader.readBoolean();
            value.id = reader.readInt32();
            value.flag = reader.readString();
            value.postion = PositionVector2.deserializeCore(reader);
            value.buffs = reader.readArray(reader => EntityMapBuff.deserializeCore(reader));
            value.nodeRouter = reader.readArray(reader => EntityMapNodeRouter.deserializeCore(reader));
            value.formation = reader.readArray(reader => EntityFormation.deserializeCore(reader));

        }
        else if (count > 9) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.nodeType = reader.readInt32(); if (count == 1) return value;
            value.roundabout = reader.readBoolean(); if (count == 2) return value;
            value.nightAtk = reader.readBoolean(); if (count == 3) return value;
            value.id = reader.readInt32(); if (count == 4) return value;
            value.flag = reader.readString(); if (count == 5) return value;
            value.postion = PositionVector2.deserializeCore(reader); if (count == 6) return value;
            value.buffs = reader.readArray(reader => EntityMapBuff.deserializeCore(reader)); if (count == 7) return value;
            value.nodeRouter = reader.readArray(reader => EntityMapNodeRouter.deserializeCore(reader)); if (count == 8) return value;
            value.formation = reader.readArray(reader => EntityFormation.deserializeCore(reader)); if (count == 9) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityMapNode | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityMapNode | null)[] | null {
        return reader.readArray(reader => EntityMapNode.deserializeCore(reader));
    }
}
