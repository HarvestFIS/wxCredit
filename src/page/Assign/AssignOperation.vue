<template>
        <div class="operationBox">
            <van-nav-bar class="dark_header" left-text="返回" title="指派风控经理" fixed left-arrow :z-index="999" @click-left="onClickLeft" />
            <div class="Apply_info">
                <h3 class="mb10 font14">申请基本明细：</h3>
                <table class="apply marginB10" border="1">
                        <tr>
                            <th>客户名称</th>
                            <td style="width: 90px;">{{dangqian}}</td>
                        </tr>
                </table>
            </div>
             <div class="Apply_info">
                <h3 class="mb10 font14">指派风控经理：</h3>
                <table class="apply marginB10" border="1">
                        <tr>
                            <th>用户名</th>
                            <td style="width: 90px;">
                                <span class="bor" @click="show = true">选择风控经理</span>
                            </td>
                        </tr>
                        <tr>
                            <th>姓名</th>
                            <td style="width: 90px;">{{username}}</td>
                        </tr>
                         <tr>
                            <th>手机号</th>
                            <td style="width: 90px;">{{useriphone}}</td>
                        </tr>
                         <tr>
                            <th>当前风控经理</th>
                            <!-- <td style="width: 90px;">{{currentname.realName}}</td> -->

                        </tr>
                          <tr>
                            <th>该客户历史指派风控经理</th>
                            <td style="width: 90px;">{{historyName}}</td>
                        </tr>
                </table>
            </div>
                 <van-button  @click = "submitBtn" class="sucessBtn" type="primary">确认指派</van-button>
                 <van-actionsheet   cancel-text="取消" v-model="show" :actions="selectItem" @select="onSelect"></van-actionsheet>
        </div>
</template>
<script>
import { Actionsheet,Dialog } from 'vant';
import { Zhipaimanager ,DetermineBtn} from 'api/api'
    export default{
        data(){
            return{
                names:'',
                show:false,
                id:this.$router.currentRoute.query.id,
                selectItem: [],
                currentname:{},
                username:'',
                useriphone:'',
                dangqian:'',
                historyName:"",
                torId:'',

            }
        },
        methods:{
            onClickLeft(){
                this.$router.push({ path: '/assigntablelist',query: {isloading: true}})
            },
             onSelect(item) {
            // 点击选项时默认不会关闭菜单，可以手动关闭
              this.show = false;
              this.username = item.name;
              this.useriphone = item.subname;
              this.torId = item.id;
            },
            load(){
                Zhipaimanager(this.id).then((res)=>{
                   res.data.riskMangers.map((data)=>{
                       data.name=data.realName;
                       data.subname=data.mobile;
                   })
                   if( res.data.currentRiskManger){
                   this.currentname=res.data.currentRiskManger;
                   }
                        this.selectItem = res.data.riskMangers;

                   this.dangqian = res.data.name;
                   let str = '';
                   if(res.data.historyRiskMangerRealNames.lenth >0){
                        this.historyName = res.data.historyRiskMangerRealNames
                       Object.keys(this.historyName).forEach((key,val)=>{
                           str += this.historyName[key];

                      })
                   }
                  

                }).catch((err)=>{
                     Dialog.alert({
                        title: '提示',
                        message: '系统错误，请刷新重试'
                    })
                })
            },
            submitBtn(){
                if(this.torId == ""){
                      Dialog.alert({
                        title: '提示',
                        message: "请选择风控经理"
                    })
                    return false;
                }
                DetermineBtn(this.id,this.torId).then((res)=>{
                    if(res.data.success){
                       Dialog.alert({
                        title: '提示',
                        message: '指派成功'
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
                 
                }).catch((err)=>{
                    Dialog.alert({
                        title: '提示',
                        message: '系统错误，请刷新重试'
                    })
                })
            }

        },
        created(){
            this.load();
        },
        components: {
            Actionsheet
        }
    }
</script>
<style lang="scss">

.dark_header{
    background: #fff !important;
    color: #000;
}
.operationBox{
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
.apply{
    width: 96%;
    font-size: 13px;
    margin: 0 auto 20px;
    border: 1px solid #ebeef5;;
}
.bor{
     color: #2c89fa;
    text-decoration: underline;
}
 .sucessBtn{
        width: 40%;
        margin: 20px 120px;
        background: #409eff;
        border: none;
    }

</style>
