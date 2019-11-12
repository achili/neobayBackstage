<template>
	<div class="by-article-detail animated fadeIn">
		<div class="row">
			<div class="col-md-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span>明星项目详情</span>
				</h2>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 m-t-md">
				<div class="pull-right">
					<button title="编辑" class="btn btn-success"
					        @click.stop.prevent="$router.push('/by/official/star/edit/'+officialStar.id)">
						<i class="fa fa-pencil"></i>
						编辑
					</button>
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col-md-12 mt10">

				<StartDetailView :officialStar="officialStar"/>
			</div>
		</div>
	</div>

</template>
<script>
	import {Notification} from 'element-ui';
	import OfficialStar from  "../../../../common/model/official/OfficialStar"
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import StartDetailView from "./widget/StarDetailView.vue";
	import $ from "jquery"

	export default {

		data () {
			return {
				officialStar: new OfficialStar()
			}
		},
		components: {
			NbSlidePanel,
			StartDetailView
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.officialStar.id = this.$store.state.route.params.id;
				if (this.officialStar.id) {
					this.officialStar.httpDetail();
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
	}


</script>
