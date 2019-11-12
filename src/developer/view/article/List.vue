<template>

  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>文章列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/developer/article/create')">
            <i class="fa fa-send"></i>
            <span>发布文章</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>


      <div class="col-xs-12">
        <div v-for="article in pager.articles" class="bg-white p10 mt10 cursor br4"
             @click.stop.prevent="$router.push('/developer/article/detail/' + article.id)">

          <div class="media">
            <div class="pull-left">
              <img class="img-rounded img-md" v-if="article.poster && article.poster.url" :src="article.poster.url">
            </div>

            <div class="pull-right action-buttons">
              <a title="编辑" @click.stop.prevent="$router.push('/developer/article/edit/'+article.id)">
                <i class="fa fa-pencil text-info f20"></i>
              </a>
              <a href="javascript:void(0)" title="删除"
                 @click.stop.prevent="article.confirmDel(refresh)">
                <i class="fa fa-trash text-danger f20"></i>
              </a>
            </div>
            <div class="media-body">
              <div class="cell-title">
                <span class="f15">{{article.title}}</span>
                <span v-for="tag in article.tags" class="mr5 label label-default">{{tag}}</span>
              </div>
              <div class="cell-description">{{article.digest}}</div>
              <div class="cell-content">
                <span class="mr10">#{{article.id}}</span>
                <span class="mr10">阅读:{{article.hit}}</span>
                <span class="mr10">作者:{{article.author}}</span>
                <span class="mr10"><i class="fa fa-clock-o"></i> {{article.createTime | humanTime}}</span>
              </div>

            </div>
          </div>
        </div>

      </div>

      <div class="col-xs-12 mt20">
        <NbPager :pager="pager" :callback="refresh"></NbPager>
      </div>

    </div>


  </div>

</template>




<script>

  import NbFilter from '../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../common/model/base/Pager"
  import Article from  "../../../common/model/article/Article"

  export default {

    data () {
      return {
        pager: new Pager(Article)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {
      //可惜未到不惑时，忽闻老歌慌了神
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.enableHistory();
      this.refresh();
    }
  }

</script>
