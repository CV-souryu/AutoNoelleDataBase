import { MemoryPackWriter } from "./MemoryPackWriter.js";
import { MemoryPackReader } from "./MemoryPackReader.js";
import { EntityExpedition } from "./EntityExpedition.js";
import { EntityItem } from "./EntityItem.js";
import { EntityError } from "./EntityError.js";
import { EntityShip } from "./EntityShip.js";
import { EntityMap } from "./EntityMap.js";
import { EntityEquip } from "./EntityEquip.js";
import { EntityFormation } from "./EntityFormation.js";
import { EntityShipSkill } from "./EntityShipSkill.js";
import { EntityTask } from "./EntityTask.js";
import { EntityShipRule } from "./EntityShipRule.js";
import { EntityCampaign } from "./EntityCampaign.js";
import { EntityCookBook } from "./EntityCookBook.js";

export class ANData {
    expeditions: Map<number, EntityExpedition | null> | null;
    items: Map<number, EntityItem | null> | null;
    errors: Map<number, EntityError | null> | null;
    ships: Map<number, EntityShip | null> | null;
    maps: Map<number, EntityMap | null> | null;
    equips: Map<number, EntityEquip | null> | null;
    protoCode: Map<string | null, number> | null;
    formations: Map<number, EntityFormation | null> | null;
    shipSkills: Map<number, EntityShipSkill | null> | null;
    tasks: Map<number, EntityTask | null> | null;
    versionInfo: Map<string | null, string | null> | null;
    activeRule: Map<number, EntityShipRule | null> | null;
    campaigns: Map<number, EntityCampaign | null> | null;
    cookBooks: Map<number, EntityCookBook | null> | null;
    shipsReleaseId: Set<number> | null;

    constructor() {
        this.expeditions = null;
        this.items = null;
        this.errors = null;
        this.ships = null;
        this.maps = null;
        this.equips = null;
        this.protoCode = null;
        this.formations = null;
        this.shipSkills = null;
        this.tasks = null;
        this.versionInfo = null;
        this.activeRule = null;
        this.campaigns = null;
        this.cookBooks = null;
        this.shipsReleaseId = null;

    }

    static serialize(value: ANData | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeCore(writer, value);
        return writer.toArray();
    }

    static serializeCore(writer: MemoryPackWriter, value: ANData | null): void {
        if (value == null) {
            writer.writeNullObjectHeader();
            return;
        }

        writer.writeObjectHeader(15);
        writer.writeMap(value.expeditions, (writer, x) => writer.writeInt32(x), (writer, x) => EntityExpedition.serializeCore(writer, x));
        writer.writeMap(value.items, (writer, x) => writer.writeInt32(x), (writer, x) => EntityItem.serializeCore(writer, x));
        writer.writeMap(value.errors, (writer, x) => writer.writeInt32(x), (writer, x) => EntityError.serializeCore(writer, x));
        writer.writeMap(value.ships, (writer, x) => writer.writeInt32(x), (writer, x) => EntityShip.serializeCore(writer, x));
        writer.writeMap(value.maps, (writer, x) => writer.writeInt32(x), (writer, x) => EntityMap.serializeCore(writer, x));
        writer.writeMap(value.equips, (writer, x) => writer.writeInt32(x), (writer, x) => EntityEquip.serializeCore(writer, x));
        writer.writeMap(value.protoCode, (writer, x) => writer.writeString(x), (writer, x) => writer.writeInt32(x));
        writer.writeMap(value.formations, (writer, x) => writer.writeInt32(x), (writer, x) => EntityFormation.serializeCore(writer, x));
        writer.writeMap(value.shipSkills, (writer, x) => writer.writeInt32(x), (writer, x) => EntityShipSkill.serializeCore(writer, x));
        writer.writeMap(value.tasks, (writer, x) => writer.writeInt32(x), (writer, x) => EntityTask.serializeCore(writer, x));
        writer.writeMap(value.versionInfo, (writer, x) => writer.writeString(x), (writer, x) => writer.writeString(x));
        writer.writeMap(value.activeRule, (writer, x) => writer.writeInt32(x), (writer, x) => EntityShipRule.serializeCore(writer, x));
        writer.writeMap(value.campaigns, (writer, x) => writer.writeInt32(x), (writer, x) => EntityCampaign.serializeCore(writer, x));
        writer.writeMap(value.cookBooks, (writer, x) => writer.writeInt32(x), (writer, x) => EntityCookBook.serializeCore(writer, x));
        writer.writeSet(value.shipsReleaseId, (writer, x) => writer.writeInt32(x));

    }

    static serializeArray(value: (ANData | null)[] | null): Uint8Array {
        const writer = MemoryPackWriter.getSharedInstance();
        this.serializeArrayCore(writer, value);
        return writer.toArray();
    }

    static serializeArrayCore(writer: MemoryPackWriter, value: (ANData | null)[] | null): void {
        writer.writeArray(value, (writer, x) => ANData.serializeCore(writer, x));
    }

    static deserialize(buffer: ArrayBuffer): ANData | null {
        return this.deserializeCore(new MemoryPackReader(buffer));
    }

    static deserializeCore(reader: MemoryPackReader): ANData | null {
        const [ok, count] = reader.tryReadObjectHeader();
        if (!ok) {
            return null;
        }

        const value = new ANData();
        if (count == 15) {
            value.expeditions = reader.readMap(reader => reader.readInt32(), reader => EntityExpedition.deserializeCore(reader));
            value.items = reader.readMap(reader => reader.readInt32(), reader => EntityItem.deserializeCore(reader));
            value.errors = reader.readMap(reader => reader.readInt32(), reader => EntityError.deserializeCore(reader));
            value.ships = reader.readMap(reader => reader.readInt32(), reader => EntityShip.deserializeCore(reader));
            value.maps = reader.readMap(reader => reader.readInt32(), reader => EntityMap.deserializeCore(reader));
            value.equips = reader.readMap(reader => reader.readInt32(), reader => EntityEquip.deserializeCore(reader));
            value.protoCode = reader.readMap(reader => reader.readString(), reader => reader.readInt32());
            value.formations = reader.readMap(reader => reader.readInt32(), reader => EntityFormation.deserializeCore(reader));
            value.shipSkills = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkill.deserializeCore(reader));
            value.tasks = reader.readMap(reader => reader.readInt32(), reader => EntityTask.deserializeCore(reader));
            value.versionInfo = reader.readMap(reader => reader.readString(), reader => reader.readString());
            value.activeRule = reader.readMap(reader => reader.readInt32(), reader => EntityShipRule.deserializeCore(reader));
            value.campaigns = reader.readMap(reader => reader.readInt32(), reader => EntityCampaign.deserializeCore(reader));
            value.cookBooks = reader.readMap(reader => reader.readInt32(), reader => EntityCookBook.deserializeCore(reader));
            value.shipsReleaseId = reader.readSet(reader => reader.readInt32());

        }
        else if (count > 15) {
            throw new Error("Current object's property count is larger than type schema, can't deserialize about versioning.");
        }
        else {
            if (count == 0) return value;
            value.expeditions = reader.readMap(reader => reader.readInt32(), reader => EntityExpedition.deserializeCore(reader)); if (count == 1) return value;
            value.items = reader.readMap(reader => reader.readInt32(), reader => EntityItem.deserializeCore(reader)); if (count == 2) return value;
            value.errors = reader.readMap(reader => reader.readInt32(), reader => EntityError.deserializeCore(reader)); if (count == 3) return value;
            value.ships = reader.readMap(reader => reader.readInt32(), reader => EntityShip.deserializeCore(reader)); if (count == 4) return value;
            value.maps = reader.readMap(reader => reader.readInt32(), reader => EntityMap.deserializeCore(reader)); if (count == 5) return value;
            value.equips = reader.readMap(reader => reader.readInt32(), reader => EntityEquip.deserializeCore(reader)); if (count == 6) return value;
            value.protoCode = reader.readMap(reader => reader.readString(), reader => reader.readInt32()); if (count == 7) return value;
            value.formations = reader.readMap(reader => reader.readInt32(), reader => EntityFormation.deserializeCore(reader)); if (count == 8) return value;
            value.shipSkills = reader.readMap(reader => reader.readInt32(), reader => EntityShipSkill.deserializeCore(reader)); if (count == 9) return value;
            value.tasks = reader.readMap(reader => reader.readInt32(), reader => EntityTask.deserializeCore(reader)); if (count == 10) return value;
            value.versionInfo = reader.readMap(reader => reader.readString(), reader => reader.readString()); if (count == 11) return value;
            value.activeRule = reader.readMap(reader => reader.readInt32(), reader => EntityShipRule.deserializeCore(reader)); if (count == 12) return value;
            value.campaigns = reader.readMap(reader => reader.readInt32(), reader => EntityCampaign.deserializeCore(reader)); if (count == 13) return value;
            value.cookBooks = reader.readMap(reader => reader.readInt32(), reader => EntityCookBook.deserializeCore(reader)); if (count == 14) return value;
            value.shipsReleaseId = reader.readSet(reader => reader.readInt32()); if (count == 15) return value;

        }
        return value;
    }

    static deserializeArray(buffer: ArrayBuffer): (ANData | null)[] | null {
        return this.deserializeArrayCore(new MemoryPackReader(buffer));
    }

    static deserializeArrayCore(reader: MemoryPackReader): (ANData | null)[] | null {
        return reader.readArray(reader => ANData.deserializeCore(reader));
    }
}
