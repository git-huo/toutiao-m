<template>
  <div class="box">
    <!-- 头部 -->
    <header>
      <div class="login" v-if="isLogin">
        <van-cell icon="shop-o" class="shop">
          <template #right-icon>
            <button @click="$router.push('/user')" class="round">
              编辑按钮
            </button>
          </template>
          <template #title>
            <div class="right-texe">{{ userInfo.name }}</div>
          </template>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #icon>
            <van-image
              round
              width="1.76rem"
              height="1.76rem"
              :src="userInfo.photo"
            />
          </template>
        </van-cell>
        <div class="vangrid">
          <van-grid class="icontext">
            <van-grid-item>
              <template #text>
                <div class="icontext1">头条</div>
              </template>
              <template #icon>
                <span>0</span>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="icontext1">粉丝</div>
              </template>
              <template #icon>
                <span>0</span>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="icontext1">关注</div>
              </template>
              <template #icon>
                <span>0</span>
              </template>
            </van-grid-item>
            <van-grid-item>
              <template #text>
                <div class="icontext1">获赞</div>
              </template>
              <template #icon>
                <span>0</span>
              </template>
            </van-grid-item>
          </van-grid>
        </div>
      </div>
      <div class="loginout" v-else>
        <div class="loginout-regicster">
          <van-image
            round
            width="1.76rem"
            height="1.76rem"
            :src="require('../../assets/images/mobile.png')"
          />
          <span class="login-text" @click="toLogin">登陆 / 注册</span>
        </div>
      </div>
    </header>
    <main>
      <div>
        <van-grid clickable :column-num="2">
          <van-grid-item text="收藏">
            <template #icon>
              <van-icon name="star-o" color="#ed5253" />
            </template>
          </van-grid-item>
          <van-grid-item text="历史">
            <template #icon>
              <van-icon name="underway-o" color="#ffb31d" />
            </template>
          </van-grid-item>
        </van-grid>
      </div>
      <div>
        <van-cell title="消息通知" is-link />
        <van-divider />
        <van-cell title="小智同学" is-link />
      </div>
    </main>
    <footer>
      <van-button
        color="rgba(95, 157, 243)"
        type="primary"
        block
        v-if="isLogin"
        @click="logout"
        class="text"
        >退出</van-button
      >
    </footer>
  </div>
</template>

<script>
import { getUserInfo } from '@/api'
import { Dialog } from 'vant'
export default {
  data() {
    return {
      userInfo: []
    }
  },

  created() {
    this.getUserInfo()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    async getUserInfo() {
      try {
        const { data } = await getUserInfo()
        this.userInfo = data.data
        console.log(this.userInfo)
      } catch (error) {
        this.$toast.fail('获取失败，请刷新')
      }
    },
    logout() {
      Dialog.confirm({
        title: '黑马头条',
        message: '是否确认退出此账号吗'
      })
        .then(() => {
          // on confirm
          //清除token
          this.$store.commit('SET_TOKEN', {})
        })
        .catch(() => {
          // on cancel
        })
    },
    toLogin() {
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  position: relative;
  width: 100%;
  height: 5.33333rem;
  background: url(../../assets/images/banner.png) no-repeat 50% / cover;
  :deep(.vangrid) {
    position: absolute;
    top: 265px;
    left: 0px;
    width: 100%;
    .icontext {
      font-size: 28px;
      color: #fff;
      .icontext1 {
        font-size: 28px;
        color: #fff;
      }
    }

    .van-grid-item__content {
      background-color: transparent;
    }
    [class*='van-hairline']::after {
      border: 0px;
    }
  }
}
:deep(.loginout) {
  font-size: 24px;
  .loginout-regicster {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 5.33333rem;
    background: url(../../assets/images/banner.png) no-repeat 50% / cover;
    .login-text {
      color: #fff;
      font-size: 0.4rem;
      margin-top: 0.26667rem;
    }
  }
}
.shop {
  align-items: center;
  height: 155px;
  position: absolute;
  top: 120px;
  background-color: transparent;
}
.van-cell::after {
  border-bottom: 0px;
}
.right-texe {
  margin-left: 30px;
}
:deep(.round) {
  width: 140px;
  height: 40px;
  line-height: 14px;
  color: #999;
  font-size: 0.16rem;
  border-radius: 0.4rem 0.4rem;
}
</style>
