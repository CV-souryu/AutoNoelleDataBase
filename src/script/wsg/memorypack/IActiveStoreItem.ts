import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";

export class IActiveStoreItem {
    id: string;
    name: string | null;
    description: string | null;

    constructor() {
        this.id = "00000000-0000-0000-0000-000000000000";
        this.name = null;
        this.description = null;

    }

    static serialize(value: IActiveStoreItem | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: IActiveStoreItem | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(3);
        writer.writeGuid(value.id);
        writer.writeString(value.name);
        writer.writeString(value.description);

    }

    static serializeArray(value: (IActiveStoreItem | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (IActiveStoreItem | null)[] | null): void {
        writer.writeArray(value, (writer, x) => IActiveStoreItem.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): IActiveStoreItem | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): IActiveStoreItem | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new IActiveStoreItem();
        if (count == 3) {
            value.id = reader.readGuid();
            value.name = reader.readString();
            value.description = reader.readString();

        }
        else if (count > 3) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.id = reader.readGuid(); if (count == 1) return value;
            value.name = reader.readString(); if (count == 2) return value;
            value.description = reader.readString(); if (count == 3) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (IActiveStoreItem | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (IActiveStoreItem | null)[] | null {
        return reader.readArray(reader => IActiveStoreItem.deserializeCore(reader));
    }
}
