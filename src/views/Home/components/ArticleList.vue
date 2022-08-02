<template>
  <div>
    <!-- 文章列表 -->
    <van-pull-refresh
      v-model="refreshLoading"
      @refresh="loadNextPageArticle"
      success-text="刷新成功"
    >
      <van-list
        v-model="loading"
        @load="loadNextPageArticle"
        offset="0"
        :immediate-check="false"
        :finished="isFinished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
          v-for="item in articles"
          :key="item.art_id"
          :articlesInfo="item"
        >
        </ArticleItem>
      </van-list>
    </van-pull-refresh>
    <!-- 频道弹层 -->
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleItem'
import { getArticleAPI } from '@/api'
export default {
  components: {
    ArticleItem
  },
  props: {
    id: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      articles: [],
      pre_timestamp: '',
      loading: false,
      isFinished: false,
      error: false,
      refreshLoading: false
    }
  },
  mounted() {
    this.getFirstPageArticle()
  },
  methods: {
    async getFirstPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, +new Date())
        console.log(data)
        this.articles = data.data.results
        this.pre_timestamp = data.data.pre_timestamp
      } catch (error) {
        this.$toast.fail('请刷新重新获取文章')
      }
    },
    async loadNextPageArticle() {
      try {
        const { data } = await getArticleAPI(this.id, this.pre_timestamp)
        const timestamp = data.data.pre_timestamp
        const results = data.data.results
        console.log(data)
        //判断是否加载完成
        if (timestamp === null) {
          this.isFinished = true
        }
        if (this.refreshLoading) {
          this.articles.unshift(...results)
        } else {
          this.articles.push(...results)
        }

        this.pre_timestamp = timestamp
      } catch (error) {
        this.error = true
      } finally {
        //更新loading
        this.loading = false
        this.refreshLoading = false
      }
    }
  }
}
</script>

<style></style>
