<template>
    <div class="wxHome">
        <van-nav-bar class="dark_header" title="上标申请列表" fixed :z-index="999" />
        <van-search class="home-search" placeholder="请输入授信编号或者客户名称" background="#fff" show-action v-model="searchValue" @search="onSearch">
            <div slot="action" @click="onSearch">搜索</div>
        </van-search>
        <div class="home-list">
            <div class="home-list-header">
                <span>授信编号</span>
                <span>客户名称</span>
                <span>授信状态</span>
                <span>操作</span>
            </div>

            <van-list v-model="loading" :finished="finished">
                <van-cell v-for="item in list" v-bind:key="item.no" class="home-item-content">
                    <span>{{ item.quotaNo }}</span>
                    <span>{{ item.customerName }}</span>
                    <span>{{ item.statusName }}</span>
                    <span>
                        <router-link v-if="item.hasWorkflowRight" style="margin-right: 8px;" :to="{ name: 'applyCredit', query: { type: 'edit', id: item.id }}">上标审核</router-link>
                        <router-link :to="{ name: 'applyCredit', query: { type: 'look', id: item.id }}">查看</router-link>
                    </span>
                </van-cell>
            </van-list>
        </div>
    </div>
</template>

<script>
import { NavBar, Search, List, Cell, Toast } from 'vant'
import { findBiddingApplyList } from "api/api"
import { CONST_ROWS } from "api/constVar"
export default {
    name: 'wxHome',
    data() {
        return {
            searchValue: '',
            loading: false,
            finished: false,
            list: [],
            page: 1
        }
    },
    components: { NavBar, Search, List, Cell, Toast },
    created() {
        this.onLoad()
    },
    methods: {
        onSearch() {
            Toast({
                mask: true,
                type: 'loading',
                message: '加载中...' 
            })
            this.list = [] // 清空数据
            // 授信编号 quotaNo 客户名称customerName
            let params = {
                page: 1, // 初始化页数
                rows: CONST_ROWS,
                quotaNo: '',
                customerName: ''
            }
            let reg = new RegExp('[\u4E00-\u9FA5]')
            if(reg.test(this.searchValue)) {
               params.quotaNo = ''
               params.customerName = this.searchValue
            } else {
                params.quotaNo = this.searchValue
                params.customerName = ''
            }
            findBiddingApplyList(params).then((result) => {
                Toast.clear()
                let data = result.data
                for(let i = 0; i < data.rows.length; i++) {
                    this.list.push(data.rows[i])
                }
                this.loading = false
                if(data.total <= (this.page * CONST_ROWS)) {
                    this.finished = true
                }
                this.page++;
            }).catch((err) => {
                console.log(err)
            })
        },
        onLoad() {
            // 初始化页数
            this.page = 1
            findBiddingApplyList({page: this.page}).then((result) => {
                let data = result.data
                for(let i = 0; i < data.rows.length; i++) {
                    this.list.push(data.rows[i])
                }
                this.loading = false
                if(data.total <= (this.page * CONST_ROWS)) {
                    this.finished = true
                }
                this.page++;
            }).catch((err) => {
                console.log(err)
            })
        }
    },
    destroy() {
        this.finished = false
        this.list = []
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/var.scss';
.content {
    height: 800px;
    background: #ccc;
    font-size: 18px;
}
.home-search {
    padding-top: 56px;
    .van-cell {
        background-color: #f4f4f4;
        border-radius: 20px;
    }
    border-bottom: 1px solid $borderColor;
}

.home-list {
    padding-top: 10px;
    .home-list-header {
        border-top: 1px solid $borderColor;
        display: flex;
        span {
            flex: 1;
            text-align: center;
            line-height: 38px;
            background: #f3f3ff;
            font-size: 13px;
            &:first-child {
                flex: 1.5;
            }
            &:last-child {
                flex: 1.5;
            }
        }
    }
    .home-item-content {
        padding: 10px 0;
        &:nth-child(odd) {
            background: #faffff
        }
        .van-cell__value {
            display: flex;
        }
        span {
            padding: 0 5px;
            flex: 1;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            &:first-child {
                flex: 1.5;
            }
            &:last-child {
                flex: 1.5;
            }
            a {
                color: $primaryColor;
            }
        }
    }
}
</style>


