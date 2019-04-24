<template>
    <div class="detailBox">    
        <van-nav-bar class="dark_header" left-text="返回" title="查看申请信息" fixed left-arrow :z-index="999" @click-left="onClickLeft" />

        <div class="tableItem1" v-for="(item,index) in this.dataItem.main " :key="item.name">
            <h3 class="mb10 font14">主体{{index+1}}：</h3>
            <table class="apply marginB10" border="1">
                    <tr>
                        <th>主体名称</th>
                        <td style="width: 90px;">{{item.name}}</td>
                        <th>申请金额</th>
                        <td>{{item.amount}}万元</td>
                    </tr>
                    <tr>
                        <th>申请期限</th>
                        <td style="width: 90px;">{{item.limit}}天</td>
                    
                    </tr>
            </table>
        </div>
        <div class="tableItem2">
            <h3 class="mb10 font14">申请信息：</h3>
            <table class="apply" border="1">
                <tr>
                    <th>申请总金额</th>
                    <td style="width: 90px;">{{quota.applyAmount}}万元</td>
                    <th>综合费率</th>
                    <td>{{extend.formalitiesFee}}</td>
                </tr>
                <tr>
                    <th>借款利率</th>
                    <td style="width: 90px;">{{extend.rate}}</td>
                    <th>服务费率</th>
                    <td>{{extend.serviceFee}}</td>
                </tr>
                <!-- <tr>
                    <th>担保企业（人）1</th>
                    <td style="width: 90px;">{{extend.warrantor1}}</td>
                    <th>担保企业（人）2</th>
                    <td>{{extend.warrantor1}}</td>
                </tr>
                <tr>
                    <th>放款类型</th>
                    <td style="width: 90px;">{{extend.rate}}</td>
                    <th>代收付收款人</th>
                    <td>{{extend.serviceFee}}</td>
                </tr> -->
            </table>
            <table class="apply marginB10" v-if="product.productAlias == 'supplychain'" border="1">
                <tr v-for="(item, index) in extend.warrantors" :key="item.idCard">
                    <th>担保企业（人）{{ index + 1 }}</th>
                    <td style="width: 90px;">{{item.name}}</td>
                    <th>证件号</th>
                    <td>{{item.idCard}}</td>
                </tr>
                <tr v-if="extend.model == 'COLLECT'">
                    <th>放款类型</th>
                    <td style="width: 90px;">代收付</td>
                    <th>代收付收款人</th>
                    <td>{{extend.collectorName}}</td>
                </tr>
                <tr v-if="extend.model == 'DIRECT'">
                    <th>放款类型</th>
                    <td style="width: 90px;">直投</td>
                </tr>
            </table>
        </div>

        <div class="tableItem3">
            <h3 class="mb10 font14">业务调查建议：</h3>
            <table class="apply marginB10" border="1">
                <tr>
                    <th>建议授信</th>
                    <td style="width: 90px;">{{extend.suggestAmount}}万元</td>
                    <th>期限</th>
                    <td>{{extend.suggestLimit}}天</td>
                </tr>
                    <tr>
                    <th>宽限期</th>
                    <td style="width: 90px;">{{extend.suggestGrace}}天</td>
                    <th>抵押率</th>
                    <td>{{extend.suggestRate}}%</td>
                </tr>
            </table>
        </div>

        <div class="tableItem4" v-if="risk != null">
            <h3 class="mb10 font14">风控经理审查建议：</h3>
            <table class="apply marginB10" border="1">
                <tr>
                    <th>本次授信总额</th>
                    <td style="width: 90px;">{{risk.riskAmount}}万元</td>
                    <th>商抵贷额度</th>
                    <td>{{risk.shopsAmount}}万元</td>
                </tr>
                <tr>
                    <th>卓e贷额度</th>
                    <td style="width: 90px;">{{zedAmount}}万元</td>
                    <th>授信期限</th>
                    <td>{{risk.riskLimit}}天</td>
                </tr>

                <tr>
                    <th>宽限期</th>
                    <td style="width: 90px;">{{risk.riskGracePeriod}}天</td>
                    <th>还款方式</th>
                    <td v-if="risk.riskRepaymentType == '2'">按月付息到期还本</td>
                </tr>

                <tr>
                    <th>综合融资费率</th>
                    <td style="width: 90px;">{{risk.mortTotalFee}}</td>
                    <th>借款利率</th>
                    <td>{{risk.formalitiesFee}}</td>
                </tr>

                <tr>
                    <th>服务费率</th>
                    <td style="width: 90px;">{{risk.serviceFee}}</td>
                    <th>抵押率</th>
                    <td>{{risk.guaranteeFee}}</td>
                </tr>
            </table>
        </div>
        <div v-if="dataItem.hasWorkflowRight && dataItem.quota.status != 'assign_manage'">
            <h3 class="mb10 font14" style="color:red;">授信审批基本信息：</h3>
            <div class="boxradio">
                <div class="fl ml10 font14" style="100px;">是否同意授信：</div>
                    <van-radio-group v-model="radio" class="fl" @change="btn()">
                        <van-radio name="1" class="fl font14" style="width:80px;">同意</van-radio>
                        <van-radio name="2" class="fl font14" style="width:80px;">退回</van-radio>
                        <van-radio name="3" class="fl font14">拒绝</van-radio>
                    </van-radio-group>
            </div>
            <div class="textareabox">
                <div class="fl ml10 font14" style="width:100px;">审批意见：</div>
                <textarea name="content" id="" placeholder="输入意见说明" v-model="message" cols="30" rows="10"></textarea>
            </div>
            <van-button @click="sucessBtn()" class="sucessBtn" type="primary">确认审批</van-button>
        </div>

    </div>
</template>
<script>
    import { RadioGroup, Radio ,Button,Dialog} from 'vant';
    import {SeeInfos,SeePosttable } from 'api/api'
    
    export default {
        // props: ["id"],
        data(){
            return{
                radio:'1',
                message:'同意',
                id:this.$router.currentRoute.query.id,
                dataItem:[],
                quota:{},
                risk:{},
                extend:{},
                product:{},
                zedAmount:'',
            }
        },
        methods:{
            onClickLeft(){
                 this.$router.push({ path: '/assigntablelist',query: {isloading: true}})
            },
            load(){
                SeeInfos(this.id).then((result) => {
                    this.dataItem = result.data;
                    this.quota =  result.data.quota;
                    this.extend =  result.data.extend;
                    this.product = result.data.product;
                    if(result.data.risk){
                        this.risk =  result.data.risk;
                       this.zedAmount = result.data.risk.zedAmount ;
                    }
                    
             })
            },
            sucessBtn(){
                if(this.radio == ""){
                    Dialog.alert({
                        title: '提示',
                        message: '请至少勾选一项'
                    })
                    return false
                }
                if(!this.message.trim()) {
                     Dialog.alert({
                        title: '提示',
                        message: '意见不能为空'
                    })
                    return false
                }
                 let params = {
                        id: this.id,
                        nextStatus: this.radio,
                        opinion: this.message
                    }
                SeePosttable(params).then((res)=>{
                    if(res.data.success){
                          Dialog.alert({
                            title: '提示',
                            message: '审批成功'
                           }).then(()=>{
                            this.$router.push({ path: '/assigntablelist',query: {isloading: true}})
                        })
                    }else{  
                        Dialog.alert({
                           title: '提示',
                            message: res.data.message
                           }).then(()=>{
                            this.$router.push({ path: '/assigntablelist',query: {isloading: true}})
                        })
                    }
                   
                }).catch((err) => {
                     Dialog.alert({
                        title: '提示',
                        message: '系统错误，请刷新重试'
                    })
                 })
            },
            btn(){
                if(this.radio == "2"){
                    this.message = "退回"
                }else  if(this.radio == "3"){
                    this.message = "拒绝"
                }else{
                    this.message = "同意"
                }
            }
        },
        created () {
          this.load();  
        },
        components: {
            RadioGroup,Radio
        },
    }
</script>
<style lang="scss">
.fl{
    float: left;
}
.dark_header{
    background: #fff !important;
    color: #000;
}

.detailBox{
    padding-top: 56px;
    overflow: hidden;
}
.mb10{
    margin-bottom: 10px;
}
.ml10{
    margin-left: 10px;

}
.font14{
    font-size: 14px;
    padding-left: 10px;
    color: #909399;
}
.apply{
    width: 96%;
    font-size: 13px;
    margin: 0 auto 20px;
    border: 1px solid #ebeef5;;
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
    text-align: center;
}
td {
    color: #606266;
    background: #fff;
}
.boxradio{
  background: #f5f7fa;
    color:#909399;
    height: 40px;
    line-height: 40px;
}
.textareabox{
        clear: both;
        margin-top: 10px;
        background: #f5f7fa;
        color:#909399;
}
 .van-radio__input{
    height: 2rem;
}
   textarea {
        width:-webkit-calc(100% - 120px); 
        width:-moz-calc(100% - 120px); 
       width:calc(100% - 120px);
        font-size: 13px;
        border: 1px solid transparent;
        box-sizing: border-box;
    }
    .sucessBtn{
        width: 40%;
        margin: 20px 120px;
        background: #409eff;
        border: none;
    }
</style>
