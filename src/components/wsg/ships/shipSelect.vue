<script setup lang="ts">
import { ANDataStore } from '@script/wsg/ANDataStore';
import { EntityShip } from '@script/wsg/memorypack/EntityShip';
import { computed, onMounted, ref, shallowRef } from 'vue';
import { Select, Button, Input } from "@opentiny/vue"
import { ShipTypeOption } from '@script/wsg/Options';
import { v4 as uuidv4 } from 'uuid';
type Team = {
    name: string,
    id: string,
    ships: number[]
}
const releaseShips = shallowRef<{
    label: string,
    value: number
}[]>([])



const TeamModel = defineModel<Team>("team")
// const teamsOptions=comp
const teams = ref<Team[]>([])


const teamsOptions = computed(() => {
    return teams.value.map(item => ({ label: item.name, value: item.id }))
})
const selectTeamKey = ref<string>()
const selectTeam = computed(() => {
    const key = selectTeamKey.value;
    let value = undefined;
    if (key) {
        value = teams.value.find(item => item.id == key)
    }

    TeamModel.value = value
    return value

})
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
const AddTeam = () => {
    teams.value = [...teams.value, { name: '未知队伍', ships: [], id: uuidv4(), }]
}
const DeleteTeam = (team: Team) => {
    teams.value = teams.value.filter(item => item != team)
    selectTeamKey.value = undefined
}
const SaveTeam=()=>{
    localStorage.setItem("TEAM_CACHE",JSON.stringify(teams.value))
}
onMounted(()=>{
    if (localStorage) {
    const cacheSTR = localStorage.getItem("TEAM_CACHE")
    if (cacheSTR) {
        try {

            teams.value = JSON.parse(cacheSTR)
        } catch {
            teams.value = []
        }
    }
}
})
</script>
<template>
    <div style="display: flex;">
        <Button @click="SaveTeam">保存</Button>
        <div>
            
            <Select placeholder="请选择队伍" :options="teamsOptions" v-model="selectTeamKey" optimization filterable
                clearable>
                <template #footer>
                    <Button @click="AddTeam">添加队伍</Button>
                </template>
            </Select>
        </div>
        <template v-if="selectTeam">

            <div>
                <Input placeholder="队伍名字" v-model="selectTeam.name" />
            </div>
            <div v-for="(val, index) in new Array<number>(6)">
                <Select :placeholder="(index + 1) + '位'" :options="releaseShips" optimization filterable clearable
                    v-model="selectTeam.ships[index]">
                </Select>
            </div>
            <div>
                <Button type="danger" @click="DeleteTeam(selectTeam)">删除队伍</Button>
            </div>
        </template>



    </div>


</template>
<style></style>