<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-xs-12">

				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>表单历史</span>
				</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-xs-12">
				<NbFilter :pager="pager" :callback="search"></NbFilter>
			</div>

			<div class="col-xs-12">
				<div v-for="surveyAnswer in pager.surveyAnswers" class="bg-white p10 mt10 br4">

					<div class="media">
						<div class="media-body cursor"
						     @click.stop.prevent="$router.push({ path: 'detail', query: { id: surveyAnswer.content.id } })">

							<div class="cell-title">
								{{surveyAnswer.content.title}}
							</div>
							<div class="cell-content">
								<i class="fa fa-lock"></i>
								{{surveyAnswer.createTime | humanTime}}
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
	import SurveyAnswer from  "../../../common/model/survey/SurveyAnswer"

	export default {

		data () {
			return {
				pager: new Pager(SurveyAnswer),
				user: this.$store.state.user
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

			//默认只能查看自己的。
			if (this.pager.getFilter("userId").isEmpty()) {
				this.pager.setFilter("userId", this.user.id);
			}


			this.pager.enableHistory();
			this.refresh();
		}
	}

</script>
