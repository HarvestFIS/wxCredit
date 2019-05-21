<template>
    <div class="applyUnfreeze">
        <van-nav-bar title="解冻查看" left-text="返回" fixed :z-index="999" left-arrow @click-left="onClickLeft" />

        <un-freeze-container class="apply-tabs" v-bind:id="id"></un-freeze-container>
    </div>
</template>

<script>
import { NavBar, Tab, Tabs } from 'vant'
import unFreezeContainer from './unFreezeContainer.vue'
export default {
    name: 'applyUnfreeze',
    data() {
        return {
            tabActive: 'applyForm',
            id: ''
        }
    },
    components: { NavBar, Tab, Tabs, unFreezeContainer },
    created() {
        this.onLoad()
    },
    methods: {
        onLoad() {
            this.id = this.$route.query.id
        },
        onClickLeft() {
            this.$router.push({
                path: '/home', 
                query: {isloading: true}
            })
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
    // padding-top: 40px;
}
</style>
