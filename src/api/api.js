import fetch from './promise.js'
import { CONST_ROWS } from './constVar.js'


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

export const biddingApproval = (params) => fetch('/wxApproval/biddingApproval', {
	id: params.id,
	nextStatus: params.nextStatus,
	opinion: params.opinion
})

