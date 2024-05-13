//react中交children vue中足有的插槽会被变到vue.$sloats对象上
// Vue.component('router-link', 
export default {
    props: {
        to: { type: String, require: true },
        tag: { type: String, default: 'a' }
    },
    methods: {
        handler() {
            console.log('click');
            this.$router.push(this.to)
        }
    },
    render() {
        let tag = this.tag
        // return <a>{this.$scopedSlots.default()}</a>
        return <tag onClick={this.handler}><a>{this.$slots.default}</a></tag>
    }
}