<template>
	<div>
		<NbSlidePanel>
			<span slot="heading" class="text-success f16">
				<i class="fa fa-dot-circle-o"></i>
				基本信息
			</span>
			<div slot="body">
				<div class="row">
					<div class="col-md-2 mt10 bold">反馈名称</div>
					<div class="col-md-10 mt10">{{feedback.name}}</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">提出者</div>
					<div class="col-md-10 mt10">{{feedback.creator.nickname}}</div>
				</div>

				<div class="row mt10">
					<div class="col-md-2 ">其它附件：</div>
					<div class="col-md-10 ">
						<NbTanks :tanks="feedback.tanks" :edit="false"/>
					</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">反馈详情</div>
					<div class="col-md-10 mt10">{{feedback.description}}</div>
				</div>

				<div class="row">
					<div class="col-md-2 mt10 bold">创建时间</div>
					<div class="col-md-10 mt10">{{feedback.createTime | humanTime}}</div>
				</div>

			</div>
		</NbSlidePanel>
	</div>
</template>

<script>

  import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
  import NbTanks from  "../../../../../common/widget/NbTanks.vue"
  import Feedback from  "../../../../../common/model/user/feedback/Feedback"

	export default{
    data(){
      return{
        FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
      }
    },
		props:{
      feedback:{
        type:Feedback,
				required:true
      }
		},
		components:{
      NbSlidePanel,
      NbTanks
		}
	}

</script>