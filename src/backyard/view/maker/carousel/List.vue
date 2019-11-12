<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-xs-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-fire text-success"></i>
          <span>轮播图列表</span>
        </div>
        <div class="pull-right">
          <button class="btn btn-primary" @click.stop.prevent="$router.push('/by/maker/carousel/create')">
            <i class="fa fa-send"></i>
            <span>创建轮播图</span>
          </button>
        </div>
      </div>
    </div>

    <div class="row">

      <div class="col-xs-12">
        <NbFilter :pager="pager" :callback="search"></NbFilter>
      </div>

      <div class="col-xs-12">
        <div v-for="(makerCarousel, index) in pager.makerCarousels" class="bg-white p10 mt10 border-radius-4">

          <div class="row">

            <div class="col-sm-4">
              <img class="img-rounded wp100" v-if="makerCarousel.image && makerCarousel.image.url" :src="makerCarousel.image.url">
            </div>
            <div class="col-sm-8">
              <div class="media">
                <div class="pull-left">

                </div>
                <div class="pull-right action-buttons mt2">
                  <a title="上移" v-show="index > 0" @click.stop.prevent="makerCarousel.httpSort(makerCarousel.id , pager.makerCarousels[index - 1].sort , pager.makerCarousels[index - 1].id , makerCarousel.sort , refresh)">
                    <i class="fa fa-arrow-up text-primary f20"></i>
                  </a>
                  <a title="下移" v-show="index < pager.makerCarousels.length - 1" @click.stop.prevent="makerCarousel.httpSort(makerCarousel.id , pager.makerCarousels[index + 1].sort , pager.makerCarousels[index + 1].id , makerCarousel.sort , refresh)">
                    <i class="fa fa-arrow-down text-success f20"></i>
                  </a>
                  <a title="激活" v-show="makerCarousel.status === 'DISABLED'" @click.stop.prevent="unlock(makerCarousel)">
                    <i class="fa fa-unlock text-primary f20"></i>
                  </a>
                  <a title="关闭" v-show="makerCarousel.status === 'OK'" @click.stop.prevent="lock(makerCarousel)">
                    <i class="fa fa-lock text-warning f20"></i>
                  </a>
                  <a title="编辑" @click.stop.prevent="$router.push('/by/maker/carousel/edit/'+ makerCarousel.id)">
                    <i class="fa fa-pencil text-info f20"></i>
                  </a>
                  <a href="javascript:void(0)" title="删除" @click.stop.prevent="makerCarousel.confirmDel(refresh)">
                    <i class="fa fa-trash text-danger f20"></i>
                  </a>
                </div>
                <div class="media-body">
                  <div>

                    <span class="label" :class="'label-'+makerCarousel.StatusMap[makerCarousel.status].style">{{makerCarousel.StatusMap[makerCarousel.status].name}}</span>

                    <span class="f15">{{makerCarousel.name}}</span>
                  </div>

                  <div class="mv10">
                    标题：{{makerCarousel.title}}
                  </div>
                  <div class="mv10">
                    副标题：{{makerCarousel.subtitle}}
                  </div>

                  <div class="mv10">
                    链接：
                    <a :href="makerCarousel.url" target="_blank">
                      {{makerCarousel.url}}
                    </a>
                  </div>

                  <div class="mv10">
                    <span>园区地点：{{makerCarousel.spaceRegional.name}}</span>
                  </div>

                  <div class="mr10">
										<i class="fa fa-clock-o"></i>
										{{makerCarousel.createTime | simpleDate}}
									</div>
                </div>
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

  import NbFilter from '../../../../common/widget/filter/NbFilter.vue'
  import NbPager from '../../../../common/widget/NbPager.vue'
  import {MessageBox, Notification} from 'element-ui'

  import Pager from  "../../../../common/model/base/Pager"
  import MakerCarousel from  "../../../../common/model/maker/MakerCarousel"

  export default {

    data () {
      return {
        pager: new Pager(MakerCarousel)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {
      unlock(makerCarousel){
        makerCarousel.httpStatus(makerCarousel.Status.OK, function () {
          makerCarousel.status = makerCarousel.Status.OK;
        });
      },
      lock(makerCarousel){
        makerCarousel.httpStatus(makerCarousel.Status.DISABLED, function () {
          makerCarousel.status = makerCarousel.Status.DISABLED;
        });
      },
      search(){
        this.pager.page = 0;
        this.refresh()
      },
      refresh(){
        this.pager.httpFastPage();
      }
    },
    mounted(){
      this.pager.setFilter("orderSort","DESC");
      this.pager.enableHistory();
      this.refresh();
    }
  }

</script>
