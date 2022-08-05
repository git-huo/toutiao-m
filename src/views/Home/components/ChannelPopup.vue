<template>
  <div class="channel">
    <!-- 我的频道 -->
    <van-cell title="我的频道">
      <van-button
        round
        size="small"
        class="edit-btn"
        @click="isEdit = !isEdit"
        >{{ isEdit ? '完成' : '编辑' }}</van-button
      >
    </van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="(item, index) in myChannels"
        :key="item.id"
        :text="item.name"
        :class="['mychannel-item', { active: item.name === '推荐' }]"
        @click="changeActive(index, item)"
      >
        <template #icon>
          <van-icon
            name="cross"
            v-show="isEdit && item.name !== '推荐'"
          /> </template
      ></van-grid-item>
    </van-grid>
    <van-cell title="推荐频道"></van-cell>
    <van-grid gutter="0.2rem">
      <van-grid-item
        v-for="item in recommendChannels"
        :key="item.id"
        icon="plus"
        :text="item.name"
        class="recommend-item"
        @click="$emit('add-channel',item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { getAllChannel as getAllChannelAPI } from '@/api'
export default {
  props: {
    myChannels: {
      type: Array,
      default: () => {}
    }
  },
  data() {
    return {
      isEdit: false,
      allChannels: []
    }
  },
  computed: {
    recommendChannels() {
      //减去所有频道
      //减---删
      return this.allChannels.filter(
        (aItem) => !this.myChannels.find((mItem) => aItem.id === mItem.id)
        //如果aitem在mychannel中出现就过滤掉
      )
    }
  },
  created() {
    this.getAllChannel()
  },
  methods: {
    async getAllChannel() {
      const { data } = await getAllChannelAPI()
      console.log(data)
      this.allChannels = data.data.channels
    },
    changeActive(index, item) {
      if (this.isEdit) {
        //删除频道
        if (item.name === '推荐') return
        this.$emit('del-channel', item.id)
        console.log(this)
      } else {
        // this.$parent.$parent.show = false
        this.$emit('close')
        this.$emit('change-active', index)
      }
    }
  }
}
</script>

<style scoped lang="less">
.active {
  color: red;
  :deep(.van-grid-item__text) {
    color: red;
  }
}
.channel {
  padding-top: 1.33333rem;
  .edit-btn {
    width: 104px;
    height: 48px;
    color: red;
    &.van-button--default {
      border-color: red;
    }
  }
}
:deep(.van-grid-item__content) {
  background-color: #eee;
}
.recommend-item {
  :deep(.van-grid-item__content) {
    flex-direction: row;
    align-content: center;
  }
  :deep(.van-grid-item__icon) {
    font-size: 40px;
  }
  :deep(.van-grid-item__icon + .van-grid-item__text) {
    margin-top: 3px;
  }
}
:deep(.mychannel-item) {
  .van-grid-item__content {
    position: relative;
  }
  .van-grid-item__icon-wrapper {
    position: unset;
  }
  .van-icon-cross {
    position: absolute;
    right: 0;
    top: 0;
    font-size: 30px;
    transform: translate(45%, -50%);
    border: 2px solid #000;
    border-radius: 50%;
    z-index: 300;
  }
}
</style>
