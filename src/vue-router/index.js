import createMatcher from "./create-matcher";
import HashHistory from "./history/hash";
import BrowerHistory from "./history/history";

import install, { Vue } from "./install";
// export let Vue



class VueRouter {
    constructor(options) {

        let routes = options.routes || [];
        this.beforeEachHooks = [];
        //变成映射表，方便后续的匹配操作 可以匹配也可以添加新的路由
        this.matcher = createMatcher(routes);

        let mode = options.mode || 'hash';
        if (mode === 'hash') {
            this.history = new HashHistory(this);
        } else if (mode === 'history') {
            this.history = new BrowerHistory(this);
        }
    }
    match(location) {
        return this.matcher.match(location);
    }
    push(location) {
        return this.history.push(location);

    }
    beforeEach(cb) {
        this.beforeEachHooks.push(cb);
    }
    init(app) {
        let history = this.history;
        //匹配对应组件渲染，路径变化了更新试图。响应式

        history.transitionTo(history.getCurrentLoaction(), () => {
            history.setupListener()//监听路由变化
        }) //跳转到默认地址并监听

        history.listen((newRoute) => { //更新下划线route的值，使它能够发生变化。
            app._route = newRoute;
        })
    }

}
//为什么要多发明一个install方法，因为如果用户导出一个类？ 在类上写install方法，会优先调用。
VueRouter.install = install;
export default VueRouter