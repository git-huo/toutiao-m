<template>
  <div>
    <!-- 头部导航 -->
    <van-nav-bar title="标题" />
    <!-- 表单/搜集手机号以及密码 -->
    <!-- 输入框：van-field包括密码框，文本框，文本域-->
    <van-form @submit="onSubmit" class="from" ref="from">
      <van-field
        v-model="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="mobileRules"
      >
        <template #label>
          <span class="toutiao toutiao-shouji1"></span> </template
      ></van-field>
      <van-field
        v-model="code"
        name="code"
        placeholder="请输入验证码"
        :rules="codeRules"
      >
        <template #label>
          <span class="toutiao toutiao-yanzhengma"></span>
        </template>
        <template #button>
          <van-button
            round
            size="mini"
            class="code-btn"
            native-type="button"
            v-if="isShowCode"
            @click="sendCode"
            >获取验证码</van-button
          >
          <van-count-down
            :time="60 * 1000"
            format="ss秒"
            @finish="isShowCode = true"
            v-else
          />
        </template>
      </van-field>
      <div style="margin: 0.42rem">
        <van-button block type="info" native-type="submit">登陆</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
//引入验证较正
import { codeRules, mobileRules } from './rules'
import { login, getCodeAPI } from '@/api/user'
export default {
  data() {
    return {
      mobile: '',
      code: '',
      // mobileRules：mobileRules
      mobileRules,
      codeRules,
      isShowCode: 'true'
    }
  },
  methods: {
    loading() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
    },
    async onSubmit() {
      this.loading()
      try {
        const {
          data: { data: token }
        } = await login(this.mobile, this.code)
        this.$store.commit('SET_TOKEN', token)
        //跳转到profile
        this.$router.push('/profile')
        this.$toast.success('登陆成功')

        console.log(token)
      } catch (error) {
        console.dir(error)
        const status = error.response.status
        let message = '请重新登陆'
        if (status === 400) {
          message = error.response.data.message
        }
        this.$toast.fail(message)
      }
    },
    sendCode() {
      //验证手机号
      this.$refs.from.validate('mobile').then(async () => {
        this.loading()
        try {
          await getCodeAPI(this.mobile)
          this.$toast.success('获取成功')
          //显示倒计时
          this.isShowCode = false
        } catch (error) {
          const status = error.response.status
          let message = '手机号不正确'
          if (status === 429) {
            message = error.response.data.message
          }
          this.$toast.fail(message)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
//穿透样式
//：deep（穿透的类名）
.van-nav-bar {
  background-color: #3296fa;
  :deep(.van-nav-bar__title) {
    color: #fff;
  }
}

:deep(.from) {
  .van-field__label {
    flex: 1;
  }
  .van-cell__value {
    flex: 20;
  }
  .toutiao {
    font-size: 40px;
  }
}
:deep(.code-btn) {
  &.van-button-mini {
    padding: 0 0.2rem;
  }
  &.van-button--default {
    background: #eee;
    color: #a9929b;
  }
}
</style>
