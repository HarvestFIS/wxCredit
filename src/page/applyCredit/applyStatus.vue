<template>
    <div class="applyStatus">
        <table class="apply" border="1">
            <thead>
                <tr>
                    <th rowspan="2">节点</th>
                    <th style="width: 50px;">操作者</th>
                    <th style="width: 50px;">状态</th>
                    <th>接收时间</th>
                </tr>
                <tr>
                    <th colspan="2">操作耗时</th>
                    <th>操作时间</th>
                </tr>
            </thead>
            <tbody>
                <template v-for="item in dataList">
                    <tr :key="item.id">
                        <td rowspan="2">{{ item.node }}</td>
                        <td>{{ item.headlers }}</td>
                        <td>{{ item.stauts }}</td>
                        <td>{{ item.receipeTime }}</td>
                    </tr>
                    <tr :key="item.node">
                        <td colspan="2">{{ item.operatingTime }}</td>
                        <td>{{ item.operationTime }}</td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'applyStatus',
    data() {
        return  {
            dataList: [{
                id: 1,
                node: '客户经理提报',
                headlers: '檀方',
                stauts: '已提交',
                operatingTime: '0秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 2,
                node: '运营总监',
                headlers: '王薇',
                stauts: '已提交',
                operatingTime: '32分10秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 3,
                node: '审查员',
                headlers: '兰宁洁',
                stauts: '已提交',
                operatingTime: '16秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 4,
                node: '风险总监',
                headlers: '陈强',
                stauts: '已提交',
                operatingTime: '3分20秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 5,
                node: '评审运行政助理',
                headlers: '杜思琪',
                stauts: '已提交',
                operatingTime: '23小时53分19秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 6,
                node: '总经理',
                headlers: '周小鸿',
                stauts: '已提交',
                operatingTime: '26分35秒',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            },{
                id: 7,
                node: '客户经理',
                headlers: '檀方',
                stauts: '已查看',
                operatingTime: '',
                operationTime: '2018-09-10 16-05-38',
                receipeTime: '2018-09-10 16-05-38'
            }]
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/var.scss';
</style>


