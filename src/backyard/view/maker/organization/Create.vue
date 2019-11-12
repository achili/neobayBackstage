<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!makerOrganization.editMode">创建服务机构</span>
          <span v-show="makerOrganization.editMode">编辑服务机构</span>
        </h2>
      </div>
    </div>

    <div class="row">
      <div class="col-xs-12 col-md-12">
        <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						基本信息
					</span>
          <div slot="body">

            <div class="row ">
              <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
              <div class="col-md-10">
                <SpaceRegionalSelection :spaceRegional="makerOrganization.spaceRegional" :editMode="makerOrganization.editMode"></SpaceRegionalSelection>
              </div>
            </div>

            <div class="row mt10">
              <div class="mt10">
                <label class="col-md-2 control-label mt5 compulsory">类型</label>
                <div class="col-md-10">
                  <select class="form-control" v-model="makerOrganization.type">
                    <option v-for="Type in makerOrganization.getTypeList()" :value="Type.value">
                      {{Type.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">名称</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.name">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">营业执照</label>
              <div class="col-md-10">
                <NbTank :tank="makerOrganization.scanning"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">Logo</label>
              <div class="col-md-10">
                <NbTank :tank="makerOrganization.logo"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">简介(最好不要超过70个字)</label>
              <div class="col-md-10">
            <textarea class="form-control" rows="3" v-model="makerOrganization.description"
                      placeholder="此处填写描述内容……"></textarea>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">介绍页链接</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.url">
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5">申请链接</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.orderUrl">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">联系人姓名</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.leaderName">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">联系人电话</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.leaderPhone">
              </div>
            </div>
            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">联系人邮箱</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="makerOrganization.leaderEmail">
              </div>
            </div>
          </div>
        </NbSlidePanel>



      </div>

      <div class="col-xs-12 m-t-md">
        <div class="alert alert-danger" v-show="makerOrganization.errorMessage">
          {{makerOrganization.errorMessage}}
        </div>
        <div>
          <CreateSaveButton :entity="makerOrganization" :callback="save"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {MessageBox, Notification} from 'element-ui'
  import MakerOrganization from "../../../../common/model/maker/MakerOrganization"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'
  import NbTank from '../../../../common/widget/NbTank'

  export default{
    data () {
      return {
        makerOrganization: new MakerOrganization(),
        user: this.$store.state.user,
        sportTitle: "提交"
      }
    },
    components: {
      NbSlidePanel,
      ProjectPagerSelection,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton,
      SpaceRegionalSelection,
      NbTank
    },
    computed: {},
    watch: {

    },
    methods: {
      save(){
        let that = this;
        this.makerOrganization.httpSave(function (response) {
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          Notification.success({
            message: that.makerOrganization.editMode ? '修改服务机构表成功！' : '创建服务机构表成功！'
          });
          that.$router.push("/by/maker/organization/list");
        });
      },
      fetchDetail(){
        this.makerOrganization.httpDetail();
      },
      //保存功能
      saveLocalData () {
        this.makerOrganization.saveToLocalStorage();
        Notification.success({
          message: '保存成功！'
        });
      }
    },
    mounted(){
      let that = this;
      this.makerOrganization.id = this.$store.state.route.query.id;
      if (this.makerOrganization.id) {
        this.makerOrganization.editMode = true;
        this.fetchDetail();
      } else {

      }
    }
  }

</script>


