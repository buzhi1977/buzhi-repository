<template>
    <div class="manage">
      <el-dialog
        title="提示"
        :visible.sync="dialogVisible"
        width="50%"
        :before-close="cancel"
        :title="dialogTitle">
        <!-- 用户表单信息 -->
        <el-form
          ref="form"
          :rules="rules"
          :inline="true"
          :model="form"
          label-width="80px"
        >
          <el-form-item label="姓名" prop="name">
            <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input placeholder="请输入年龄" v-model="form.age"></el-input>
          </el-form-item>
          <el-form-item label="性别" prop="sex">
            <el-select v-model="form.sex" placeholder="请选择性别">
              <el-option label="男" :value="1"></el-option>
              <el-option label="女" :value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="出生日期" prop="birth">
            <el-date-picker
              v-model="form.birth"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-DD">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="地址" prop="addr">
            <el-input placeholder="请输入地址" v-model="form.addr"></el-input>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="cancel">取 消</el-button>
          <el-button type="primary" @click="submit('form')">确 定</el-button>
        </span>
      </el-dialog>
      <div class="manage-header">
        <el-button type="primary" @click="handleAdd">+新增</el-button>
      </div>
      <div class="common-tabel">
        <el-table stripe height="90%" :data="tableData" style="width: 100%">
          <el-table-column prop="name" label="姓名"> </el-table-column>
          <el-table-column prop="sex" label="性别">
            <template slot-scope="scope">
              <span>{{ scope.row.sex == 1 ? "男" : "女" }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="age" label="年龄"> </el-table-column>
          <el-table-column prop="birth" label="出生日期"> </el-table-column>
          <el-table-column prop="addr" label="地址"> </el-table-column>
          <el-table-column prop="addr" label="地址">
            <template slot-scope="scope">
              <el-button size="mini" @click="handleEdit(scope.row)"
                >编辑</el-button
              >
              <el-button
                type="danger"
                size="mini"
                @click="handleDelete(scope.row)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination
            layout="prev, pager, next"
            :total="total"
            @current-change="handlePage"
          >
          </el-pagination>
        </div>
      </div>
    </div>
    
</template>
  
  <script>
  
  export default {
    data(){
        return{
          dialogVisible:false,
          form: {
            name: "",
            age: "",
            sex: "",
            birth: "",
            addr: "",
          },
          rules: {
            name: [{ required: true, message: "请输入姓名" }],
            age: [{ required: true, message: "请输入年龄" }],
            sex: [{ required: true, message: "请选择性别" }],
            birth: [{ required: true, message: "请选择出生日期" }],
            addr: [{ required: true, message: "请输入地址" }],
          },
          tableData: [
            {name:"用户1",age:22,sex:1,birth:"2001-1-1",addr:"xx省xx市xx区xx街道"},
            {name:"用户2",age:23,sex:0,birth:"2000-2-1",addr:"xx省xx市xx区xx街道"},
            {name:"用户3",age:24,sex:1,birth:"1999-3-1",addr:"xx省xx市xx区xx街道"},
            {name:"用户4",age:25,sex:0,birth:"1998-4-1",addr:"xx省xx市xx区xx街道"},
            {name:"用户5",age:26,sex:1,birth:"1997-5-1",addr:"xx省xx市xx区xx街道"},
          ],
          total:5,
          dialogTitle:''
        }
    },
    methods:{
      cancel(){
        this.$refs.form.resetFields();
        this.dialogVisible = false;
      },
      submit(formName){
        this.$refs[formName].validate((valid) =>{
          if(valid){
            // 清空表单的数据
            this.$refs.form.resetFields();
            // 关闭弹窗
            this.dialogVisible = false;
          }else{}
        })
      },
      handleAdd(){
        this.dialogTitle='新增用户'
        this.dialogVisible = true;
      },
      handleEdit(){
        this.dialogTitle='编辑用户'
        this.dialogVisible = true;
      },
      handleDelete(){

      },
      handlePage(){

      }
    }
    
  }
  </script>
  <style lang="less" scoped>
  .manage {
    height: 90%;
    .manage-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .common-tabel {
      position: relative;
      height: calc(100% - 62px);
      .pager {
        position: absolute;
        bottom: 0;
        right: 20px;
      }
    }
  }
  </style>
  