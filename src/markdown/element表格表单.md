![](https://img2022.cnblogs.com/blog/2483371/202205/2483371-20220511110800913-1756692138.png)


```
<!-- 报名信息填报 -->
<template>
  <div class="container-box">
    <el-form ref="form" :rules="rules" show-message :inline-message="true" :model="form" label-width="250px" class="form" size="mini">
      <el-row>
        <el-col :span="12">
          <el-form-item label="姓名:" prop="name">
            <el-input v-model="form.name" placeholder="请输入姓名"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="证件类型:">
            <el-select v-model="form.paperWorkType" placeholder="请选择">
              <el-option v-for="item in paperWorkOptions" :key="item.value" :label="item.label" :value="item.value"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="证件号码：">
            <el-input v-model="form.idCard" placeholder="请输入证件号码"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="性别：">
            <el-select v-model="form.sex" placeholder="请选择">
              <el-option key="0" label="女" value="0"></el-option>
              <el-option key="1" label="男" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="出生日期：">
            <el-date-picker v-model="form.birthDay" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions" @change="birthDayChoose"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="年龄：">
            <el-input v-model="form.age" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="报考级别：">
            <el-select v-model="form.applyLevel" placeholder="请选择">
              <el-option key="0" label="初级" value="0"></el-option>
              <el-option key="1" label="中级" value="1"></el-option>
              <el-option key="2" label="高级" value="1"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="报考资格：">
            <el-select v-model="form.applyQualifications" placeholder="请选择">
              <el-option key="0" label="软件设计师" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="报考科目：">
            <el-select v-model="form.applySubject" placeholder="请选择">
              <el-option key="0" label="基础知识应用技术" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="现有职称（资格）：">
            <el-input v-model="form.jobTitle"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="取得职称（资格）时间：">
            <el-date-picker v-model="form.jobTitleTime" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="在职情况：">
            <el-input v-model="form.onWork"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="工作单位：">
            <el-input v-model="form.workUnit"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="参加工作时间：">
            <el-date-picker v-model="form.onWorkTime" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="本专业工作时间：">
            <el-date-picker v-model="form.majorWorkTime" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="所在学校：">
            <el-input v-model="form.currentSchool"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="所学专业：">
            <el-input v-model="form.discipline"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="毕业时间：">
            <el-date-picker v-model="form.graduationTime" value-format="yyyy-mm-dd" type="date" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="专业名称：">
            <el-input v-model="form.disciplineName"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="在学/已有学历：">
            <el-select v-model="form.education" placeholder="请选择">
              <el-option key="0" label="本科" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="学制：">
            <el-select v-model="form.educationalType" placeholder="请选择">
              <el-option key="0" label="四年" value="0"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="学位：">
            <el-input v-model="form.educationalLevel"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-form-item label="通讯地址：">
            <el-input v-model="form.address"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="邮箱：">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="手机号码：">
            <el-input v-model="form.phone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-form-item label="固定电话：">
            <el-input v-model="form.fixedTelephone"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="邮政编码：">
            <el-input v-model="form.zipCode"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-row type="flex" justify="center">
      <button class="submitButton btn" @click="submit()">提交</button>
      <button class="resetButton btn" @click="reset()">重置</button>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'informationFill',
  components: {
  },
  data () {
    return {
      form: {
        name: '',//姓名
        paperWorkType: '',//证件类型
        idCard: '',//证件号码
        birthDay: '',//出生日期
        age: '',//年龄
        applyLevel: '',//报考级别
        applyQualifications: '',//报考资格
        applySubject: '',//报考科目
        jobTitle: '',//现有职称（资格）
        jobTitleTime: '',//取得职称（资格）时间
        onWork: '',//在职情况
        workUnit: '',//工作单位
        onWorkTime: '',//参加工作时间
        majorWorkTime: '',//本专业工作时间
        currentSchool: '',//所在学校
        discipline: '',//所学专业
        graduationTime: '',//毕业时间
        disciplineName: '',//专业名称
        education: '',//在学/已有学历
        educationalType: '',//学制
        educationalLevel: '',//学位
        address: '',//通讯地址
        email: '',//邮箱
        phone: '',//手机号
        fixedTelephone: '',//固定电话
        zipCode: '',//邮政编码
      },
      paperWorkOptions: [{
        value: '1',
        label: '居民身份证/社保卡'
      },],
      pickerOptions: {
        disabledDate (time) {
          // 设置禁用状态，参数为当前日期，要求返回 Boolean
          return time.getTime() > Date.now()
        }
      },
      rules: {
        name: [{ required: true, message: '请输入姓名', trigger: 'blur' }]

      }

    }
  },
  props: {},
  computed: {},
  watch: {},
  created () { },
  mounted () { },
  methods: {
    birthDayChoose (val) {
      if (val) {
        this.form.age = Number(new Date().getFullYear()) - Number(val.substring(0, 4))
      } else {
        this.form.age = ''
      }
    },
    submit () {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$message({
            type: 'success',
            message: '提交成功!'
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })

    },
    reset () {
      this.$confirm('此操作将会重置所有信息, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$message({
          type: 'success',
          message: '重置成功!'
        })
        this.$refs.form.resetFields()
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消重置'
        })
      })
    }

  },
}

</script>

<style lang='scss' scoped>
.btn {
  margin-top: 30px;
  width: 120px;
  height: 40px;
  border-radius: 24px;
  font-size: 16px;
  color: #fff;
  border: none;
  line-height: 40px;
  cursor: pointer;
}
.submitButton {
  background-color: #00d2a4;
  margin-right: 10px;
}
.resetButton {
  background-color: #feb434;
  margin-left: 10px;
}
::v-deep.container-box .form {
  border-left: 1px solid #ccc;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
  border-bottom: 1px solid #ccc;
}
//去除组件下边距，设置为0
::v-deep.container-box .el-form-item {
  margin: 0;
  height: 40px;
  border-right: 1px solid #ccc;
  border-top: 1px solid #ccc;
}
::v-deep.container-box .el-input {
  width: 200px;
}
::v-deep.container-box .el-input__inner {
  border: #fff;
}
//label文字居中，背景色灰色，文字颜色黑色，右边框浅灰色
::v-deep.container-box .el-form-item__label {
  //   background: #f0f0f0;
  color: black;
  height: 40px;
  line-height: 40px;
  border-right: 1px solid #ccc;
}
::v-deep.container-box .el-form-item__content {
  height: 40px;
  line-height: 40px;
}
//改变input框中文字 居中，在禁用时背景色使用白色，文字颜色黑色
::v-deep.container-box .el-input.is-disabled .el-input__inner {
  background: #fff;
  color: black;
}
// //改变input框中文字 居中，在不禁用时背景色使用白色，文字颜色黑色
// ::v-deep.container-box .el-input .el-input__inner {
//   text-align: center;
//   background: #fff;
//   color: black;
// }
</style>

```