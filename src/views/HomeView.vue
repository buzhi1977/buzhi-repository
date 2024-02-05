<template>
  <div class="home">
    <el-row>
      <el-col :span="8" style="padding-right: 10px;">
        <el-card class="box-card">
          <div class="user">
            <img src="../assets/image/user.png">
            <div class="userInfo">
              <p class="name">{{username}}</p>
              <p class="access">{{ username=='admin'?'超级管理员':'普通用户' }}</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间：<span>2024-1-10</span></p>
            <p>上次登录地点：<span>北京</span></p>
          </div>
        </el-card>
        <el-card style="margin-top: 20px;height: 100%;">
          <el-table :data="tableData" style="width: 100%">
            <!-- <el-table-column prop="name" label="课程">
            </el-table-column>
            <el-table-column prop="todayBuy" label="今日购买">
            </el-table-column>
            <el-table-column prop="monthBuy" label="本月购买">
            </el-table-column>
            <el-table-column prop="totalBuy" label="总购买">
            </el-table-column> -->
            <el-table-column v-for="(item, ind) in tableLabel" :prop="ind" :label="item"></el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="num">
          <el-card v-for="item in countData" :key="item.name" :body-style="{ display: 'flex' }">
            <i :class="`el-icon-${item.icon}`" :style="{ background: item.color }"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}<br></p>
              <p class="desc">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <el-card style="height: 260px;">
          <div ref="echartsLine" style="height: 260px;margin-left: 15%;"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 200px"><div ref="echartsBar" style="height: 190px;margin:4% auto auto 2%;"></div></el-card>
          <el-card style="height: 200px"><div ref="echartsPie" style="height: 190px;margin-left: 8%;"></div></el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getData } from '../api'
import * as echarts from 'echarts'
export default {
  name: 'HomeView',
  data() {
    return {
      username:'',
      tableData: [{
        name: 'oppo',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: 'vivo',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '苹果',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '小米',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '三星',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      },
      {
        name: '魅族',
        todayBuy: 100,
        monthBuy: 300,
        totalBuy: 800
      }],
      tableLabel:
      {
        name: "课程",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
      },
      countData: [
        {
          name: "今日支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "今日收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "今日未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
        {
          name: "本月支付订单",
          value: 1234,
          icon: "success",
          color: "#2ec7c9",
        },
        {
          name: "本月收藏订单",
          value: 210,
          icon: "star-on",
          color: "#ffb980",
        },
        {
          name: "本月未支付订单",
          value: 1234,
          icon: "s-goods",
          color: "#5ab1ef",
        },
      ],
    }
  },
  mounted() {
    this.username=localStorage.getItem('username')
    // getData().then((data)=>{
    //   console.log("=======getData",data)
    // })
    //折线图
    const orderData = {
      data: [
        { '苹果': 2493, 'vivo': 3031, 'oppo': 3961, '魅族': 7239, '三星': 4859, '小米': 4570 },
        { '苹果': 5964, 'vivo': 7087, 'oppo': 2256, '魅族': 4411, '三星': 3003, '小米': 1023 },
        { '苹果': 3281, 'vivo': 1252, 'oppo': 912, '魅族': 3472, '三星': 7140, '小米': 2563 },
        { '苹果': 3427, 'vivo': 4429, 'oppo': 1556, '魅族': 1385, '三星': 3492, '小米': 3340 },
        { '苹果': 2296, 'vivo': 931, 'oppo': 5054, '魅族': 2580, '三星': 3854, '小米': 829 },
        { '苹果': 4744, 'vivo': 5189, 'oppo': 3802, '魅族': 4555, '三星': 6939, '小米': 5170 },
        { '苹果': 6375, 'vivo': 6529, 'oppo': 4403, '魅族': 4625, '三星': 5215, '小米': 4270 }
      ],
      date: ['20191001', '20191002', '20191003', '20191004', '20191005', '20191006', '20191007']
    };
    
    const echartsLine = echarts.init(this.$refs.echartsLine);
    var echarts1Option = {};
    const xAxis = Object.keys(orderData.data[0])
    const xAxisData = {
      data: xAxis
    }
    echarts1Option.xAxis = xAxisData
    echarts1Option.yAxis = {}
    echarts1Option.legend = xAxisData
    echarts1Option.series = []
    xAxis.forEach(key => {
      echarts1Option.series.push({
        name: key,
        data: orderData.data.map(item => item[key]),
        type: 'line'
      })
    })
    // console.log("===========echarts1Option",echarts1Option)
    // 使用刚指定的配置项和数据显示图表。
    echartsLine.setOption(echarts1Option)

    //柱状图
    const userData = [
      {date: '周一',new: 5, active: 200},
      {date: '周二',new: 10,active: 500},
      {date: '周三',new: 12,active: 550},
      {date: '周四',new: 60,active: 800},
      {date: '周五',new: 65,active: 550},
      {date: '周六',new: 53,active: 770},
      {date: '周日',new: 33,active: 170}
    ];
    const echartsBar = echarts.init(this.$refs.echartsBar);
    const eachrts2Option = {
      legend: {
        // 图例文字颜色
        textStyle: {
          color: "#333",
        },
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      xAxis: {
        type: "category", // 类目轴
        data: userData.map((item) => item.date),
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de"],
      series: [
        {
          name: "新增用户",
          data: userData.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userData.map((item) => item.active),
          type: "bar",
        },
      ],
    };
    echartsBar.setOption(eachrts2Option);

    // 饼状图
    const videoData=[
          {name: '小米',value: 2999},
          {name: '苹果',value: 5999},
          {name: 'vivo',value: 1500},
          {name: 'oppo',value: 1999},
          {name: '魅族',value: 2200},
          {name: '三星',value: 4500}
        ];
    const echartsPie = echarts.init(this.$refs.echartsPie);
    const eachrts3Option = {
      tooltip: {
        trigger: "item",
      },
      color: [
        "#0f78f4",
        "#dd536b",
        "#9462e5",
        "#a6a6a6",
        "#e1bb22",
        "#39c362",
        "#3ed1cf",
      ],
      series: [
        {
          data: videoData,
          type: "pie",
        },
      ],
    };
    echartsPie.setOption(eachrts3Option);
  }
}
</script>
<style lang="less" scoped>
.user {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid #999999;

  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin-right: 40px;
  }

  .userInfo {

    .name {
      font-size: 32px;
      margin-bottom: 10px;
    }

    .access {
      color: #999999;
    }
  }
}

.login-info {
  p {
    line-height: 28px;
    font-size: 14px;
    color: #999999;

    span {
      color: #666666;
      margin-left: 60px;
    }
  }
}

.num {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .el-card {
    width: 32%;
    margin-bottom: 10px;

    // margin-right: 5px;
    ::v-deep .el-card__body {
      padding: 10px;
    }
  }

  i {
    height: 40px;
    width: 40px;
    font-size: 30px;
    text-align: center;
    line-height: 40px;
    color: #fff;
  }

  .detail {
    margin-left: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    .price {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .desc {
      font-size: 10px;
      color: #999999;
      text-align: center;
    }
  }
}

.graph {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;

  .el-card {
    width: 48%;
    height: 220px;
  }
}
</style>
