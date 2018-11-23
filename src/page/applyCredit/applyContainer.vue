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
                <td>{{ mainItem.gracePeriodRisk  }}天</td>
            </tr>
        </table>
        <table class="apply" border="1">
            <tr>
                <th>抵押物价值</th>
                <td style="width: 90px;">{{ dataList.mortgageAmount }}</td>
                <th>抵押率</th>
                <td>{{ dataList.mortgageRate }}</td>
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
                <th>还款方式</th>
                <td>{{ dataList.repaymentType == 2 ? "按月付息到期还本" : ""}}</td>
            </tr>
            <tr>
                <th>推荐渠道</th>
                <td>{{ dataList.businessSource }}</td>
                <th>借款类型</th>
                <td>{{ dataList.productName }}</td>
            </tr>
            <tr>
                <th>经办人</th>
                <td>{{ dataList.updater }}</td>
                <th>收取方式</th>
                <td>前置一次性收取</td>
            </tr>
            <template v-if="status === 'show'">
                <tr>
                    <th rowspan="2">审批意见</th>
                    <td colspan="3">
                        <van-radio-group v-model="radioType">
                            <van-radio name="1">同意</van-radio>
                            <van-radio name="2">打回</van-radio>
                            <van-radio name="3">拒绝</van-radio>
                        </van-radio-group>
                    </td>
                </tr>
                <tr>
                    <td colspan="3">
                        <textarea name="content" id="" placeholder="输入意见说明" v-model="message" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td colspan="3">
                        <div class="btn-group">
                            <button class="wx-button wx-button-primary" @click="submit">确认</button>
                            <button class="wx-button" @click="back">返回</button>
                        </div>
                    </td> 
                </tr>
            </template>
            <template v-if="status === 'finance'">
                 <tr>
                    <th>审批意见</th>
                     <td colspan="3">
                        <textarea name="content" id="" placeholder="输入意见说明" v-model="message" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <th></th>
                    <td colspan="3">
                        <div class="btn-group">
                            <button class="wx-button wx-button-primary" @click="submit">确认</button>
                            <button class="wx-button" @click="back">返回</button>
                        </div>
                    </td> 
                </tr>
            </template>
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
import { RadioGroup, Radio, Toast } from 'vant'
import { findBiddingInfo, biddingApproval } from 'api/api'
export default {
    name: 'applyContainer',
    props: ["id"],
    data() {
        return {
            radioType: "1",
            message: '',
            dataList: [],
            status: 'hide'
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
                // 如果是财务则不显示同意，拒绝
                if(result.data.status === 'bidding_finance') {
                    this.status = 'finance'
                }else {
                    this.status = result.data.hasWorkflowRight ? 'show' : 'false'
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        submit() {
            let params = {
                id: this.id,
                nextStatus: this.status === 'finance' ? '' : this.radioType, // 如果为财务则传空
                opinion: this.message
            }
            biddingApproval(params).then((result) => {
                let data = result.data
                if(data.success) {
                    this.$router.push('/home')
                } else {
                    Toast(data.message)
                }
            }).catch((err) => {
                console.log(err)
            })
        },
        back() {
            this.$router.push('/home')
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
    textarea {
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

</style>

