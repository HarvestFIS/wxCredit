<template>
    <div class="applyContainer">
        <table class="apply marginB10" border="1">
            <caption>
                当前状态: {{ dataList.status | creditStatus }}
            </caption>
            <tr>
                <th>审批单编号</th>
                <td style="width: 90px;">{{ dataList.quotaNo }}</td>
                <th>编号</th>
                <td>{{ dataList.biddingNo }}</td>
            </tr>
            
            <!-- <tr>
                <td class="split-height" colspan="4"></td>
            </tr> -->
        </table>
        <table v-for="mainItem in dataList.main" :key="mainItem.id" class="apply marginB10" border="1">
            <tr>
                <th>借款主体</th>
                <td style="width: 90px;">{{ mainItem.name }}</td>
                <th>金额</th>
                <td>{{ mainItem.amountRisk }}万元</td>
            </tr>
            <tr>
                <th>期限</th>
                <td>{{ mainItem.limitRisk }}天</td>
                <th>宽限期</th>
                <td>{{ mainItem.gracePeriodRisk }}天</td>
            </tr>
        </table>
        <table class="apply" border="1">
            <tr>
                <th>抵押物价值</th>
                <td style="width: 90px;">{{ dataList.mortgageAmount }}万元</td>
                <th>抵押率</th>
                <td>{{ dataList.mortgageRate }}%</td>
            </tr>
            <tr>
                <th>综合费率</th>
                <td>{{ dataList.formalitiesFee }}</td>
                <th>借款利率</th>
                <td>{{ dataList.rate }}</td>
            </tr>
            <tr>
                <th>服务费率</th>
                <td>{{ dataList.serviceFee }}</td>
                <th>服务费</th>
                <td>{{ dataList.serviceFeeAmount }}元</td>
                
            </tr>
            <tr>
                <th>推荐渠道</th>
                <td>{{ dataList.businessSource }}</td>
                <th>借款类型</th>
                <td>{{ dataList.productName }}</td>
            </tr>
            <tr>
                <th>还款方式</th>
                <td>{{ dataList.repaymentType == 2 ? "按月付息到期还本" : ""}}</td>
                <th>经办人</th>
                <td>{{ dataList.updater }}</td>
            </tr>
            <tr v-if="status == 'finance'">
                <th>应收服务费说明</th>
                <td colspan="3"><pre>{{ dataList.serviceFeeRemark }}</pre></td>
            </tr>
            <tr v-if="status == 'finance'">
                <th>实收服务费金额</th>
                <td colspan="3" style="position: relative;">
                    <input style="padding-right: 20px;" type="number" class="rate" placeholder="输入实收服务费金额" v-model="serviceFeeFact" >
                    <span style="position: absolute; right: 8px; top: 16px;">元</span>
                </td>
            </tr>
            <tr v-if="status == 'finance'">
                <th>实收服务费日期</th>
                <td colspan="3">
                    <input style="padding-right: 20px;" type="text" @focus="dateFocus" readonly class="rate" placeholder="输入实收服务费日期" v-model="serviceFeeFactDate" >
                    <van-popup v-model="show" position="bottom" :overlay="true">
                        <van-datetime-picker
                        v-model="currentDate"
                        type="date"
                        
                        @cancel="dateCancel"
                        @confirm="dateConfirm"
                        :formatter="formatter" />
                        <!-- :min-date="minDate"
                        :max-date="maxDate" -->
                    </van-popup>
                </td>
            </tr>
            <tr v-if="status">
                <th rowspan="2">审批意见</th>
                <td colspan="3" style="padding: 0;">
                    <van-radio-group v-model="radioType" @change="btn()">
                        <van-cell-group>
                            <van-cell title="同意" clickable @click="radioType='1'">
                                <van-radio name="1" />
                            </van-cell>
                            <van-cell title="打回到助理" clickable @click="radioType='2'" v-show="manage[0]">
                                <van-radio name="2" />
                            </van-cell>
                            <van-cell title="打回到风控" clickable @click="radioType='4'" v-show="manage[1]">
                                <van-radio name="4" />
                            </van-cell>
                            <van-cell title="打回到运营编辑" clickable @click="radioType='2'" v-show="manage[2]">
                                <van-radio name="2" />
                            </van-cell>
                            <van-cell title="拒绝" clickable @click="radioType='3'"  v-show="manage[3]">
                                <van-radio name="3" />
                            </van-cell>
                        </van-cell-group>
                    </van-radio-group>
                </td>
            </tr>
            <tr v-if="status">
                <td colspan="3">
                    <textarea name="content" id="" placeholder="输入意见说明" v-model="message" cols="30" rows="5"></textarea>
                </td>
            </tr>
            <tr v-if="status">
                <th></th>
                <td colspan="3">
                    <div class="btn-group">
                        <button class="wx-button wx-button-primary" @click="submit">确认</button>
                        <button class="wx-button" @click="back">返回</button>
                    </div>
                </td> 
            </tr>

            <tr v-if="bidding_wait">
                <th></th>
                <td colspan="3">
                    <div class="btn-group">
                        <button class="wx-button wx-button-primary" @click="submitWait">确认</button>
                    </div>
                </td> 
            </tr>
        </table>

        <div class="timer-container">
            <div class="timer-title">
                流转意见
            </div>
            <ul class="time-vertical">
                <li v-for="applyItem in dataList.approvalProcess" :key="applyItem.id">
                    <b></b><span :class="[applyItem.preStatus == 'bidding_ceo' ? 'ceo' : '']">{{ applyItem.preStatus | preStatus }}</span>
                    <div class="popover">{{ applyItem.opinion }}
                        <div class="popover-ownerInfo">
                            {{ applyItem.updateBy }} <br />
                            批准于: {{ applyItem.changeTime | formatTime }}
                        </div>
                        <div class="popover-arrow"></div>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { RadioGroup, Radio, Toast, Popup } from 'vant'
import { findBiddingInfo, biddingApproval, biddingShopsMortgage } from 'api/api'
export default {
    name: 'applyContainer',
    props: ["id"],
    data() {
        return {
            radioType: "1",
            message: '同意',
            serviceFeeFact: '',
            serviceFeeFactDate: '',
            dataList: [],
            status: false, // 控件输入内容的
            // 1. 打回到助理 2. 打回到风控 3. 打回到运营编辑 4. 是否有拒绝
            manage: [true, true, false, true],
            bidding_wait: false, // 运营发标
            show: false,
            // minDate: new Date(2018, 1, 1),
            // maxDate: new Date(2099, 12, 31),
            currentDate: new Date()
        }
    }, 
    components: { RadioGroup, Radio, Toast },
    created() {
        this.onLoad()
    },
    methods: {
        onLoad() {
            Toast({
                type: 'loading',
                mask: true,
                message: '加载中...'
            })
            findBiddingInfo(this.id).then((result) => {
                Toast.clear()
                this.dataList = result.data
                this.serviceFeeFact = result.data.serviceFeeFact
                this.serviceFeeFactDate = result.data.serviceFeeFactDate
                this.currentDate = result.data.serviceFeeFactDate ? new Date(result.data.serviceFeeFactDate) : new Date()
                // hasWorkflowRight -> 是否显示审批意见
                // 如果是财务则不显示拒绝）
                // bidding_business_manage 只有打回到业务助理
                // bidding_operate_manage 只有打回到运营编辑，传2
                // bidding_wait 其它的输入全部都隐藏，只单独显示一个操作按钮
                // bidding_ceo 没有打回到运营编辑
                this.status = result.data.hasWorkflowRight ? true : false
                switch(result.data.status) {
                    case 'bidding_finance':
                        this.status = 'finance'
                        this.manage = [ true, true, false, false ]
                    break;
                    case 'bidding_business_manage':
                        this.manage = [ true, false, false, true ]
                    break;
                    case 'bidding_operate_manage':
                        this.manage = [ false, false, true, true ]
                    break;
                    case 'bidding_wait':
                        this.status = false
                        this.bidding_wait = true
                    break;
                    case 'bidding_ceo':
                        this.manage = [ true, true, false, true ]
                    break;
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        dateFocus() {
            this.show = true
        },
        dateCancel() {
            this.show = false
        },
        dateConfirm() {
            let currentTime = new Date(this.currentDate);
            let month = parseInt(currentTime.getMonth() + 1) >= 10 ? parseInt(currentTime.getMonth() + 1) : "0" + parseInt(currentTime.getMonth() + 1) 
            let day = currentTime.getDate() >= 10 ? currentTime.getDate() : "0" + currentTime.getDate()
            this.serviceFeeFactDate = currentTime.getFullYear() + '-' + month + '-' + day
            this.show = false
        },
        formatter(type, value) {
            if (type === 'year') {
                return `${value}年`;
            } else if (type === 'month') {
                return `${value}月`
            } else if (type === 'day') {
                return `${value}日`
            }
            return value;
        },
        submit() {
            let params = {
                id: this.id,
                nextStatus: this.radioType, 
                opinion: this.message,
                serviceFeeFact: this.serviceFeeFact,
                serviceFeeFactDate: this.serviceFeeFactDate
            }
            if(this.status == 'finance' && !this.serviceFeeFact) {
                Toast('实收服务费金额不能为空')
                return false
            }
            
            if(this.status == 'finance' &&　!this.serviceFeeFactDate) {
                Toast('实收服务费日期不能为空')
                return false
            }
            if(!this.message.trim()) {
                Toast('意见不能为空')
                return false
            }

            biddingApproval(params).then((result) => {
                let data = result.data
                if(data.success) {
                    this.$router.push({
                        path: '/home', 
                        query: {isloading: true}
                    })
                } else {
                    Toast(data.message)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        submitWait() {
            biddingShopsMortgage(this.id).then((result) => {
                let data = result.data
                if(data.success) {
                    this.$router.push({
                        path: '/home', 
                        query: {isloading: true}
                    })
                } else {
                    Toast(data.message)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        back() {
            this.$router.push({
                path: '/home', 
                query: {isloading: true}
            })
        },
         btn(){
            if(this.radioType == "2"){
                if(this.manage3) {
                    this.message = "打回到运营编辑"
                } else {
                    this.message = "打回到助理"
                }
            }else  if(this.radioType == "3"){
                this.message = "拒绝"
            }else if(this.radioType == "4"){
                this.message = "打回到风控"
            }else {
                this.message = "同意"
            }
         }
    }
}
</script>

<style lang="scss">
@import "@/assets/scss/var.scss";
.apply {
    width: 96%;
    font-size: 13px;
    margin: 0 auto 20px;
    border: 1px solid $borderColor;
    &.marginB10 {
        margin-bottom: 10px;
    }
    .split-height {
        background: $backgroundColor;
        padding: 5px 0;
    }
    caption {
        text-align: left;
        font-size: 16px;
        color: #f60;
        padding-top: 10px;
        padding-bottom: 10px;
    }
    th, td {
        padding: 8px;
        text-align: left;
        line-height: 1.5;
    }
    th {
        width: 70px;
        background: #f5f7fa;
        color: #909399;
        font-weight: 500;
    }
    td {
        color: #606266;
        background: $backgroundColor;
    }
    textarea, .rate {
        width: 100%;
        font-size: 13px;
        border: 1px solid transparent;
        box-sizing: border-box;
    }
    .van-radio-group {
        line-height: 1;
    }
    .van-radio {
        display: inline-block;
        .van-radio__label {
            margin-right: 20px;
        }
        .van-icon-checked {
            color: $primaryColor;
        }
    }
}



.timer-container {
    padding-bottom: 30px;
}
.timer-title {
    width: 80px;
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
    background: $primaryColor;
    text-align: center;
    color: $backgroundColor;
    line-height: 32px;
    font-size: 14px;
}

/*纵向时间轴*/
.time-vertical {
    list-style-type: none;
    border-left: 1px solid #d5e0e9;
    margin-left: 40px;
    li {
        position: relative;
        padding-top: 20px;
        a {
            display: inline-block;
            margin-left: 20px;
            margin-top: 15px;
            text-decoration: none;
            color: #000;
        }
        b:before {
            content: '';
            position: absolute;
            top: 28px;
            left: -26px;
            width: 46px;
            height: 46px;
            border: 2px solid $primaryColor;
            border-radius: 40px;
            background: $primaryColor;
            box-shadow: 0 0 10px 3px #a8d1ff;
        }
        span {
            position: absolute;
            color: #ffffff;
            top: 40px;
            left: -20px;
            font-size: 13px;
            width: 38px;
            text-align: center;
            &.ceo {
                top: 46px;
            }
        }
    }
}

.popover {
    position: relative;
    width: 80%;
    border: 1px solid $borderColor;
    background: $backgroundColor;
    border-radius: 8px;
    margin-left: 12%;
    margin-top: 8px;
    padding: 16px 12px 12px;
    box-sizing: border-box;
    box-shadow: 0 0 6px rgba(0,0,0,.12);
}

.popover-ownerInfo {
    padding-top: 8px;
    text-align: right;
    font-size: 12px;
    line-height: 1.6;
}

.popover-arrow::after {
    content: " ";
    position: absolute;
    top: 16px;
    left: -7px;
    width: 12px;
    height: 12px;
    border-left: 1px solid #d9d9d9;
    border-top: 1px solid #d9d9d9;
    transform: rotate(-45deg);
    background: $backgroundColor;
}

.van-cell {
    padding: 5px 15px;
}
.van-cell__title span {
    display: flex;
    height: 100%;
    align-items: center;
}
.van-cell__value .van-radio {
    display: flex;
    height: 100%;
     align-items: center;
}
</style>

