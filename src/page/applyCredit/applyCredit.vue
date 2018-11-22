<template>
    <div class="applyCredit">
        <van-nav-bar title="上标申请流程" left-text="返回" fixed :z-index="999" left-arrow @click-left="onClickLeft" />
         <!--<van-tabs class="apply-tabs" type="card" color="#409eff" sticky>
            <van-tab title="表单">
                
            </van-tab>
           <van-tab title="流程图">
                流程图
            </van-tab>
            <van-tab title="状态">
                <apply-stauts></apply-stauts>
            </van-tab>
        </van-tabs>-->

        <apply-container v-bind:typeStatus="type" v-bind:id="id"></apply-container>
    </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import applyContainer from './applyContainer.vue'
import applyStauts from './applyStatus.vue'
export default {
    name: 'applyCredit',
    data() {
        return {
            tabActive: 'applyForm',
            type: 'hide',
            id: ''
        }
    },
    components: { NavBar, Tab, Tabs, applyContainer, applyStauts },
    created() {
        this.onLoad()
    },
    methods: {
        onLoad() {
            // 当前进页面是什么类型
            this.type = this.$route.query.type == 'look' ? 'hide' : 'show'
            this.id = this.$route.query.id
        },
        onClickLeft() {
            this.$router.push('/home')
        }
    }
}
</script>

<style lang="scss">
.applyCredit {
    overflow: hidden;
}
.apply-tabs {
    margin-top: 56px;
    padding-top: 40px;
}
</style>
