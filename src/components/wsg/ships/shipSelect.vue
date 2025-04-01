<script setup lang="ts">
import { ANDataStore } from '@script/wsg/ANDataStore';
import { EntityShip } from '@script/wsg/memorypack/EntityShip';
import { ref, shallowRef } from 'vue';
import { Select } from "@opentiny/vue"
import { ShipTypeOption } from '@script/wsg/Options';
const releaseShips = shallowRef<{
    label: string,
    value: number
}[]>([])
const SelectShips = ref<number[]>([])
ANDataStore.Reload().then(data => {
    if (!data) return;
    if (data.ships && data.shipsReleaseId) {
        const options = data.shipsReleaseId?.values().toArray().map(id => data.ships?.get(id))
            .filter((element): element is Exclude<typeof element, null | undefined> => !!element)
            .map(ship => ({
                label: `${ShipTypeOption.get(ship.shipType)}:${ship.title}${ship.evoClass ? "-改" : ""}(${ship.shipIndex})`,
                value: ship.id
            }))

        releaseShips.value = options
    }
    // const ddd = data?.ships?.values().toArray() || [];
    // // console.log(ddd);

    // releaseShips.value = options
})
</script>
<template>
    <div style="display: flex;">
        <div v-for="(val, index) in new Array<number>(6)">
            <Select :options="releaseShips" optimization filterable v-model="SelectShips[index]">
                <template #footer>
      <div class="select-footer">
        123
      </div>
    </template>
            </Select>
        </div>

    </div>


</template>
<style>
@import "vue-multiselect/dist/vue-multiselect.min.css";
</style>