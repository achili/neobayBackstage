<template>
	<div class="animated fadeIn">

		<div class="row mb10">
			<div class="col-xs-12 clearfix">

				<div class="pull-left f24">
					<i class="fa fa-fire text-success"></i>
					<span>反馈历史</span>
				</div>
				<div class="pull-right">
					<button class="btn btn-primary" @click.stop.prevent="$router.push('/user/feedback/create')">
						<i class="fa fa-send"></i>
						<span>提交反馈</span>
					</button>
				</div>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>


			<div class="col-xs-12">
				<div v-for="feedback in pager.feedbacks" class="bg-white p10 mt10 cursor br4"
				     @click.stop.prevent="$router.push('/user/feedback/detail/' + feedback.id)">

					<div class="media">
						<div class="pull-right action-buttons">
							<!--<a href="javascript:void(0)" title="删除" @click.stop.prevent="feedback.confirmDel(refresh)">-->
								<!--<i class="fa fa-trash text-danger f20"></i>-->
							<!--</a>-->
						</div>
						<div class="media-body">
							<div>
								<span class="f15">{{feedback.name}}</span>
								<span :class="'label label-'+feedback.getStatusStyle()">{{feedback.getStatusName()}}</span>
							</div>
							<small class="block m-t-xs m-b-xs text-muted">{{feedback.description}}</small>
							<span class="mr10">#{{feedback.id}}</span>
							<span class="mr10">创建于:{{feedback.createTime | simpleDateTime}}</span>
							<span class="mr10">作者:{{feedback.author}}</span>
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
  import Feedback from  "../../../../common/model/user/feedback/Feedback"

  export default {

    data () {
      return {
        pager: new Pager(Feedback)
      }
    },
    components: {
      NbFilter,
      NbPager
    },
    computed: {},
    watch: {},
    methods: {

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
