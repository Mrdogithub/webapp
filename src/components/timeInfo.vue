<template>
    <transition name="fade">
        <div v-show = "showTimeInfo">
            <div class="timeInfoOverlay"></div>
            <div class="timeInfoWrapper" >
                <div class="timeInfoBtn">
                    <a href="javascript:void(0)" @click="cancel">取消 </a>
                    <a href="javascript:void(0)" @click="done">完成</a>
                </div>
                <div class="timeContentWrapper">
                    <div class="timeContent">
                        <a  v-for="Time in Times" @click="selected(Time)" :class="{active: activeName == Time.time, unavailable: Time.flag == false }">
                            <p>{{Time.time}}</p>
                            <p>{{Time.message}}</p>
                        </a>    
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: {
    },
    data () {
       return {
           showTimeInfo: false,
           Times: [
               {
                   time: '8:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '8:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '9:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '9:30',
                   flag: false,
                   message: '暂不可约'
               },
               {
                   time: '10:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '10:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '11:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '11:30',
                   flag: false,
                   message: '暂不可约'
               },
               {
                   time: '12:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '12:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '13:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '13:30',
                   flag: false,
                   message: '暂不可约'
               },
               {
                   time: '14:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '14:30',
                   flag: false,
                   message: '暂不可约'
               },
               {
                   time: '15:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '15:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '16:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '16:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '17:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '17:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '18:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '18:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '19:00',
                   flag: true,
                   message: ''
               },
               {
                   time: '19:30',
                   flag: true,
                   message: ''
               },
               {
                   time: '20:00',
                   flag: true,
                   message: ''
               }
            ],
           activeTime: '',
           activeName: ''
       }
    },
    created: {
        url: '/api/active_time',
        dataType: 'json',
        success: function (data) {
            this.time = data.time
            this.flag = data.flag
            this.message = data.message
            console.log(self.time)
        },
        error: function (data) {
            console.log('jsonName error!')
        }
    },
    methods: {
        showTime (message, status) {
            console.log(message)
            this.showTimeInfo = status
        },
        cancel () {
            this.showTimeInfo = false
            this.$emit('child-say', '')
        },
        done () {
            this.showTimeInfo = false
        },
        selected (Time) {
            this.activeName = Time.time
            var activeTime = Time.time
            console.log(activeTime)
            if (Time.flag === true) {
                this.$emit('child-say', activeTime)
            } else {
                this.$emit('child-say', '')
            }
        }
    }
}
</script>
<style lang="stylus" rel="stylesheet/stylus">
    .timeInfoOverlay
        position:absolute
        top:0
        bottom:0
        left:0
        right:0
        background:rgb(0,0,0)
        opacity:0.34
    .timeInfoWrapper
        position: fixed
        bottom: 0px
        z-index: 999
        height: 385px
        width: 100%
        box-sizing:border-box
        background:#fff
        .timeInfoBtn
            position: absolute
            top:0
            height: 45px
            width:100%
            line-height: 45px
            padding: 0 20px 
            background:rgb(248,248,248)
            a:nth-child(1)
                float: left
            a:nth-child(2)
                float: right
        .timeContentWrapper
            position: absolute
            width:100%
            top:45px
            padding:21px 6px
            .timeContent
                display:flex
                flex-wrap:wrap
            a
                width:22.7%
                margin:1%
                border: 1px solid rgb(45,150,205)
                font-size:14px
                height:38px
                line-height:38px
            a.active
                background:rgb(45,150,205)
                color:#fff
            a.unavailable
                background:none
                border: 1px solid rgb(193,193,193)
                color:rgb(193,193,193)
                line-height:14px
                padding-top:6px
            a.unavailable p:nth-child(1)
                font-size: 14px
            a.unavailable p:nth-child(2)
                font-size: 8px
                letter-spacing: -0.1px
</style>