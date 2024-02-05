<template>
    <div class="tabs">
        <el-tag
            v-for="(item,index) in tabs"
            :key="item.path"
            :closable="item.name!=='home'"
            :effect="$route.name === item.name ? 'dark' : 'plain'"
            @click="changeMenu(item)"
            @close="handleClose(item,index)"
            >{{ item.label }}
        </el-tag>
    </div>
</template>
<script>
import { dataTool } from 'echarts';

 export default{
    name:"Tags",
    data(){
        return{

        }
    },
    computed:{
        tabs(){           
            return this.$store.state.tab.tabs;
        }
    },
    methods:{
        changeMenu(item){
            this.$router.push({name:item.name});
        },
        handleClose(item,index){
            this.$store.commit("closeMenu",item)
            const length = this.tabs.length
            // 删除之后的跳转逻辑
            if (item.name !== this.$route.name) {
                return
            }
            // 表示的是删除的最后一项
            if (index === length) {
                this.$router.push({
                    name: this.tabs[index - 1].name
                })
            } else {
                this.$router.push({
                    name: this.tabs[index].name
                })
            }
        }
    }
 }
</script>
<style lang="less" scoped>
.tabs {
    padding: 0 10px;
    .el-tag {
        margin-right: 15px;
        cursor: pointer;
    }
}
</style>