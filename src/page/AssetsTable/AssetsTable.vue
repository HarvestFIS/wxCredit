<template>
        <div class="asstetstable">
          <table id="table1">
              <tr>
                 <th style="width:10px;">部门</th>
                 <th style="width:50px;">性质</th>
                 <th>基础资产</th>
                 <th style="width:50px;">借款金额</th>
                 <th style="width:50px;">兑付金额</th>
                 <th style="width:70px;">原到期日</th>
              </tr>
               <tr v-for="item in listTbale.biz" :key="item.name" >
                 <td>{{item.bizPersonnelType | assetstableType}}</td>
                 <td>{{item.titleItem}}</td>
                 <td>{{item.title}}</td>
                 <td>{{item.loanAmount}}万</td>
                 <td>{{item.paymentAmount}}万</td>
                 <td>{{item.endTime | formatTime}}</td>
              </tr>
             
              <tr class="bac">
                  <td colspan="3">合计</td>
                  <td>{{listTbale.loanAmount}}万</td>
                  <td>{{listTbale.paymentAmount}}万</td>
                  <td></td>
              </tr>
          </table>
        </div>
</template>
<script>
    import {findLoanAssetReportTable } from 'api/api'
import { Toast,Dialog } from 'vant'

     
     export default {
        data () {
            return {
                dateStr:this.$router.currentRoute.query.dateStr,
                dateEnd:this.$router.currentRoute.query.dateEnd,
                listTbale:{}
            }
        },
        methods: {
            onload(){
                Toast({
                    type: 'loading',
                    mask: true,
                    message: '加载中...'
                })
                findLoanAssetReportTable(this.dateStr,this.dateEnd)
                .then((res)=>{
                  Toast.clear()
                  if(res.data.biz.length<=0){
                    Dialog.alert({
                        title: '提示',
                        message: '没有数据'
                    })
                    return 
                  }
                   res.data.biz.map((data)=>{
                       data.loanAmount = ( data.loanAmount / 10000).toFixed(2);
                       data.paymentAmount =  (data.paymentAmount / 10000).toFixed(2);

                       if(data.assetsOfCompany){
                           if(data.channelTitle == null){
                              data.titleItem  = data.assetsOfCompany;
                           }else{
                                data.titleItem  = data.assetsOfCompany+"－" + data.channelTitle;
                           }
                       }else{
                            data.titleItem  =  data.channelTitle;
                       }
                
                   })
                   res.data.loanAmount = (res.data.loanAmount / 10000).toFixed(2);
                   res.data.paymentAmount = (res.data.paymentAmount / 10000).toFixed(2);
                 
                   this.listTbale = res.data;
         
                })
            },
            dateTimeFun(dateTime){
                let date = new Date(dateTime)
                let Y = date.getFullYear()
                let M = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
                let D = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()
                return Y + '-' + M + '-' + D ;
            },
            init(){
                //多级次动态合并表格行  
                var tb=document.getElementById('table1');
                var i = 0;
                var j = 0;
                var rowCount = tb.rows.length -1; //   行数 
                var colCount = tb.rows[0].cells.length; //   列数 
              
                var obj1 = null;
                var obj2 = null;
                var obj3 = null;
                    //为每个单元格命名 
                    for (i = 0; i < rowCount; i++) {
                        for (j = 0; j < colCount; j++) {
                            tb.rows[i].cells[j].id = "tb__" + i.toString() + "_" + j.toString();
                        }
                    }
                    //合并行  （列循环）第一行第一列均从0开始
                    for (i = 0; i < colCount; i++) {
                        //如果第3，4，5列不进行合并操作x
                        if (i == 2 || i == 3 || i == 4) continue;
                        obj1 = document.getElementById("tb__0_" + i.toString())
                        //（行循环）
                        for (j = 1; j < rowCount; j++) {
                            obj2 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                            if(i == 0){         //第1列全部进行合并操作
                                if (obj1.innerText == obj2.innerText) {     //判断值是否相等
                                    obj1.rowSpan++;                         //合并行
                                    obj2.parentNode.removeChild(obj2);      //移除被合并的行
                                } else {
                                    obj1 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                                }
                             
                            }else if(i == 5){   //第6列合并操作参照第2列，第二列合并了，第5列才进行合并
                                obj3 = document.getElementById("tb__" + j.toString() + "_" + (i-4).toString());
                              
                                if (obj1.innerText == obj2.innerText && obj3 == null) {
                                    obj1.rowSpan++;
                                    obj2.parentNode.removeChild(obj2);
                                } else {
                                    obj1 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                                }
                            }else{              //只有前一列进行了合并操作后面的才会进行合并操作
                                obj3 = document.getElementById("tb__" + j.toString() + "_" + (i-1).toString());
                                if (obj1.innerText == obj2.innerText && obj3 == null) {
                                    obj1.rowSpan++;
                                    obj2.parentNode.removeChild(obj2);
                                } else {
                                    obj1 = document.getElementById("tb__" + j.toString() + "_" + i.toString());
                                }
                              
                            }
                        }
                    }
            }
        },
        mounted() {
            this.onload();
        },
        updated(){
              this.init();
        }
     }
</script>
<style lang="scss">
 #table1 tr.bac td{
        height:30px; 
        background:#bd8f2d;
    }
.asstetstable{
        width: 100%;
        font-size: 12px;
    #table1{
        border-collapse:collapse;
        width: 100%;
        font-size: 12px;
        border: 2px solid #999;
        text-align: center;
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
            #tb__2_2,#tb__2_3,#tb__2_4{
            background: #eee;
            }
            #tb__4_2,#tb__4_3,#tb__4_4{
            background: #eee;
            }
            #tb__6_2,#tb__6_3,#tb__6_4{
            background: #eee;
            }
            #tb__8_2,#tb__8_3,#tb__8_4{
            background: #eee;
            }
            #tb__10_2,#tb__10_3,#tb__10_4{
            background: #eee;
            }
            #tb__12_2,#tb__12_3,#tb__12_4{
            background: #eee;
            }
            #tb__14_2,#tb__14_3,#tb__14_4{
            background: #eee;
            }
            #tb__16_2,#tb__16_3,#tb__16_4{
            background: #eee;
            }
            #tb__18_2,#tb__18_3,#tb__18_4{
            background: #eee;
            }
            #tb__20_2,#tb__20_3,#tb__20_4{
            background: #eee;
            }
            #tb__22_2,#tb__22_3,#tb__22_4{
            background: #eee;
            }
            #tb__24_2,#tb__24_3,#tb__24_4{
            background: #eee;
            }
            #tb__26_2,#tb__26_3,#tb__26_4{
            background: #eee;
            }
            #tb__28_2,#tb__28_3,#tb__28_4{
            background: #eee;
            }

            #tb__30_2,#tb__30_3,#tb__30_4{
            background: #eee;
            }
            #tb__30_2,#tb__30_3,#tb__30_4{
            background: #eee;
            }
            #tb__30_2,#tb__30_3,#tb__30_4{
            background: #eee;
            }

            #tb__32_2,#tb__32_3,#tb__32_4{
            background: #eee;
            }
            #tb__34_2,#tb__34_3,#tb__34_4{
            background: #eee;
            }
            #tb__36_2,#tb__36_3,#tb__36_4{
            background: #eee;
            }
            #tb__38_2,#tb__38_3,#tb__38_4{
            background: #eee;
            }
            #tb__40_2,#tb__40_3,#tb__40_4{
            background: #eee;
            }
            #tb__42_2,#tb__42_3,#tb__42_4{
            background: #eee;
            }
            #tb__44_2,#tb__44_3,#tb__44_4{
            background: #eee;
            }

            #tb__46_2,#tb__46_3,#tb__46_4{
            background: #eee;
            }
            #tb__48_2,#tb__48_3,#tb__48_4{
            background: #eee;
            }
            #tb__50_2,#tb__50_3,#tb__50_4{
            background: #eee;
            }
        }
       

    }

}



</style>
