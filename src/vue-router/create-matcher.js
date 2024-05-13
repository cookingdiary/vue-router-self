import { createRouteMap } from "./create-route-map";

export default function createMatcher(routes) {

    let { pathMap } = createRouteMap(routes);
    function addRoutes(routes) { //动态添加路由
        createRouteMap(routes, pathMap)
        console.log(pathMap);
    }
    function addRoute(route) {
        createRouteMap([route], pathMap)
    }
    function match(location) {
        return pathMap[location]
    }
    return {
        addRoutes,
        addRoute,
        match
    }
}