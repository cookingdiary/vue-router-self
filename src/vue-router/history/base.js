function createRoute(record, location) {
    let matched = [];
    if (record) {
        while (record) {
            matched.unshift(record);
            record = record.parent;
        }
    }
    return {
        ...location,
        matched
    }

}
function runQueue(queue, from, to, cb) {
    function next(index) {
        if (index >= queue.length) return cb();
        let hook = queue[index]
        hook(from, to, () => { next(index + 1) })
    }
    next(0)
}

class Base {
    constructor(router) {
        this.router = router;
        this.current = createRoute(null, { path: '/' })
    }
    transitionTo(location, listener) {
        // console.log(location, listener);
        let record = this.router.match(location)
        let route = createRoute(record, { path: location });
        if (location == this.current.path && route.matched.length == this.current.matched.length) { //路由重复不进行跳转
            return
        }

        let queue = [].concat(this.router.beforeEachHooks); //获取钩子函数
        console.log('hook', queue);
        runQueue(queue, this.current, route, () => {
            this.current = route; //更新current对象
            console.log('record', this.current); //更新current 切换页面显示。

            listener && listener()

            this.cb && this.cb(route) //路由变化了调用更新
        })

    }
    listen(cb) { //自定义一个函数存储 this._route = cb
        this.cb = cb;
    }

}
//$router 方法， $route 属性
export default Base