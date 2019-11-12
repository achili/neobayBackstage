<template>
	<div class="backyard-index">

    <div>
      <SpaceRegionalSelection :spaceRegional="spaceRegional" :editMode="false"></SpaceRegionalSelection>
    </div>

		<div>
			<NbTabs :borderStyle="true" :triggerHover="true">
        <NbTabPanel label="园区通知">
          <div v-for="messageLetter in messageLetterPager.messageLetters">
            <MessageListCell :messageLetter="messageLetter"/>
          </div>

          <NbPager :pager="messageLetterPager" :callback="refreshMessageLetter"></NbPager>
        </NbTabPanel>

				<NbTabPanel label="资讯动态">

					<div v-for="officialArticle in officialArticlePager.officialArticles">
						<ArticleListCell :officialArticle="officialArticle"/>
					</div>

					<NbPager :pager="officialArticlePager" :callback="refreshArticle"></NbPager>

				</NbTabPanel>

				<NbTabPanel label="创业活动">
					<div v-for="officialActivity in officialActivityPager.officialActivities">
						<ActivityListCell :officialActivity="officialActivity"/>
					</div>

					<NbPager :pager="officialActivityPager" :callback="refreshActivity"></NbPager>
				</NbTabPanel>
			</NbTabs>
		</div>


		<div class="mt30" v-if="user.hasPermissionSpace(FeatureType.USER_MANAGE,spaceRegional.id) ||
      user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,spaceRegional.id) ||
      user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,spaceRegional.id) ||
      user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,spaceRegional.id) ||
      user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,spaceRegional.id)
      ">
			<NbTabs :borderStyle="true" :triggerHover="true">
				<NbTabPanel label="数据统计">

					<div class="row mt30">

						<!--<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.USER_MANAGE,spaceRegional.id)">-->


							<!--<div class="card" @click.stop.prevent="$router.push('/by/user/list')">-->
								<!--<div class="title">-->
									<!--<i class="fa fa-eye"></i>-->
									<!--今日用户活跃数-->
								<!--</div>-->
								<!--<div class="content">-->
									<!--{{indexManager.activeUserCount}}-->
								<!--</div>-->
							<!--</div>-->


						<!--</div>-->

						<!--<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.USER_MANAGE,spaceRegional.id)">-->

							<!--<div class="card blue" @click.stop.prevent="$router.push('/by/user/list')">-->
								<!--<div class="title">-->
									<!--<i class="fa fa-user"></i>-->
									<!--用户数-->
								<!--</div>-->
								<!--<div class="content">-->
									<!--{{indexManager.userCount}}-->
								<!--</div>-->
							<!--</div>-->
						<!--</div>-->

						<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,spaceRegional.id)">

							<div class="card" @click.stop.prevent="$router.push('/by/project/list')">
								<div class="title">
									<i class="fa fa-support"></i>
									项目数
								</div>
								<div class="content">
									{{indexManager.projectCount}}
								</div>
							</div>
						</div>

						<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,spaceRegional.id)">

							<div class="card blue" @click.stop.prevent="$router.push('/by/company/list')">
								<div class="title">
									<i class="fa fa-bank"></i>
									企业数
								</div>
								<div class="content">
									{{indexManager.companyCount}}
								</div>
							</div>
						</div>


						<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,spaceRegional.id)">
							<div class="card" @click.stop.prevent="$router.push('/by/keeper/business/list')">
								<div class="title">
									<i class="fa fa-shield"></i>
									企业管家申请数
								</div>
								<div class="content">
									{{indexManager.keeperBusinessCount}}
								</div>
							</div>
						</div>

						<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,spaceRegional.id)">

							<div class="card blue" @click.stop.prevent="$router.push('/by/protocol/incubator/list')">
								<div class="title">
									<i class="fa fa-briefcase"></i>
									孵化协议数
								</div>
								<div class="content">
									{{indexManager.protocolIncubatorCount}}
								</div>
							</div>
						</div>


						<div class="col-md-3 col-sm-6" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,spaceRegional.id)">

							<div class="card" @click.stop.prevent="$router.push('/by/protocol/space/list')">
								<div class="title">
									<i class="fa fa-diamond"></i>
									租赁协议数
								</div>
								<div class="content">
									{{indexManager.protocolSpaceCount}}
								</div>
							</div>
						</div>


					</div>
				</NbTabPanel>
			</NbTabs>
		</div>


	</div>

</template>
<script>


	import IndexManager from "../../../common/model/index/IndexManager";
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

	import NbPager from '../../../common/widget/NbPager.vue'
	import NbTabs from '../../../common/widget/NbTabs.vue'
	import NbTabPanel from '../../../common/widget/NbTabPanel.vue'
	import Pager from '../../../common/model/base/Pager'
	import OfficialArticle from '../../../common/model/official/OfficialArticle'
	import OfficialActivity from '../../../common/model/official/OfficialActivity'
	import Project from '../../../common/model/project/Project'
	import Company from '../../../common/model/company/Company'
	import ProtocolIncubator from '../../../common/model/protocol/incubator/ProtocolIncubator'
	import ProtocolSpace from '../../../common/model/protocol/space/ProtocolSpace'

	import ActivityListCell from "./widget/ActivityListCell.vue";
	import ArticleListCell from "./widget/ArticleListCell.vue";
	import MessageListCell from "./widget/MessageListCell.vue";
	import ProjectListCell from "../project/widget/ProjectListCell.vue";
	import CompanyListCell from "../company/widget/CompanyListCell.vue";
	import ProtocolIncubatorListCell from "../protocol/incubator/widget/ProtocolIncubatorListCell.vue";
	import ProtocolSpaceListCell from "../protocol/space/widget/ProtocolSpaceListCell.vue";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";
  import MessageLetter from "../../../common/model/message/letter/MessageLetter";


	export default {

		data () {
			return {
				user: this.$store.state.user,
				FeatureType: this.$store.state.FeatureType,
        spaceRegionals: this.$store.state.spaceRegionals,
				officialArticlePager: new Pager(OfficialArticle, 3),
				officialActivityPager: new Pager(OfficialActivity, 3),
        messageLetterPager: new Pager(MessageLetter),
				projectPager: new Pager(Project, 3),
				companyPager: new Pager(Company, 3),
				protocolIncubatorPager: new Pager(ProtocolIncubator, 3),
				protocolSpacePager: new Pager(ProtocolSpace, 3),
				indexManager: new IndexManager(),
        spaceRegional:new SpaceRegional()

			}
		},
		components: {
			NbPager,
			NbTabs,
			NbTabPanel,
			ArticleListCell,
			ActivityListCell,
			ProjectListCell,
			CompanyListCell,
			ProtocolIncubatorListCell,
			ProtocolSpaceListCell,
      MessageListCell,
      SpaceRegionalSelection
		},
    watch:{
      "spaceRegional.id"(newVal, oldVal){
        this.refreshArticle();
        this.refreshActivity();
        this.refresh();
      }
    },
		methods: {

			refreshArticle(){
        let space = [];
				this.officialArticlePager.setFilter("orderId", "DESC");
        space.push(this.spaceRegional.id)
				this.officialArticlePager.setFilter("spaceRegionalIds",space);
				this.officialArticlePager.httpFastPage();
			},

			refreshActivity(){
        let space = [];
        this.officialActivityPager.setFilter("orderId", "DESC");
        space.push(this.spaceRegional.id)
        this.officialActivityPager.setFilter("spaceRegionalIds",space);
        this.officialActivityPager.httpFastPage();
			},
      refreshMessageLetter(){
        this.messageLetterPager.setFilter("orderCreateTime", "DESC");
        this.messageLetterPager.httpFastPage();
      },
			refreshProject(){
        let space = [];
        space.push(this.spaceRegional.id)
        this.projectPager.setFilter("spaceRegionalIds",space);
				this.projectPager.httpFastPage();
			},

			refreshCompany(){
        let space = [];
        space.push(this.spaceRegional.id)
        this.companyPager.setFilter("spaceRegionalIds",space);
				this.companyPager.httpFastPage();
			},

			refreshProtocolIncubator(){
        let space = [];
        space.push(this.spaceRegional.id)
        this.protocolIncubatorPager.setFilter("spaceRegionalIds",space);
				this.protocolIncubatorPager.httpFastPage();
			},
			refreshProtocolSpace(){
        let space = [];
        space.push(this.spaceRegional.id)
        this.protocolSpacePager.setFilter("spaceRegionalIds",space);
				this.protocolSpacePager.httpFastPage();
			},

			refreshIndexManager(){
				let FeatureType = this.FeatureType;
          if (this.user.hasPermissionSpace(FeatureType.USER_MANAGE,this.spaceRegional.id) ||
            this.user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,this.spaceRegional.id) ||
            this.user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MANAGE,this.spaceRegional.id) ||
            this.user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,this.spaceRegional.id) ||
            this.user.hasPermissionSpace(FeatureType.KEEPER_BUSINESS_MANAGE,this.spaceRegional.id)
          ) {
            this.indexManager.httpStatistic(this.spaceRegional.id);
          }
			},

			refresh(){
				let FeatureType = this.FeatureType;
				this.refreshArticle();
				this.refreshActivity();
				this.refreshMessageLetter();


          if (this.user.hasPermissionSpace(FeatureType.PROJECT_MINE,this.spaceRegional.id)) {
            this.refreshProject();
          }
          if (this.user.hasPermissionSpace(FeatureType.PROJECT_MINE,this.spaceRegional.id)) {
            this.refreshCompany();
          }
          if (this.user.hasPermissionSpace(FeatureType.PROTOCOL_INCUBATOR_MINE,this.spaceRegional.id)) {
            this.refreshProtocolIncubator();
          }
          if (this.user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MINE,this.spaceRegional.id)) {
            this.refreshProtocolSpace();
          }

				this.refreshIndexManager();

			}

		},
		mounted(){
			this.refresh();
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	@import "../../../common/assets/css/global/variables";

	.backyard-index {
		background-color: white;
		padding: 15px;

		.card {
			background-color: @neobay-light-yellow;
			margin: 10px 0;
			cursor: pointer;

			.title {
				color: white;
				background-color: @neobay-yellow;
				text-align: center;
				line-height: 44px;
				font-size: 18px;
			}
			.content {
				color: white;
				line-height: 100px;
				font-size: 42px;
				text-align: center;
			}

			&.blue {
				background-color: @neobay-light-blue;
				.title {
					background-color: @neobay-blue;
				}
			}
		}
	}

</style>
