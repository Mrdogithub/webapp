<template>
    <div>
        <div class="tab">
            <div class="tab-item"><a :class="{'active':currentTab == 'location'}" @click = 'swtichTab("location", $event)'>地点</a></div>
            <div class="tab-item"><a :class="{'active':currentTab == 'dealer'}" @click='swtichTab("dealer", $event)'>经销商名称</a></div>
        </div>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                currentTab: 'location'
            }
        },
        methods: {
            swtichTab (activeTab, event) {
                this.currentTab = activeTab
                this.$emit('watch-tab-status', this.currentTab)
            }
        }
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    .tab
        display: flex
        width: 100%
        height: 56px
        line-height: 56px
        .tab-item
            flex: 1
            text-align: center
            &>a
                display:block
                font-size:14px
                color:rgb(77,85,93)
                &.active
                    color:rgb(56,147,170)
                    border-bottom:2px solid rgb(56,147,170)

</style>
