<template>
  <div>
    <van-nav-bar class="navbar">
      <template #title>
        <van-button
          class="search-btn"
          icon="search"
          round
          @click="$router.push('/search')"
        >
          搜索</van-button
        >
      </template>
    </van-nav-bar>
    <van-tabs v-model="active" swipeable>
      <van-tab v-for="item in myChannels" :key="item.id" :title="item.name">
        <article-list :id="item.id"></article-list>
      </van-tab>
      <span class="toutiao toutiao-gengduo1" @click="show = true"></span>
    </van-tabs>
    <van-popup
      v-model="show"
      position="top"
      :style="{ height: '100%' }"
      closeable
      close-icon-position="top-left"
    >
      <channel-popup
        :myChannels="myChannels"
        @close="show = false"
        @change-active="active = $event"
        @del-channel="delChannel"
        @add-channel="addChannel"
      >
      </channel-popup>
    </van-popup>
  </div>
</template>

<script>
import {
  getMyChannel as getMyChannelAPI,
  delChannel,
  addChannel,
  setMyChannerlToLocal,
  getMyChannerlByLocal
} from '@/api'
import ArticleList from './components/ArticleList.vue'
import ChannelPopup from './components/ChannelPopup.vue'
export default {
  components: { ArticleList, ChannelPopup },
  name: 'Home',
  data() {
    return {
      active: 0,
      myChannels: [],
      show: false
    }
  },
  created() {
    this.initMyChannels()
  },
  computed: {
    isLogin() {
      return !!this.$store.state.tokenObj.token
    }
  },
  methods: {
    //初始化mychannel数据
    initMyChannels() {
      if (this.isLogin) {
        //用户登陆了
        this.getMyChannel()
      } else {
        //用户未登录
        const MyChannels = getMyChannerlByLocal()
        if (MyChannels) {
          //本地储存有数据，从本读储存拿
          this.myChannels = MyChannels
        } else {
          //本地储存没有数据，获取默认数据
          this.getMyChannel()
        }
      }
    },

    async getMyChannel() {
      try {
        const { data } = await getMyChannelAPI()
        console.log(data.data.channels)
        this.myChannels = data.data.channels
      } catch (error) {
        console.dir(error)
        this.$toast.fail('获取频道失败，请刷新')
      }
    },
    //删除频道
    async delChannel(id) {
      this.$toast.loading({
        message: '正在删除频道...',
        forbidCick: true
      })
      try {
        const newChannels = this.myChannels.filter((item) => item.id !== id)
        if (this.isLogin) {
          // this.myChannels = newChannels
          await delChannel(id)
        } else {
          setMyChannerlToLocal(newChannels)
        }
        // //删除服务器数据
        // await delChannel(id)
        //删除页面数据
        this.myChannels = newChannels
        this.$toast.success('删除频道成功')
      } catch (error) {
        this.$toast.fail('删除频道失败')
      }
    },
    //添加频道
    async addChannel(item) {
      this.$toast.loading({
        message: '正在添加频道...',
        forbidCick: true
      })
      try {
        if (this.isLogin) {
          await addChannel(item.id, this.myChannels.length)
        } else {
          setMyChannerlToLocal([...this.myChannels, item])
        }
        // await addChannel(item.id, this.myChannels.length)
        this.myChannels.push(item)
        this.$toast.success('添加频道成功')
      } catch (error) {
        this.$toast.fail('添加频道失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.navbar {
  background-color: #3296fa;

  :deep(.van-nav-bar__title) {
    max-width: unset;
  }

  :deep(.van-icon) {
    color: #fff;
  }
}

.search-btn {
  width: 7.4rem;
  height: 0.85333rem;
  background-color: #5babfb;
  color: #fff;

  &.van-button--default {
    border: 0.02667rem solid #5babfb;
  }
}
/* tabs导航条样式 */
:deep(.van-tabs__wrap) {
  padding-right: 66px;
  position: sticky;
  top: 92px;
  left: 0;
  z-index: 99;
  .van-tabs__nav {
    padding-left: 0;
    padding-right: 0;

    /* tab标签 */
    .van-tab {
      border: 1px solid #eee;
      width: 200px;
      height: 82px;
    }

    /* tab标签下划线 */
    .van-tabs__line {
      width: 31px;
      height: 6px;
      background-color: #3296fa;
      bottom: 40px;
    }
  }
}

/* 字体图标 */
.toutiao-gengduo1 {
  position: absolute;
  top: 0;
  right: 0;
  width: 66px;
  height: 82px;
  font-size: 40px;
  line-height: 82px;
  text-align: center;
  opacity: 0.6;
  border-bottom: 1px solid #eee;

  position: fixed;
  top: 92px;
  right: 0;
  z-index: 999;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    height: 70%;
    width: 1px;
    background-image: url('@/assets/images/gradient-gray-line.png');
  }
}
.van-tab__pane {
  // 符号的两侧必须由空格
  min-height: calc(100vh - 92px - 88px - 100px);
}
:deep(.van-tabs__content) {
  // 符号的两侧必须由空格
  max-height: calc(100vh - 92px - 88px - 100px);
  padding-bottom: 100px;
  overflow: auto;
}
</style>
