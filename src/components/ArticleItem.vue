<template>
  <div>
    <!-- 渲染每一篇文章 -->
    <!-- 没有图片 -->
    <van-cell
      v-if="articlesInfo.cover.type === 0"
      :title="articlesInfo.title"
      :label="label"
    />
    <!-- 一张图片 -->
    <van-cell
      v-else-if="articlesInfo.cover.type === 1"
      :title="articlesInfo.title"
      :label="label"
    >
      <van-image width="100" height="100" :src="articlesInfo.cover.images[0]" />
    </van-cell>
    <!-- 3张图片 -->
    <van-cell v-else :title="articlesInfo.title" :label="label">
      <van-image
        v-for="(item, index) in articlesInfo.cover.images"
        :key="index"
        width="100"
        height="100"
        :src="item"
      />
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    articlesInfo: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    label() {
      const src = this.articlesInfo
      return `${src.aut_name} ${src.comm_count}评论 ${src.pubdate}`
    }
  }
}
</script>

<style></style>
