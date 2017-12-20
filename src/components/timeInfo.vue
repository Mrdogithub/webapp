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
                        <a  v-for="Time in Times" @click="selected(Time)"  :value="Time.time" :key="Time.time"  :class = "{ 'active': activeName == Time.time, 'unavailable': Time.flag == false }">
                            <p>{{Time.time}}</p>
                            <p v-show='!Time.flag'>暂不可约</p>
                        </a>    
                    </div>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: { },
    data () {
       return {
           showTimeInfo: false,
           mockData: {
                'requestStatus': 'CURRENT',
                'error': null,
                'lastRequested': '2017-12-23T16:25:03.459Z',
                'value': {
                    'calendarStart': '2017-12-24',
                    'calendarEnd': '2017-12-24',
                    'timeSlotDuration': 0,
                    'availableDates': [
                        {
                            'date': '2017-12-24',
                            'availableTimeSlots': [
                                '07:30:00',
                                '08:00:00',
                                '08:30:00',
                                '10:00:00',
                                '10:30:00',
                                '11:00:00',
                                '12:00:00'
                            ]
                        }
                    ]
                }
            },
           Times: [
               {
                   time: '7:00',
                   timeFlag: '07:00:00',
                   flag: false
               },
               {
                   time: '7:30',
                   timeFlag: '07:30:00',
                   flag: false
               },
               {
                   time: '8:00',
                   timeFlag: '08:00:00',
                   flag: false
               },
               {
                   time: '8:30',
                   timeFlag: '08:30:00',
                   flag: false
               },
               {
                   time: '9:00',
                   timeFlag: '09:00:00',
                   flag: false
               },
               {
                   time: '9:30',
                   timeFlag: '09:30:00',
                   flag: false
               },
               {
                   time: '10:00',
                   timeFlag: '10:00:00',
                   flag: false
               },
               {
                   time: '10:30',
                   timeFlag: '10:30:00',
                   flag: false
               },
               {
                   time: '11:00',
                   timeFlag: '11:00:00',
                   flag: false
               },
               {
                   time: '11:30',
                   timeFlag: '11:30:00',
                   flag: false
               },
               {
                   time: '12:00',
                   timeFlag: '12:00:00',
                   flag: false
               },
               {
                   time: '12:30',
                   timeFlag: '12:30:00',
                   flag: false
               },
               {
                   time: '13:00',
                   timeFlag: '13:00:00',
                   flag: false
               },
               {
                   time: '13:30',
                   timeFlag: '13:30:00',
                   flag: false
               },
               {
                   time: '14:00',
                   timeFlag: '14:00:00',
                   flag: false
               },
               {
                   time: '14:30',
                   timeFlag: '14:30:00',
                   flag: false
               },
               {
                   time: '15:00',
                   timeFlag: '15:00:00',
                   flag: false
               },
               {
                   time: '15:30',
                   timeFlag: '15:30:00',
                   flag: false
               },
               {
                   time: '16:00',
                   timeFlag: '16:00:00',
                   flag: false
               },
               {
                   time: '16:30',
                   timeFlag: '16:30:00',
                   flag: false
               },
               {
                   time: '17:00',
                   timeFlag: '17:00:00',
                   flag: false
               },
               {
                   time: '17:30',
                   timeFlag: '17:30:00',
                   flag: false
               },
               {
                   time: '18:00',
                   timeFlag: '18:00:00',
                   flag: false
               },
               {
                   time: '18:30',
                   timeFlag: '18:30:00',
                   flag: false
               },
               {
                   time: '19:00',
                   timeFlag: '19:00:00',
                   flag: false
               },
               {
                   time: '19:30',
                   timeFlag: '19:30:00',
                   flag: false
               },
               {
                   time: '20:00',
                   timeFlag: '20:00:00',
                   flag: false
               }
            ],
            activeTime: '',
            activeName: '',
            availableTimeSlotsArr: [],
            selectTimeAndDateParams: {
                headersContent: {},
                params: {}
            }
       }
    },
    created: function () {
        let _osbAuth = JSON.parse(window.localStorage.getItem('osb'))
		this.selectTimeAndDateParams.params.dealerCode = _osbAuth.chooseDealerParams.OSBDealerID
		this.selectTimeAndDateParams.headersContent.headers['Auth-token'] = _osbAuth.accessToken
		this.selectTimeAndDateParams.headersContent.headers['Application-id'] = _osbAuth.guid

        this.getDate()
    },
    methods: {
        getDate (message) {
            let _testData = this.mockData.value.availableDates[0].availableTimeSlots
            for (let i = 0; i < _testData.length; i++) {
                for (let j = 0; j < this.Times.length; j++) {
                    if (_testData[i] === this.Times[j].timeFlag) {
                        this.Times[j].flag = true
                    }
                }
            }
            // this.$http.get('https://servicebooking-service-qa.apps.cl-cn-east-preprod01.cf.ford.com/api/v2/calendar', this.selectTimeAndDateParams.params, this.selectTimeAndDateParams.headersContent).then(function (response) {
            //     this.availableTimeSlotsArr = response.data.data.value.availableDates[0].availableTimeSlots
            //     console.log(response)
            //     if (this.availableTimeSlotsArr.length) {
            //         for (let i = 0; i < this.availableTimeSlotsArr.length; i++) {
            //             for (let j = 0; j < this.Times.length; j++) {
            //                 if (this.availableTimeSlotsArr[i] === this.Times[j].timeFlag) {
            //                     this.Times[j].flag = true
            //                 }
            //             }
            //         }
            //     } else {
            //         let _testData = this.mockData.value.availableDates[0].availableTimeSlots
            //         for (let i = 0; i < _testData.length; i++) {
            //             for (let j = 0; j < this.Times.length; j++) {
            //                 if (_testData[i] === this.Times[j].timeFlag) {
            //                     this.Times[j].flag = true
            //                 }
            //             }
            //         }
            //     }
            // }, function (response) {
            // })
        },
        showTime (message, status) {
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



