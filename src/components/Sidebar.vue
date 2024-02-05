<template>
    <div>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
            <el-radio-button :label="false">展开</el-radio-button>
            <el-radio-button :label="true">收起</el-radio-button>
        </el-radio-group> -->
        <el-menu 
            default-active="2" 
            class="el-menu-vertical-demo"
            background-color="#545c64" 
            text-color="#fff"
            active-text-color="#ffd04b" 
            :collapse="isCollapse"
            router
        >
            <h3>{{ isCollapse ? "后台" : "通用后台管理系统" }}</h3>
            <el-menu-item  v-for="item in noChildren" :key="item.name" :index="item.path" @click="clickMenu(item)">
                <i :class="`el-icon-${item.icon}`"></i>
                <span slot="title">{{ item.label }}</span>
            </el-menu-item>
            <el-submenu v-for="item in hasChildren" :key="item.label" :index="item.label">
                <template slot="title">
                    <i :class="`el-icon-${item.icon}`"></i>
                    <span slot="title">{{ item.label }}</span>
                </template>
                <el-menu-item-group v-for="subItem in item.children" :key="subItem.path">
                    <el-menu-item :index="subItem.path" @click="clickMenu(subItem)">{{
                        subItem.label
                    }}</el-menu-item>
                </el-menu-item-group>
            </el-submenu>
        </el-menu>
    </div>
</template>
<style scoped>
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
}

.el-menu {
    height: 100vh;
    border-right: none;
}

.el-menu h3 {
    color: #fff;
    text-align: center;
    line-height: 48px;
    font-size: 16px;
    font-weight: 400;
}
</style>
<script>
export default {
    methods:{
        clickMenu(item){
            //在main.js中已经挂在router，此处可直接通过this.router获取当前页面的路由
            // 当页面的路由与跳转的路由不一致才允许跳转
            this.$store.commit("selectMenu", item);
        }
    },
    computed: {
        noChildren() {//没有子菜单
            return this.menuData.filter(item => !item.children)
        },
        hasChildren() {//有子菜单
            return this.menuData.filter(item => item.children)
        },
        isCollapse(){
            return this.$store.state.tab.isCollapse
        },
        menuData() {
            // 判断当前数据,如果缓存中没有,当前store中去获取
            return JSON.parse(sessionStorage.getItem("menu")) || this.$store.state.tab.menu;
        },
    },
   
}
</script>