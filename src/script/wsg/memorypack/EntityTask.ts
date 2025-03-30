import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { TaskType } from "./TaskType.js";
import { ItemCount } from "./ItemCount.js";

export class EntityTask {
    id: number;
    title: string | null;
    targetCount: number;
    taskType: TaskType;
    awards: (ItemCount | null)[] | null;

    constructor() {
        this.id = 0;
        this.title = null;
        this.targetCount = 0;
        this.taskType = 0;
        this.awards = null;

    }

    static serialize(value: EntityTask | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: EntityTask | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(5);
        writer.writeInt32(value.id);
        writer.writeString(value.title);
        writer.writeInt32(value.targetCount);
        writer.writeInt32(value.taskType);
        writer.writeArray(value.awards, (writer, x) => ItemCount.serializeCore(writer, x));

    }

    static serializeArray(value: (EntityTask | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (EntityTask | null)[] | null): void {
        writer.writeArray(value, (writer, x) => EntityTask.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): EntityTask | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): EntityTask | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new EntityTask();
        if (count == 5) {
            value.id = reader.readInt32();
            value.title = reader.readString();
            value.targetCount = reader.readInt32();
            value.taskType = reader.readInt32();
            value.awards = reader.readArray(reader => ItemCount.deserializeCore(reader));

        }
        else if (count > 5) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readInt32(); if (count == 1) return value;
            value.title = reader.readString(); if (count == 2) return value;
            value.targetCount = reader.readInt32(); if (count == 3) return value;
            value.taskType = reader.readInt32(); if (count == 4) return value;
            value.awards = reader.readArray(reader => ItemCount.deserializeCore(reader)); if (count == 5) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (EntityTask | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (EntityTask | null)[] | null {
        return reader.readArray(reader => EntityTask.deserializeCore(reader));
    }
}
