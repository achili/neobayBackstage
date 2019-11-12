<template>
  <div>
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          评分
      </span>
      <div slot="body">
        <div class="col-xs-12" >
          <div class="row">
            <div class="col-xs-3 bold">服务</div>
            <div class="col-xs-9 ">
              <i class="pr8" v-for="(star,index) in serviceStars" :class="star+' f20 '" @click="check(index)" track-by="index"></i><!--性能优化 track-by 数据不改变时不会重新渲染-->
            </div>
          </div>
          <div class="row mt10">
            <div class="col-xs-3 bold">评论</div>
            <div class="col-xs-8 ">
              <textarea rows="6" class="form-control" v-model="comment"></textarea>
            </div>
          </div>
          <div class="row mt10" v-show="makerApartment.errorMessage">
            <div class="alert alert-danger">
              {{makerApartment.errorMessage}}
            </div>
          </div>
          <div class="row mt10 pull-right">
            <SubmitButton :loading="makerApartment.loading" :callback="submit"/>
          </div>

        </div>

        <div class="col-xs-12 mt10">
          <div  v-for="assess in pager.investmentAssesses">
            <div class="alert alert-danger">
              <h4>{{assess.creator.nickname}}</h4>
              <div>
                服务:<span v-for="t in assess.service"><i class="fa fa-star f20 text-warning"></i></span>
              </div>
              <div v-show="assess.comment">评价：{{assess.comment}}</div>
            </div>
          </div>

          <div class="col-xs-12 mt20">
            <NbPager :pager="pager" :callback="refresh"></NbPager>
          </div>
        </div>

      </div>
    </NbSlidePanel>
  </div>
</template>

<script>
  import {Notification,NotificationBox} from 'element-ui';
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import SubmitButton from '../../../widget/SubmitButton.vue'
  import Pager from "../../../../../common/model/base/Pager";
  import InvestmentAssess from "../../../../../common/model/investment/InvestmentAssess";
  import NbPager from '../../../../../common/widget/NbPager.vue'
  import MakerApartment from "../../../../../common/model/maker/MakerApartment";

  export default{
    data(){
      return {
        serviceStars:["fa fa-star","fa fa-star","fa fa-star","fa fa-star","fa fa-star"],
        score: 5,
        service: null,
        comment: null,
        pager:new Pager(InvestmentAssess,10)

      }
    },
    computed: {

    },
    props: {
      makerApartment: {
        type: MakerApartment,
        required: true,
        validator: function (entity) {
          return true;
        }
      },
      commentSuccessCallback: {
        type: Function,
        required: false
      }

    },
    watch: {

    },
    components: {
      NbSlidePanel,
      SubmitButton,
      NbPager

    },
    methods: {
      check(index) {
        let result = [];
        for (let i = 0; i < this.score; i++) {
          if (i < index + 1) {
            this.star = "fa fa-star text-warning";
            result.push(this.star);
          } else {
            result.push("fa fa-star")
          }
        }
        this.serviceStars = result;
        this.service = index + 1;
      },
      submit() {
        let that = this;

        if (!this.service) {
          this.investment.errorMessage = "请给技术评分！";
          return;
        }
        this.makerApartment.errorMessage = null;
        this.makerApartment.httpAssess(this.service, this.comment, function () {
          Notification.success({
            message: '提交评价成功！'
          });
          that.refresh();
        })
      },
      refresh(){
        this.makerApartment.id = this.$store.state.route.query.id;
        if (this.makerApartment.id) {
          this.pager.setFilter("makerApartmentId",this.makerApartment.id);
          this.pager.httpFastPage()
        }

      }
    },
    mounted() {
      this.refresh();
    }
  }
</script>
