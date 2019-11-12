<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="reception.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!reception.editMode">创建申请</span>
            <span v-show="reception.editMode">修改申请</span>
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
                  <SpaceRegionalSelection :spaceRegional="reception.spaceRegional" :editMode="reception.editMode"></SpaceRegionalSelection>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">类型</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="reception.type">
                    <option v-for="type in reception.getTypeList()" :value="type.value">
                      {{type.name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory">来源</label>
                <div class="col-md-9">
                  <select class="form-control" v-model="reception.ors">
                    <option v-for="ors in reception.getOrsTypeList()" :value="ors.value">
                      {{ors.name}}
                    </option>
                  </select>
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory"><span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">接待</span>名称</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="reception.name">
                </div>
              </div>

              <div class="row mt10"  v-show="reception.type === reception.Type.RECEPTION">
                <label class="col-md-3 control-label mt5 compulsory">来访单位名称</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="reception.visitingUnit">
                </div>
              </div>

              <div class="row mt10">
                <label class="col-md-3 control-label mt5 compulsory"><span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">来访</span>时间</label>
                <div class="col-md-9">
                  <NbDateRange
                    :startTime="reception.startTime"
                    type="datetimerange"
                    v-on:startTimeChange="reception.startTime = arguments[0]"
                    :endTime="reception.endTime"
                    v-on:endTimeChange="reception.endTime = arguments[0]">
                  </NbDateRange>
                </div>
              </div>

              <div class="row mt10"  v-show="reception.type === reception.Type.ACTIVITY">
                <label class="col-md-3 control-label mt5 compulsory">活动地点</label>
                <div class="col-md-9">
                  <input type="text" class="form-control" v-model="reception.locale">
                </div>
              </div>

              <div class="row mt10" v-if="!reception.editMode">
                <label class="col-md-3 control-label mt5">
                  工作人员
                </label>
                <div class="col-md-9">
                  <UserSelections :users="reception.personnels"/>
                </div>
              </div>
              <div class="row mt10" v-if="reception.editMode">
                <label class="col-md-3 control-label mt5">
                  工作人员
                </label>
                <div class="col-md-9">
                  <UserProfileLink class="mr5" v-for="personnel in reception.personnels" :user="personnel" :show-portrait="true" :key="personnel.id"/>
                </div>
              </div>


              <div class="row mt10" v-show="reception.type === reception.Type.ACTIVITY">
                <label class="col-md-3 control-label mt5" >
                  相关附件
                </label>
                <div class="col-md-9">
                  <NbTanks :tanks="reception.attachments"/>
                </div>
              </div>

              <div class="alert alert-danger mt20" v-show="reception.errorMessage">
                {{reception.errorMessage}}
              </div>
            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12 m-t-md">
          <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
            <span v-show="reception.type === reception.Type.ACTIVITY">活动</span><span v-show="reception.type === reception.Type.RECEPTION">接待</span>详情</span>
            <div slot="body">
              <NbEditor height="500px" v-model="reception.detailsHtml"/>

            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12">
          <CreateSaveButton :entity="reception" :callback="save"/>
        </div>

      </div>
    </LoadingFrame>
  </div>
</template>

<script>
  import NbTank from '../../../common/widget/NbTank'
  import {Notification} from 'element-ui';
  import Reception from  "../../../common/model/reception/Reception"
  import UserPagerSelection from "../user/Selection.vue";
  import NbSlidePanel from "../../../common/widget/NbSlidePanel.vue";
  import LoadingFrame from "../widget/LoadingFrame";
  import CreateSaveButton from "../widget/CreateSaveButton.vue"
  import NbDateRange from  "../../../common/widget/NbDateRange.vue"
  import NbEditor from "../../../common/widget/NbEditor"
  import NbTanks from "../../../common/widget/NbTanks"
  import UserSelections from '../../../backyard/view/user/Selections.vue';
  import UserProfileLink from "../../../backyard/view/widget/UserProfileLink.vue";
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

  import $ from "jquery"

  export default {
    data () {
      return {
        reception: new Reception(),
        dateValue: null
      }
    },
    components: {
      NbTank,
      NbSlidePanel,
      UserPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      NbDateRange,
      NbEditor,
      NbTanks,
      UserSelections,
      UserProfileLink,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.reception.httpSave(function (response) {
          Notification.success({
            message: that.reception.editMode ? '修改活动/接待成功！' : '创建活动/接待成功！'
          });
          that.$router.push({path: '/by/reception/detail/' + that.reception.id});
        });
      }
    },
    mounted(){
      let that = this;
      this.reception.id = this.$store.state.route.params.id;
      if (this.reception.id) {
        this.reception.editMode = true;
        this.reception.httpDetail();
      }
    }
  }

</script>
