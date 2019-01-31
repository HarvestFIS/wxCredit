import fetch from './promise.js'
import { CONST_ROWS } from './constVar.js'


/* 获取appId */
export const findCorpId = () => fetch('/wxApproval/findCorpId')

/* 获取首页列表页数据 */
export const findBiddingApplyList = (params) => fetch('/wxApproval/findBiddingList', {
	page: params.page ? params.page : 1,
	rows: params.rows ? params.rows : CONST_ROWS,
	quotaNo: params.quotaNo ? params.quotaNo : '',
	customerName: params.customerName ? params.customerName : ''
})

/* 详情接口 */
export const findBiddingInfo = (id) => fetch('/wxApproval/findBiddingInfo', {
	id: id
})

/* 详情表单提交 */
export const biddingApproval = (params) => fetch('/wxApproval/biddingApproval', {
	"id": params.id,
	"nextStatus": params.nextStatus,
	"opinion": params.opinion,
	"serviceFeeFact": params.serviceFeeFact,
    "serviceFeeFactDate": params.serviceFeeFactDate
}, 'POST')

/* 微信登录 */
export const weixinLogin = (code) => fetch('/weixin/weixinLogin', {
	code: code
})

/* 查看详情接口 */
export const SeeInfos = (id) => fetch('/wxApproval/findShopMortgageInfo', {
	quotaId: id
})
/* 查案申请信息 */
export const SeePosttable = (params) => fetch('/wxApproval/shopApproval', {
	"quotaId": params.id,
	"nextStatus": params.nextStatus,
	"opinion": params.opinion
}, 'POST')

/* 指派风控经理 */
export const Zhipaimanager = (id) => fetch('/wxApproval/findAssignRiskMangerInfo', {
	quotaId: id
})

/* 确认指派风控 */
export const  DetermineBtn= (id,torId) => fetch('/wxApproval/assignRiskManger', {
    id: id,
    riskManagerBackOperatorId:torId
})

/* 授信列表 */
export const findListZhipai = (params) => fetch('/wxApproval/findQuotaApprovalList', {
	page: params.page ? params.page : 1,
	rows: params.rows ? params.rows : CONST_ROWS,
	quotaNo: params.quotaNo ? params.quotaNo : '',
	customerName: params.customerName ? params.customerName : ''
})

/* 资产表单 */
export const findLoanAssetReportTable = (date,dateEnd) => fetch('/wxReport/findLoanAssetReport', {
    dateStr: date,
    dateEnd:dateEnd
})
// 资产月付息预期提醒报表
export const InterestOverdue = () => fetch('/wxReport/findLoanAssetInterestOverdue')

/* 待发标 */
export const biddingShopsMortgage = (id) => fetch('/wxApproval/biddingShopsMortgage', {
	biddingId: id
})






