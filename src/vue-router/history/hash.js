import Base from "./base";
function ensureSlash() {
    if (window.location.hash) {
        return;
    }
    window.location.hash = '/'

}
function getHash() {
    return window.location.hash.slice(1);
}
class HashHistory extends Base {
    constructor(router) {
        super(router);

        //初始化时候需要给默认值
        ensureSlash()
    }
    setupListener() {
        window.addEventListener('hashchange', () => {
            console.log(getHash());
            this.transitionTo(getHash());
        })
    }
    getCurrentLoaction() {
        return getHash()
    }
    push(location) {
        this.transitionTo(location, () => {
            window.location.hash = location;
        });
    }




}
export default HashHistory