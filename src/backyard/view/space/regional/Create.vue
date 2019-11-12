<template>
  <div class="animated fadeIn">
    <LoadingFrame :loading="spaceRegional.loading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!spaceRegional.editMode">创建空间</span>
            <span v-show="spaceRegional.editMode">编辑空间</span>
          </h2>
          <NbSlidePanel>
            <span slot="heading" class="text-default">
              <i class="fa fa-dot-circle-o"></i>
              基本信息
            </span>
            <div class="row" slot="body">

              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">空间名称</label>
                  <div class="col-md-10">
                    <input type="text" class="form-control" v-model="spaceRegional.name">
                  </div>
                </div>
              </div>


              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">空间描述（可用于邀请访客函页面）</label>
                  <div class="col-md-10">
                    <textarea class="form-control" rows="6" v-model="spaceRegional.description"
                              placeholder="此处填写空间描述……"></textarea>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="row mt10">
                  <div class="col-md-12">
                    <span class="red f12">提醒：该经纬度用于邀请访客上的地图，请转于高德地图拾取坐标。</span>
                    <a href=" https://lbs.amap.com/console/show/picker" target="_blank"> https://lbs.amap.com/console/show/picker</a>
                  </div>
                </div>
              </div>

              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">经度</label>
                  <div class="col-md-4">
                    <input type="text" class="form-control" v-model="spaceRegional.longitude">
                  </div>
                  <label class="col-md-2 control-label mt5 compulsory">纬度</label>
                  <div class="col-md-4">
                    <input type="text" class="form-control" v-model="spaceRegional.latitude">
                  </div>
                </div>
              </div>


              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">地址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="spaceRegional.address">
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">英语地址</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="spaceRegional.englishAddress">
                  </div>
                </div>
              </div>

              <div class="col-md-6">
                <div class="row mt10">
                  <label class="col-md-4 control-label mt5 compulsory">编码</label>
                  <div class="col-md-8">
                    <input type="text" class="form-control" v-model="spaceRegional.no">
                  </div>
                </div>
              </div>

            </div>
          </NbSlidePanel>
        </div>
        <div class="col-md-12 text-right mt10">
          <!--<CreateSaveButton :entity="spaceRegional" :callback="save" />-->
          <SubmitButton :loading="spaceRegional.loading" :callback="save" />
        </div>
      </div>
    </LoadingFrame>

  </div>
</template>

<script>
  import NumberInput from '../../../../common/widget/NbNumberInput'
  import {Notification, MessageBox} from 'element-ui';
  import $ from "jquery"
  import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
  import SpaceBuildingSelection from '../building/Selection'
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import SpaceRegional from "../../../../common/model/space/SpaceRegional";
  import SubmitButton from "../../widget/SubmitButton.vue"

  export default{
    data(){
      return {
        spaceRegional: new SpaceRegional()

      }
    },
    components: {
      NumberInput,
      NbSlidePanel,
      SpaceBuildingSelection,
      CreateSaveButton,
      LoadingFrame,
      SubmitButton
    },
    computed: {

    },
    watch: {

    },
    methods: {
      save(){
        let that = this;
        this.spaceRegional.httpSave(function (response) {
          Notification.success({
            message: that.spaceRegional.editMode ? '修改空间成功！' : '创建空间成功！'
          });
          that.$router.push("/by/space/regional/detail?id=" + that.spaceRegional.id);
        });
      },
      fetchDetail(){
        let that = this;
        that.spaceRegional.httpDetail(function () {

        });
      }
    },
    mounted(){
      let that = this;
      this.spaceRegional.id = this.$store.state.route.query.id;
      if (this.spaceRegional.id) {
        this.spaceRegional.editMode = true;
        this.fetchDetail();
      }
    }
  }

</script>
