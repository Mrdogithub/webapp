<template>
  	<div class="server-package-wrapper" v-show="showFlag">
            <h1>xxxx Service Package </h1>
            <div class="server-package-content">
                <div class="content-item">
                    <h2>check</h2>
                    <p>1 机油滤清器* （6个月^）</p>
                    <p>2 发动机机油（6个月^）</p>
                    <small><sup>*</sup>建议恶劣环境缩短周期</small>
                    <small><sup>^</sup>最长保养时间间隔</small>
                </div>
                <div class="content-item">
                    <h2>Replace</h2>
                    <p>1 机油滤清器* （6个月^）</p>
                    <p>2 发动机机油（6个月^）</p>
                    <small><sup>*</sup>建议恶劣环境缩短周期</small>
                    <small><sup>^</sup>最长保养时间间隔</small>
                </div>
                <div class="largeBtnWrapper">
                    <Button type="primary" size="large" class="largeBtn" v-on:click="hide">OK</Button>
                </div>
            </div>
	</div>
</template>

<script>
export default {
    props: {
       title: String
    },
    data () {
        return {
            showFlag: false
        }
    },
    methods: {
        show () {
            this.showFlag = true
        },
        hide () {
            this.showFlag = false
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">

</style>
