<template>
    <div class="header-container">
        <div class="l-content">
            <el-button icon="el-icon-menu" size="mini" @click="handleMenu"></el-button>
            <!-- 面包屑 -->
            <el-breadcrumb separator="/">
                <el-breadcrumb-item v-for="(item,index) in tabList" :key="item.path">
                    <a v-if="index==0" @click.prevent="handleLink(item)">{{ item.label }}</a>
                    <span v-else class="no-redirect">{{ item.label }}</span>
                </el-breadcrumb-item>
               
               
            </el-breadcrumb>
        </div>
        <div class="r-content">
            <el-dropdown @command="handleCommand">
                <span class="el-dropdown-link">
                    <img class="user" src="../assets/image/user.png">
                </span>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item>个人中心</el-dropdown-item>
                    <el-dropdown-item command="logout">退出</el-dropdown-item>
                </el-dropdown-menu>
                </el-dropdown>
        </div>
    </div>
</template>
  
<script>

export default {
    data() {
        return {}
    },
    methods:{
        handleMenu(){
            this.$store.commit("changeCollapse")
        },
        handleLink(item){
            if(item.path){
                this.$router.push(item.path)
                this.$store.commit("selectMenu", item);
            }
        },
        handleCommand(command){
            if(command==='logout'){
                localStorage.removeItem('token')
                localStorage.removeItem('username')
                sessionStorage.removeItem('menu')
                this.$router.push({name:'login'})
            }
            
        }
    },
    computed:{
        tabList(){           
            return this.$store.state.tab.tabList;
        }
    }

}
</script>
<style lang="less" scoped>
.header-container {
    padding: 0 20px;
    background-color: #333;
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header-container span {
    color: #fff;
    font-size: 14px;
    margin-left: 10px;
}

.header-container .r-content .user {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    }

.header-container .l-content {
    display: flex;
    align-items: center;
}

::v-deep .header-container .l-content .el-breadcrumb__item .el-breadcrumb__inner {
    font-weight: normal;
    // ::v-deep a{
    //     color: #409EFF !important;
    //     // color: aliceblue;
    // }
}

::v-deep .header-container .l-content .el-breadcrumb__item .el-breadcrumb__inner &.is-link {
    color: #666;
}
::v-deep .header-container .l-content .el-breadcrumb__item &:last-child .el-breadcrumb__inner {
    color: #fff;
    
}
::v-deep .el-breadcrumb__inner a{
        color: #409EFF !important;
        // color: aliceblue;
    }
    </style>