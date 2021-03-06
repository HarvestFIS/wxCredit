import Vue from 'vue'

Vue.filter('preStatus', (status) => {
    let params = {
        bidding_apply: '经办人员',
        bidding_business_manage: '业务总监',
        bidding_risk_wait: '风控经理',
        bidding_risk_manage: '风控总监',
        bidding_general_manage: '分管副总',
        bidding_edit: '运营编辑',
        bidding_operate_manage: '运营总监',
        bidding_ceo: 'CEO',
        bidding_finance: '财务审核',
        bidding_wait: '运营发标',
        bidding_approval: "运营发标",
        bidding_reject: "运营发标",
        bidding_shelve: "运营发标"
    }
    return params[status]
})


Vue.filter('creditStatus', (status) => {
    let params = {
        bidding_business_manage: '待业务总监审核',
        bidding_risk_wait: '待风控经理审核',
        bidding_risk_manage: '待风控总监审核',
        bidding_general_manage: '待分管副总审核',
        bidding_operate_manage: '待运营总监审核',
        bidding_ceo: '待CEO审核',
        bidding_finance: '待财务审核',
        bidding_wait: '待运营发标',
        bidding_apply: '申请中',
        bidding_edit: '待运营编辑',
        bidding_approval: "待运营发标",
        bidding_reject: "待运营发标",
        bidding_shelve: "待运营发标"
    }
    return params[status]
})

Vue.filter('formatTime', (dateTime) => {
    if (dateTime == null) {
        return ""
    }
    let date = new Date(dateTime)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
    let D = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()
    let hh = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()
    let mm = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()
    let ss = date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds()
    return Y + '-' + M + '-' + D;
});

Vue.filter('formatTimeAll', (dateTime) => {
    if (dateTime == null) {
        return ""
    }
    let date = new Date(dateTime)
    let Y = date.getFullYear()
    let M = (date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)
    let D = date.getDate() < 10 ? ("0" + date.getDate()) : date.getDate()
    let hh = date.getHours() < 10 ? ("0" + date.getHours()) : date.getHours()
    let mm = date.getMinutes() < 10 ? ("0" + date.getMinutes()) : date.getMinutes()
    let ss = date.getSeconds() < 10 ? ("0" + date.getSeconds()) : date.getSeconds()
    return Y + '-' + M + '-' + D + ' ' + hh + ':' + mm + ':' + ss;
});

Vue.filter('assetstableType', (status) => {
    if(status == 'PERSONNEL'){
        return  '小微'
    }else{
        return  '供应链'
    }
})

Vue.filter('unfreezeToCN', (status) => {
    let params = {
        unfreeze_apply: "解冻申请",
        unfreeze_finance: "财务审核",
        unfreeze_risk_wait: "风控经理审核",
        unfreeze_risk_manage: "风控总监审核",
        unfreeze_success: "通过",
        unfreeze_reject: "拒绝"
    }
    return params[status]
})
