
// Vue.component('router-view', 
export default {
    functional: true,
    render(h, { parent, data }) {
        //默认先渲染app.vue的router-views
        // return <a>{this.$scopedSlots.default()}</a>
        //只是为了渲染，而且不记录父子关系
        data.routerView = true;
        let route = parent.$route;
        console.log('route', route);
        let depth = 0;
        //_vnode 代表的是渲染组件的虚拟节点，组件内的渲染 $vnode代表的是组件本身，包含_vnode的
        while (parent) {
            // console.log('parent', parent.$vnode.routerView);
            if (parent.$vnode && parent.$vnode.data.routerView) {
                depth++;
            }
            parent = parent.$parent
        }
        let record = route.matched[depth]
        if (!record) {
            return h()
        }
        return h(record.component, data)
    }
}