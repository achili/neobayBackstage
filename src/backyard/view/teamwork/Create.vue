<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="teamwork.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!teamwork.editMode">创建协同工作任务</span>
            <span v-show="teamwork.editMode">修改协同工作任务</span>
          </h2>
        </div>
      </div>

      <div class="row">
        <div class="col-md-12 m-t-md">
          <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						基本信息
					</span>
            <div slot="body">
              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">园区地点</label>
                <div class="col-md-9">
                  <SpaceRegionalSelection :spaceRegional="teamwork.spaceRegional" :editMode="teamwork.editMode"></SpaceRegionalSelection>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">工作任务名称</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="teamwork.name">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">
                  项目
                </label>
                <div class="col-md-9" v-if="!teamwork.editMode">
                  <ProjectSelections :projects="teamwork.projects" :spaceRegional="teamwork.spaceRegional"/>
                </div>
                <div class="col-md-9" v-if="teamwork.editMode">
                  <span v-for="project in teamwork.projects"
                        @click.stop.prevent="$router.push('/by/project/detail/?id='+ project.id)">
                    <a>{{project.name}}</a>
                  </span>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">
                  工作类型
                </label>
                <div class="col-md-9">
                  <NbTags :Clazz="TeamworkTag" :tags="teamwork.tags" :spaceRegional="teamwork.spaceRegional"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">负责人</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="teamwork.leader">
                </div>
              </div>

              <div class="row mt10" >
                <label class="col-md-3 control-label mt5">
                  参与人
                </label>
                <div class="col-md-9" v-if="!teamwork.editMode" >
                  <UserSelections :users="teamwork.participants"/>
                </div>
                <div class="col-md-9" v-if="teamwork.editMode">
                  <UserProfileLink class="mr5" v-for="participants in teamwork.participants" :user="participants" :show-portrait="true" :key="participants.id"/>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5">预计完成时间</label>
                <div class="col-md-9">
                  <el-date-picker
                    v-model="teamwork.estimateTime"
                    type="datetime"
                    placeholder="选择日期时间">
                  </el-date-picker>
                </div>
              </div>

              <div class="alert alert-danger mt20" v-show="teamwork.errorMessage">
                {{teamwork.errorMessage}}
              </div>
            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12">
          <CreateSaveButton :entity="teamwork" :callback="save"/>
        </div>

      </div>
    </LoadingFrame>
  </div>
</template>

<script>
  import {Notification} from 'element-ui';
  import UserPagerSelection from "../user/Selection.vue";
  import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";
  import LoadingFrame from "../widget/LoadingFrame";
  import CreateSaveButton from "../widget/CreateSaveButton.vue"
  import UserSelections from '../../../backyard/view/user/Selections.vue';
  import UserProfileLink from "../../../backyard/view/widget/UserProfileLink.vue";
  import ProjectSelections from "../project/Selections.vue";
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'


  import $ from "jquery"
  import Teamwork from "../../../common/model/teamwork/Teamwork";
  import NbTags from "../../../common/widget/NbTags";
  import Pager from "../../../common/model/base/Pager";
  import TeamworkTag from "../../../common/model/teamwork/TeamworkTag";

  export default {
    data () {
      return {
        TeamworkTag,
        user: this.$store.state.user,
        teamwork: new Teamwork(),
        teamworkTag: new Pager(TeamworkTag)
      }
    },
    components: {
      NbTags,
      NbSlidePanel,
      UserPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      UserSelections,
      UserProfileLink,
      ProjectSelections,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {
      "teamwork.tags"(){
        this.changeTagsArray();
      },
      "teamwork.editMode"(){
        this.changeTagsArray();
      },
      "teamwork.spaceRegional.id"(newVal, oldVal){
        let that = this;

        that.teamwork.projects = [];
      }
    },
    methods: {
      save(){
        let that = this;
        this.teamwork.httpSave(function (response) {
          Notification.success({
            message: that.teamwork.editMode ? '修改协同工作任务成功！' : '创建协同工作任务成功！'
          });
          that.$router.push({path: '/by/teamwork/detail/' + that.teamwork.id});
        });
      },
      changeTagsArray(){
        let that = this;
        if (this.teamworkTag.teamworkTags) {
          this.teamworkTag.teamworkTags.forEach(function (obj) {
            if (that.teamwork.tags.indexOf(obj.name) >= 0) {
              obj.editMode = true;
            } else {
              obj.editMode = false;
            }
          })
        }
      }

    },
    mounted(){
      let that = this;
      this.teamwork.id = this.$store.state.route.params.id;
      this.teamwork.leader = this.user.nickname;
      if (this.teamwork.id) {
        this.teamwork.editMode = true;
        this.teamwork.httpDetail();
      }
    }
  }

</script>
