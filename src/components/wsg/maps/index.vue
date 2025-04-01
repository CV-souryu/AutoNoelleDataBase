<script setup lang="ts">

import { ANDataStore } from "@script/wsg/ANDataStore";
import { defineComponent, h, markRaw, ref, shallowRef, watch } from "vue";
import '@vue-flow/core/dist/style.css';
import {
  VueFlow,
  Panel,
  type Node as FlowNode,
  type Edge as FlowEdge,
  type NodeProps as FlowNodeProp,
  MarkerType,
  BaseEdge,
} from "@vue-flow/core";
import type { EntityMap } from "@script/wsg/memorypack/EntityMap";
import type { EntityMapNode } from "@script/wsg/memorypack/EntityMapNode";
import FlowMapNode from './flowMapNode';
import type { EntityMapNodeRouter } from '@script/wsg/memorypack/EntityMapNodeRouter';
import type { EntityMapNodeRouterInfo } from '@script/wsg/memorypack/EntityMapNodeRouterInfo';
import { RouteTypeOption, ShipTypeOption } from '@script/wsg/Options';
import { FormatString as StringFormat } from '@script/String';
import FlowMapNodeEdgeLable from './flowMapNodeEdgeLable.vue';
import Multiselect from 'vue-multiselect'
import { Select } from "@opentiny/vue"

// console.log(import.meta.env);
// import { Container,Select} from "@opentiny/vue"
const FlowNodes = shallowRef<FlowNode<EntityMapNode>[]>([]);
const FlowEdges = shallowRef<FlowEdge[]>([]);
const MapOptions = shallowRef<EntityMap[]>([])
const SelectMap = shallowRef<EntityMap>()
const SelectMapNodePass = ref<number[]>([])
const SelectMapNodePassOptions = shallowRef<number[]>([])
const FormatNodeRoute = (route: EntityMapNodeRouter, weight: number,index:number) => {
  const result: string[] = []

  if (route.passCount != 0) {
    if (route.conditions) {
      const conditions = route.conditions.filter((element): element is Exclude<typeof element, null | undefined> => !!element).map(FormatNodeRouteInfo).join(";")
      result.push(`${route.passCount}=(${conditions})`)
    }
  }
  if (weight < 0) {
    result.push("0%")

  } else if (weight == 0) {
    result.push("100%")
  } else {
    result.push((route.weight * 100 / weight).toFixed(0) + "%")
  }
  if (route.missBy && route.missBy.size) {
    result.push(`击破(${route.missBy.values().toArray().map(item => ANDataStore.MapNodeTitle.get(item)).join(",")})隐藏`)
  }
  if (route.showBy && route.showBy.size) {
    result.push(`击破(${route.showBy.values().toArray().map(item => ANDataStore.MapNodeTitle.get(item)).join(",")})开启`)
  }

  return result
}
const FormatNodeRouteInfo = (routeInfo: EntityMapNodeRouterInfo) => {
  const routeDefine = RouteTypeOption.get(routeInfo.routeType);
  const shipDefine = ShipTypeOption.get(routeInfo.shipType)
  if (!!routeDefine) {
    return StringFormat(routeDefine, routeInfo.number, shipDefine)
  } else {
    return "?"
  }
}
const SetMapNode = (map: EntityMap) => {
  const mapNodes = map.nodes?.filter((element): element is Exclude<typeof element, null | undefined> => !!element);
  if (!mapNodes) return;
  const nodes = mapNodes.map<FlowNode<EntityMapNode>>((node) => {
    return {
      id: node.id.toString() || "UNKNOW",
      type: "map-node",
      position: { x: (node.postion?.x || 0), y: (node.postion?.y || 0) },
      data: node,
    };
  });
  FlowNodes.value = nodes;

}
const CheckRouteActive = (route: EntityMapNodeRouter, pass: number[]) => {
  if (route.missBy && route.missBy.size == 0 && route.showBy && route.showBy.size == 0) return true
  const miss = route.missBy && route.missBy.size != 0 && route.missBy.values().toArray().filter(item => pass.indexOf(item) == -1).length == 0
  const show = route.showBy && route.showBy.size != 0 && route.showBy.values().toArray().filter(item => pass.indexOf(item) == -1).length == 0
  console.log(route, miss, show);

  return !miss && show
}
const SetMapRoute = (map: EntityMap) => {
  const mapNodes = map.nodes?.filter((element): element is Exclude<typeof element, null | undefined> => !!element);
  if (!mapNodes) return;

  const routes: FlowEdge[] = []
  mapNodes.forEach(node => {
    if (!node.nodeRouter) return;

    const sum = node.nodeRouter.filter(route => route && CheckRouteActive(route, SelectMapNodePass.value)).reduce((value, current) => ((current?.weight || 0) + value), 0)
    node.nodeRouter.forEach((route,index) => {
      if (!route) return;
      let label = FormatNodeRoute(route, sum,index)
      // let active = true
      let color = "#FFFFFF"
      let opacity = 1

      if (route.missBy && route.missBy.size != 0) {
        const miss = route.missBy.values().toArray().filter(item => SelectMapNodePass.value.indexOf(item) == -1).length == 0
        color = "#F66"
        if (miss) {
          opacity = 0.2
          label = FormatNodeRoute(route, -1)
        }
        // console.log(miss);
        // if(miss){

        // }
        // active = !miss
      }
      if (route.showBy && route.showBy.size != 0) {
        const show = route.showBy.values().toArray().filter(item => SelectMapNodePass.value.indexOf(item) == -1).length == 0
        color = "#6F6"
        if (!show) {
          opacity = 0.2
          label = FormatNodeRoute(route, -1)

        }
        // active = show
      }
      routes.push({
        id: `${node.id.toString()}-${route.id.toString()}` || "UNKNOW",
        source: node.id.toString() || "UNKNOW",
        target: route.id.toString() || "UNKNOW",
        animated: true,
        label: () => h(FlowMapNodeEdgeLable, { label: label }),
        labelStyle: {
          fontSize: 8
          // fill:"#FFFFFF",
          // background:"#FFFFFF",
          // whiteSpace:"pre"
        },
        type: 'straight',
        style: {
          opacity: opacity,
          stroke: color,
          strokeDasharray: "4,1"

        },
        labelBgStyle: {
          fill: "#FFFC",
          // width:0,
          // height:0

        }

      })

    })
  })
  // console.log(routes);
  FlowEdges.value = routes;
}
const SetMapNodePassOptions = (map: EntityMap) => {
  const targetNode = new Set(map.nodes?.map(item => item?.nodeRouter).flat().map(route => [...route?.missBy?.values().toArray() || [], ...route?.showBy?.values().toArray() || []]).flat()).values().toArray()
  SelectMapNodePassOptions.value = targetNode
}
const SetMap = (map: EntityMap) => {
  // return;
  SetMapNode(map);
  SetMapRoute(map);
  SetMapNodePassOptions(map);

};
ANDataStore.Reload().then((data) => {
  if (data?.maps) {
    MapOptions.value = data?.maps.values().filter((element): element is Exclude<typeof element, null | undefined> => !!element).toArray() || []
    // const map = data.maps.get(90401);
    // if (map) {
    //   SetMap(map);
    // }
    // // data.maps.keys().map()
    // console.log();

    // const map= Object.values()[20]
  }
});
watch(SelectMap, () => {
  if (SelectMap.value) {
    SetMap(SelectMap.value)

  }
})
watch(SelectMapNodePass, () => {
  if (SelectMapNodePass.value) {
    if (SelectMap.value) {
      SetMapRoute(SelectMap.value)

    }
  }
})
</script>
<template>
  <!-- <Container :pattern="'simple'">
    <template #aside>
        <Select ></Select>
      </template>

</Container> -->
  <div style="width: 100vw;height: 100vh;">
    <VueFlow style="background-color: rgb(36,54,69);color: white;" :nodes="FlowNodes" :edges="FlowEdges">
      <template #node-map-node="props">
        <FlowMapNode :data="props.data"></FlowMapNode>
      </template>


    </VueFlow>
    <div style="position: absolute;left: 0;top: 0;background: #FF0;">
      <Multiselect :options="MapOptions" :custom-label="(i: EntityMap) => i.mapName" v-model="SelectMap"></Multiselect>
      <Multiselect :multiple="true" :custom-label="(i: number) => ANDataStore.MapNodeTitle.get(i) || '?'"
        v-model="SelectMapNodePass" v-if="!!SelectMapNodePassOptions && SelectMapNodePassOptions.length > 0"
        :options="SelectMapNodePassOptions"></Multiselect>
    </div>

  </div>

</template>
<style>
@import "vue-multiselect/dist/vue-multiselect.min.css";
</style>