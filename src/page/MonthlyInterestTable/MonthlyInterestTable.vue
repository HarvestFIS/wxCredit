<template>
    <div class="MonthlyInterestTable">
            <van-nav-bar class="dark_header" title="资产月付息逾期提醒报表" fixed left-arrow :z-index="999" />
         <table id="table1">
              <tr>
                 <th>部门</th>
                 <th>性质</th>
                 <th>资产名称</th>
                 <th>借款金额</th>
                 <th style="width: 65px;">应收利息金额</th>
                 <th style="width: 65px;">应收时间</th>
              </tr>
              <tr v-for = "item in item" :key="item.name">
                    <td>{{item.assetsOfCompany}}</td>
                    <td>{{item.channelTitle}}</td>
                    <td>{{item.title}}</td>
                    <td v-if="item.totalAmount">{{item.totalAmount}}元</td>
                    <td v-else>-</td>
                    <td>{{item.payableAmount}}元</td>
                    <td>{{item.setDate | formatTime}}</td>
              </tr>
          </table>
    </div>
</template>
<script>
    import {InterestOverdue } from 'api/api'

export default {
    
    data () {
        return {
            item:[]
        }
    },
    methods: {
        
    },
    created() {
        // /wxReport/findLoanAssetInterestOverdue
        InterestOverdue().then((res)=>{
            // console.log(res.data)
            this.item = res.data;
        }).catch((err)=>{

        })
    },
}
</script>
<style lang="scss">
.van-nav-bar__arrow{
    display: none !important;
}
.MonthlyInterestTable{
        width: 100%;
        font-size: 12px;
    #table1{
        border-collapse:collapse;
        width: 100%;
        font-size: 12px;
        border: 2px solid #999;
        text-align: center;
        margin-top: 3rem;
        tr{
            th{
                border: 2px solid #999;
                text-align: center;
                height: 30px;
                background: #98b0f1;
                color: #fff;
                padding: 0px !important;
                margin: 0px !important;
            }
            td{
                border: 2px solid #999;
                text-align: center;
                padding: 0px !important;
                margin: 0px !important;
                height: 20px;
                line-height: 15px;
                
            }
        }
    }
}
</style>
