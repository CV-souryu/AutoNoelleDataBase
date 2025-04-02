import type { EntityMap } from "./memorypack/EntityMap";
import type { EntityMapNode } from "./memorypack/EntityMapNode";
import type { EntityMapNodeRouter } from "./memorypack/EntityMapNodeRouter";
import type { EntityMapNodeRouterInfo } from "./memorypack/EntityMapNodeRouterInfo";
import type { EntityShip } from "./memorypack/EntityShip";
import { RouteType } from "./memorypack/RouteType";
export type RouteInfo = {
    radarUpper: number[],
    speedUpper: number[],
    luckUpper: number[],
    levelCount: number,
    flagShipLevel: number,
    nodePass: number[]
}
export function CheckMapNodeRouteInfo(ships: EntityShip[], routeInjectValue: RouteInfo, mapNodeRouterInfo: EntityMapNodeRouterInfo) {
    switch (mapNodeRouterInfo.routeType) {
        case RouteType.None:
            return false
        case RouteType.LevelGe:
            return routeInjectValue.levelCount >= mapNodeRouterInfo.number;
        case RouteType.LevelLe:
            return routeInjectValue.levelCount <= mapNodeRouterInfo.number;
        case RouteType.ShipSumGe:
            return ships.length >= mapNodeRouterInfo.number
        case RouteType.ShipSumLe:
            return ships.length <= mapNodeRouterInfo.number
        case RouteType.ShipTypeGe:

            return ships.reduce((v, ship) => ship.shipType == mapNodeRouterInfo.shipType ? (v + 1) : v, 0) >= mapNodeRouterInfo.number
        case RouteType.ShipTypeLe:
            return ships.reduce((v, ship) => ship.shipType == mapNodeRouterInfo.shipType ? (v + 1) : v, 0) <= mapNodeRouterInfo.number
        case RouteType.FlagShipLevelGe:
            return routeInjectValue.flagShipLevel >= mapNodeRouterInfo.number
        case RouteType.FlagShipLevelLe:
            return routeInjectValue.flagShipLevel <= mapNodeRouterInfo.number
        case RouteType.FlagShipType:
            return ships[0]?.shipType == mapNodeRouterInfo.shipType
        case RouteType.SpyGe:
            return ships.reduce((v, ship, index) => (ship.attrMax?.get("Radar") || 0) + (routeInjectValue.radarUpper[index] || 0) + v, 0) >= mapNodeRouterInfo.number
        case RouteType.FlagShipSpeedGe:
            return ((ships[0]?.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[0] || 0)) >= mapNodeRouterInfo.number

        case RouteType.FlagShipSpeedLe:
            return ((ships[0]?.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[0] || 0)) <= mapNodeRouterInfo.number


        case RouteType.SpeedMinGe:
            return (ships.reduce((v, ship, index) => {
                const speed = (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0)
                return speed < v ? speed : v
            }, Number.MAX_VALUE)) >= mapNodeRouterInfo.number


        case RouteType.SpeedMinLe:

            return (ships.reduce((v, ship, index) => {
                const speed = (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0)
                return speed < v ? speed : v
            }, Number.MAX_VALUE)) <= mapNodeRouterInfo.number
        case RouteType.SpeedMaxGe:
            return (ships.reduce((v, ship, index) => {
                const speed = (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0)
                return speed > v ? speed : v
            }, 0)) >= mapNodeRouterInfo.number
        case RouteType.SpeedMaxLe:
            return (ships.reduce((v, ship, index) => {
                const speed = (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0)
                return speed > v ? speed : v
            }, 0)) <= mapNodeRouterInfo.number
        case RouteType.SpeedAvgGe:

            return (ships.reduce((v, ship, index) => (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0) + v, 0) / ships.length) >= mapNodeRouterInfo.number
        case RouteType.SpeedAvgLe:
            return (ships.reduce((v, ship, index) => (ship.attrMax?.get("Speed") || 0) + (routeInjectValue.speedUpper[index] || 0) + v, 0) / ships.length) <= mapNodeRouterInfo.number
        case RouteType.LuckyGe:
            return (ships.reduce((v, ship, index) => (ship.attrMax?.get("Luck") || 0) + (routeInjectValue.luckUpper[index] || 0) + v, 0)) >= mapNodeRouterInfo.number

        case RouteType.LuckyLe:
            return (ships.reduce((v, ship, index) => (ship.attrMax?.get("Luck") || 0) + (routeInjectValue.luckUpper[index] || 0) + v, 0)) <= mapNodeRouterInfo.number

    }
}
export function CheckMapNodeRoute(ships: EntityShip[], routeInjectValue: RouteInfo, mapNodeRouter: EntityMapNodeRouter) {
    const passCount = mapNodeRouter.conditions?.reduce((count, condition) => {

        if (condition && CheckMapNodeRouteInfo(ships, routeInjectValue, condition)) {

            count++

        }

        return count
    }, 0) || 0

    return passCount >= mapNodeRouter.passCount
}
export function CheckMapNode(ships: EntityShip[], routeInjectValue: RouteInfo, mapNodeId: number, mapNodes: EntityMapNode[], activeNode: number[],) {

    const mapNode = mapNodes.find(item => item.id == mapNodeId);

    if (!mapNode) return;
    if (activeNode.indexOf(mapNodeId) != -1) return;

    // mapNodes.splice(mapNodes.indexOf(mapNode),1)

    activeNode.push(mapNodeId)
    if (mapNode.nodeRouter) {
        const activeRoute = mapNode.nodeRouter
            .filter(route => {
                if (!route) return;
                if (route.missBy && route.missBy.size != 0 && route.missBy.values().toArray().filter(item => routeInjectValue.nodePass.indexOf(item) != -1).length == route.missBy.size) {
                    
                    return undefined
                }
                if (route.showBy && route.showBy.size != 0 && route.showBy.values().toArray().filter(item => routeInjectValue.nodePass.indexOf(item) != -1).length != route.showBy.size) {
                    return undefined
                }
                return route
            }).filter((element): element is Exclude<typeof element, null | undefined> => !!element)
        const nextNodes = activeRoute
            .filter(route => route && route.passCount != 0 && CheckMapNodeRoute(ships, routeInjectValue, route))
            .map(item => item?.id)
            .filter((element): element is Exclude<typeof element, null | undefined> => !!element)
            || []

        if (activeRoute.length != 0 && nextNodes.length == 0) {
            activeRoute.map(item => {
                if (!!item?.id) {
                    CheckMapNode(ships, routeInjectValue, item.id, mapNodes, activeNode)
                }
            })
        } else {
            if (nextNodes[0]) {
                CheckMapNode(ships, routeInjectValue, nextNodes[0], mapNodes, activeNode)
            }
        }

    }


}
export function CheckMap(ships: EntityShip[], routeInjectValue: RouteInfo, map: EntityMap) {
    console.log(arguments);
    
    const activeNodesId: number[] = []
    const mapNodes = map.nodes?.filter((element): element is Exclude<typeof element, null | undefined> => !!element) || []
    const startNode = mapNodes.find(item => item?.id == map.initNodeId)
    if (startNode && map.nodes) {

        CheckMapNode(ships, routeInjectValue, map.initNodeId, mapNodes, activeNodesId)
    }

    return activeNodesId;
}