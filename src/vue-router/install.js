// import routerLink from "./components/router-link";
import routerLink from "./components/router-link";
import routerView from "./components/router-view";

export let Vue;
function install(_Vue) {
    Vue = _Vue;
    console.log('install');
    //将注入的router共享给每个组件，
    //？？ 为什么不直接挂载原型上，因为直接挂载创建多个实例也可以拿到。这是不对的。
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                this._routerRoot = this; //根实例
                this._router = this.$options.router;
                console.log('router', this._router);

                this._router.init(this) //this就是我们整个的应用，new Vue

                Vue.util.defineReactive(this, '_route', this._router.history.current) //给this实例新增一个响应式属性。
            } else {
                this._routerRoot = this.$parent && this.$parent._routerRoot;
            }
        }
    });

    //实例上取值方便
    Object.defineProperty(Vue.prototype, '$router', {
        get() {
            return this._routerRoot && this._routerRoot._router
        }
    })

    Object.defineProperty(Vue.prototype, '$route', {
        get() {
            return this._routerRoot && this._routerRoot._route
        }
    })

    Vue.component('router-link', routerLink)
    Vue.component('router-view', routerView)

}
export default install 