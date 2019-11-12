<template>
	<div class="project-list-cell">

		<div class="bg-white p10 mt10 cursor br4 border"
		     @click.stop.prevent="$router.push({path: 'detail', query: { id: project.id }})">

			<div class="media">

				<div class="pull-left">
					<img class="img-rounded img-md" v-if="project.logo" :src="project.logo.url">
				</div>

				<div class="pull-right action-buttons">
          <span v-if="user.hasPermissionSpace(this.FeatureType.PROJECT_MANAGE,project.spaceRegional.id)">
            <a title="非社区项目" v-show="!project.isHot" @click.stop.prevent="setHot">
              <i class="fa fa-star-o f20" style="color: gray"></i>
            </a>
            <a title="社区项目" v-show="project.isHot" @click.stop.prevent="setHot">
              <i class="fa fa-star text-warning f20"></i>
            </a>
          </span>
					<a title="编辑" v-if="project.canEdit()" @click.stop.prevent="$router.push({path: 'edit', query: { id: project.id }})">
						<i class="fa fa-pencil text-info f20"></i>
					</a>
					<a href="javascript:void(0)" v-if="project.canDel()" title="删除"
					   @click.stop.prevent="project.confirmDel(refreshCallback)">
						<i class="fa fa-trash text-danger f20"></i>
					</a>
				</div>
				<div class="media-body">
					<div class="cell-title">
						<span>{{project.name}}</span>
						<span :class="'label label-'+project.getStatusStyle()">{{project.getStatusName()}}</span>
					</div>
					<div class="cell-description">
						<span class="mr10">项目编号:{{project.no}}</span>
					</div>
					<div class="cell-description">
                <span class="mr10" v-if="project.projectMentor.name"
                      @click.stop.prevent="$router.push(user.hasPermissionSpace($store.state.FeatureType.PROJECT_MANAGE,project.spaceRegional.id)? {path: '/by/mentor/detail', query: { id: project.projectMentor.id }}:{path: '/group/mentor/detail', query: { id: project.projectMentor.id }})">
                  社区经理：<a>{{project.projectMentor.name}}</a>
                </span>
						<span class="mr10" v-if="!project.projectMentor.name">社区经理：<span class="text-danger">未指定！</span></span>
					</div>
					<div class="cell-content">
						<span class="mr10">创建人:<UserProfileLink :user="project.creator"/></span>
						<span class="mr10">负责人:{{project.leader}}</span>

						<span class="mr10"><i class="fa fa-clock-o"></i> {{project.createTime | humanTime}}</span>
					</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>

	import Project from  "../../../../common/model/project/Project";
	import UserProfileLink from "../../widget/UserProfileLink";
  import { Notification } from 'element-ui'
	export default {
		data () {
      return {
        FeatureType: this.$store.state.FeatureType,
        user: this.$store.state.user
      }
		},
		components: {
			UserProfileLink
		},
		props: {
			project: {
				type: Project,
				required: true,
				validator: function (entity) {
					return true;
				}
			},
			refreshCallback: {
				type: Function,
				required: false,
				validator: function (entity) {
          return true;
				}
			}
		},
    methods: {
      setHot () {
        let that = this
        this.project.httpSetHot(function () {
          Notification.success({
            message: that.project.isHot ? '成功设为社区项目！' : '成功设为非社区项目！'
          })
        })
      }
    },
		mounted(){
		}
	}
</script>

<style lang="less" rel="stylesheet/less">


</style>


