<template>
  <div class="about">
    <el-container>
      <el-aside width="auto">
        <Sidebar />
      </el-aside>
      <el-container>
        <el-header>
          <Header></Header>
        </el-header>
        <!-- tag标签 -->
        <Tabs></Tabs>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import Sidebar from '../components/Sidebar.vue';
import Header from '../components/Header.vue';
import Tabs from '../components/Tabs.vue'

export default {
  name: 'AboutView',
  components: { Sidebar, Header, Tabs },
  beforeDestroy() {
    // 最后一步，离开页面的时候，清除缓存
    window.removeEventListener("click", () => { }, true);
    console.log("==============removeItem")
    for (let item in sessionStorage) {
      sessionStorage.removeItem(item)
    }
  },
}
</script>

<style scoped></style>