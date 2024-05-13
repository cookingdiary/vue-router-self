import Base from "./base";

class BrowerHistory extends Base {
    constructor(router) {
        super(router)


    }
    setupListener() {
        window.addEventListener('popstate', function () {
            console.log(window.location.pathname);
            this.transitionTo(window.location.pathname)

        })
    }
    getCurrentLoaction() {
        return window.location.pathname
    }
    push(location) {
        this.transitionTo(location, () => {
            // window.location.hash = location;
            history.pushState({}, '', location)
        });

    }
}
export default BrowerHistory