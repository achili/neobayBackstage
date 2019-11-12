<template>
	<div>
		<h2><i class="fa fa-fire text-success"></i>角色详情</h2>

		<div class="row">
			<div class="col-xs-12">

				<NbSlidePanel>
					<span slot="heading" class="text-success">
						<i class="fa fa-dot-circle-o"></i>
						基本信息
					</span>

					<div>
						<div>
							<span class="f16 black">{{userRole.name}}</span>

							<button class="pull-right btn btn-primary"
							        @click.stop.prevent="$router.push('/by/user/role/edit/'+userRole.id)">
								<i class="fa fa-pencil"></i>
								编辑
							</button>

						</div>
						<div class="mt5 text-muted">
							{{userRole.description}}
						</div>
						<div class="mt5">
							{{userRole.special ? "系统内置角色" : "自定义角色"}}
						</div>

            <div class="mt5">
              是否有门禁权限：{{userRole.type === userRole.Type.CONSUMER ? "没有" : "有"}}
            </div>

						<div class="mt5">
							创建于：{{userRole.createTime | humanTime}}
						</div>
            <div class="mt5">
              园区地点：{{userRole.spaceRegional.name}}
            </div>
					</div>

				</NbSlidePanel>

				<NbSlidePanel type="danger">
					<span slot="heading" class="">
						<i class="fa fa-cubes"></i>
						角色权限
					</span>

					<div class="alert alert-info mb10">
						<span class="bold"><i class="fa fa-bullhorn"></i> 注意</span>
						<ol class="pl15">
							<li>公共接口开放给所有用户，包括游客。</li>
							<li>系统内置角色权限不可修改。</li>
							<li>管理员只能分配自己已有的权限。</li>
						</ol>
					</div>

          <div>
            <SpaceRegionalSelection :spaceRegional="userRole.spaceRegional" :editMode="userRole.editMode"></SpaceRegionalSelection>
          </div>

					<div class="clearfix mb10">

						<CreateSaveButton :entity="userRole" :callback="savePermissions"/>
					</div>

					<NbSlidePanel v-for="moduleType in ModuleTypeList" :key="moduleType.value"
					              v-if="(moduleType.value !== ModuleType.OTHER) || (moduleType.value === ModuleType.OTHER && userRole.type === userRole.Type.PROGRAMMER) ">
						<span slot="heading" class="">
							<i class="fa fa-cube"></i>
							{{moduleType.name}}
						</span>

						<div v-for="type in ModuleFeatureMap[moduleType.value]">

              <div class="" v-for="accesses in userRole.accesses" v-if="accesses.featureType === type">
                <div class="pull-left pr20 pt20 pb5" v-if="accesses.spaceRegional.id === userRole.spaceRegional.id">
                  <div v-if="accesses.featureType!== 'OFFICIAL_MANAGE'" >
                    <div v-if="show">
                      <NbSwitcher v-model="accesses.newActive" size="sm" :disabled="sss(accesses)" />
                      {{accesses.feature.name}}
                    </div>
                    <div v-if="showAdmin">
                      <NbSwitcher v-model="accesses.newActive" size="sm" :disabled="accesses.featureType === 'PUBLIC' || userRole.special" />
                      <span>{{accesses.feature.name}}</span>
                    </div>
                  </div>
                  <div v-else>
                    <NbSwitcher v-model="accesses.newActive" size="sm"  :disabled="disable(accesses,userRole.special)" />
                    <span>{{accesses.feature.name}}</span>
                  </div>
                </div>
              </div>

							<!--<div class="col-md-3 col-sm-6 mv10" v-for="type in ModuleFeatureMap[moduleType.value]">-->
								<!--<NbSwitcher size="sm" :disabled="type === FeatureType.PUBLIC || userRole.special"-->
								            <!--v-model="userRole.accessMap[type]"/>{{userRole.accessMap[type]}}-->

								<!--<span class="ml5">-->
									<!--{{FeatureTypeMap[type].name}}-->
								<!--</span>-->

							<!--</div>-->

						</div>

					</NbSlidePanel>

					<CreateSaveButton :entity="userRole" :callback="savePermissions"/>

				</NbSlidePanel>


			</div>
		</div>

	</div>
</template>
<style>

</style>
<script>
  import {Notification} from 'element-ui';
  import UserRole from "../../../../common/model/user/role/UserRole"
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

  import {
    FeatureType,
    FeatureTypeList,
    FeatureTypeMap,
    ModuleFeatureMap
  } from "../../../../common/model/core/feature/FeatureType"
  import {ModuleType, ModuleTypeList, ModuleTypeMap} from "../../../../common/model/core/feature/ModuleType"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import NbSwitcher from "../../../../common/widget/NbSwitcher.vue";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";

  export default{
		data(){
			return {
				FeatureType,
				FeatureTypeMap,
				FeatureTypeList,
				ModuleFeatureMap,
				ModuleType,
				ModuleTypeMap,
				ModuleTypeList,
				userRole: new UserRole(),
				user: this.$store.state.user,
        show:false,
        showAdmin: true
			}
		},
		components: {
			NbSlidePanel,
			NbSwitcher,
			CreateSaveButton,
      SpaceRegionalSelection
		},
		methods: {
      sss(accesses){
        //不需要打开官方网站管理 就能打开的
        // 我的第三方服务管理 我的第三方服务 我的企业管家 用户个人消息 个人消息
        if((accesses.featureType !== 'OFFICIAL_MANAGE' || accesses.featureType.value !== 'USER_ROLE_MANAGE') && accesses.featureType !== 'MAKER_SIMPLE_APPLY_MINE' &&
          accesses.featureType !== 'MAKER_SIMPLE_APPLY_MANAGE' &&  accesses.featureType !== 'KEEPER_BUSINESS_MINE'  && accesses.featureType !== 'USER_MINE' &&
          accesses.featureType !== 'MESSAGE_MINE'
        ){
          if(accesses.featureType !== 'PUBLIC'){
            accesses.newActive = false;
          }
          return true;
        }
      },
      disable(accesses,special){
        if(accesses.featureType === 'PUBLIC' || special){
          return true;
        }

        if(accesses.featureType === 'OFFICIAL_MANAGE' && accesses.newActive){
          this.showAdmin = true;
          this.show = false;
        }

        if(accesses.featureType === 'OFFICIAL_MANAGE' && !accesses.newActive){
          this.showAdmin = false;
          this.show = true;
        }

      },
			fetchDetail(){
				let that = this;
				this.userRole.id = this.$store.state.route.params.id;
				if (this.userRole.id) {
					this.userRole.httpDetail(function () {
          });
				}
			},
			savePermissions(){
        let that = this;
        this.userRole.renderAccessMap();
				this.userRole.httpPermission(function (response) {
					Notification.success({
						message: '修改角色权限成功！'
					});

				});
			}
		},
		mounted(){
			this.fetchDetail();
		}
	}
</script>



