<template>
  <div class="selectServiceDetail">
        <bar v-bind="{ 'title': '保养套餐详情','allIconStatus': false, 'goBackIcon': true}"></bar>
        <div class="content-wrapper">
            <ul class="detail-list-wrapper">
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
                <li class="detail-list-item" v-on:click="showServicePackage()">5000 km service package</li>
            </ul>
        </div>
        <div class="server-package-wrapper" v-show="showFlag" @click.prevent="hideServicePackage">
            <div class="server-package-content-wrapper" @click.stop="stopEvent">
                <h1 class="server-package-title">服务套餐</h1>
                <div class="server-package-content">
                    <div class="content-item">
                        <h2>检查</h2>
                        <div class="content-item-wrapper">
                            <p><span style="color:rgb(155,155,155)">1</span> 机油滤清器* （6个月^）</p>
                            <p><span style="color:rgb(155,155,155)">2</span> 发动机机油（6个月^）</p>
                            <div class="note">
                                <small><sup>*</sup>建议恶劣环境缩短周期</small>
                                <small><sup>^</sup>最长保养时间间隔</small>
                            </div>
                        </div>   
                    </div>

                    <div class="content-item">
                        <h2>替换</h2>
                        <div class="content-item-wrapper">
                            <p><span style="color:rgb(155,155,155)">1</span> 机油滤清器* （6个月^）</p>
                            <p><span style="color:rgb(155,155,155)">2</span> 发动机机油（6个月^）</p>
                        </div>   
                    </div>
                    <div class="largeBtnWrapper">
                        <Button type="primary" style="height:45px;width:266px" class="middle-Btn" v-on:click="hideServicePackage">好</Button>
                    </div>
                </div>
            </div>
	    </div>
  </div>
</template>

<script>
import bar from '../components/bar'
import servicePackage from '../components/servicePackage'
export default {
    props: {
        showFlag: {
            type: Boolean
        }
    },
    data () {
        return {
        }
    },
    components: {
        'bar': bar,
        'servicePackage': servicePackage
    },
    methods: {
        stopEvent () {},
        showServicePackage () {
            this.showFlag = true
        },
        hideServicePackage () {
            this.showFlag = false
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .selectServiceDetail .detail-list-wrapper
        width:100%
        padding-right:27px
        padding-left:23px
        padding-top:60px
    .selectServiceDetail .detail-list-item
        position:relative
        height:55px
        width:100%
        margin:0 auto
        line-height:55px
        text-align:left
        font-size:14px
        color:rgb(45,152,205)
        border-bottom:1px solid #dddee1
    .selectServiceDetail .detail-list-item span
        position:absolute
        right:0px;
        color:rgb(45,152m205)
    .selectServiceDetail .server-package-wrapper
        position:fixed
        top:0px
        width:100%
        height:100%
        left:0
        z-index:999
        overflow:auto
        backdrop-filter:blur
        background:rgba(7,17,27,0.8)
    .selectServiceDetail .server-package-content-wrapper
        width:91.2%
        height: 523px;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;
        border-radius: 18px;
        background-color:rgb(249,252,255)
    .selectServiceDetail .server-package-title
        width:100%
        height:61px
        line-height:61px
        border-bottom:1px solid rgb(219,219,219)
        font-size:17px
        font-weight:normal
        color:rgb(18,78,132)
    .selectServiceDetail .content-item
        &>h2
            height:58px
            line-height:58px
            font-size:18px
            font-weight:normal
            color:rgb(149,149,149)
        &>.content-item-wrapper
            width:100%
            height:auto
            padding:15px
            text-align:left
            box-sizing:border-box
            border-top:1px solid rgb(219,219,219)
            border-bottom:1px solid rgb(219,219,219)
        .content-item-wrapper
            background-color:#fff
            &>p
                color:#000
                font-size:18px
                font-weight:normal
            &>.note
                margin-top:16.8px
                &>small
                    display:block
                    color:rgb(155,155,155)
                    font-size:14px
                &>sup
                    margin-right:5px
	.selectServiceDetail .largeBtnWrapper
		margin-top:20px
		text-align:center
	.selectServiceDetail .largeBtn
		width:77.7777%
	.selectServiceDetail  .ivu-btn-primary
        background-color: rgb(45,150,205)
        border-color: rgb(45,150,205)
        font-size:14px
</style>
