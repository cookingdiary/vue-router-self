export function createRouteMap(routes, pathMap) { //根据用户选项扁平化路由信息
    pathMap = pathMap || {};
    routes.forEach(route => {
        addRouteRecord(route, pathMap)
    })
    return {
        pathMap
    }
}
export function addRouteRecord(route, pathMap, parentRecord) {

    let path = parentRecord ? `${parentRecord.path === '/' ? '/' : `${parentRecord.path}/`}${route.path}` : route.path;
    let record = {
        path,
        component: route.component,
        props: route.props,
        meta: route.meta,
    }
    if (!pathMap[path]) {
        //维护路径对应属性
        pathMap[path] = record;
    }
    route.children && route.children.forEach(childRoute => {
        addRouteRecord(childRoute, pathMap, record);
    })
}