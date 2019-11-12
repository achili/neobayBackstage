<template>
  <div class="animated fadeIn">


    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!makerCarousel.editMode">创建轮播图</span>
          <span v-show="makerCarousel.editMode">编辑轮播图</span>
        </h2>
      </div>
    </div>

    <NbSlidePanel>
      <span slot="heading" class="text-success f16">
        <i class="fa fa-image"></i>
        轮播图
      </span>
      <div slot="body">

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
          <div class="col-md-10">
            <SpaceRegionalSelection :spaceRegional="makerCarousel.spaceRegional" :editMode="makerCarousel.editMode"></SpaceRegionalSelection>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">名称</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="makerCarousel.name">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">标题</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="makerCarousel.title">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">副标题</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="makerCarousel.subtitle">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">图片</label>
          <div class="col-md-10">
            <NbTank :tank="makerCarousel.image"/>
          </div>
        </div>



        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">链接</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="makerCarousel.url">
          </div>
        </div>

        <div class="row mt10">

          <div class="col-xs-12">
            <div class="alert alert-danger" v-show="makerCarousel.errorMessage">
              {{makerCarousel.errorMessage}}
            </div>
            <div>
              <CreateSaveButton :entity="makerCarousel" :callback="save"/>
            </div>
          </div>
        </div>



      </div>
    </NbSlidePanel>


  </div>

</template>
<script>
  import NbTank from '../../../../common/widget/NbTank'
  import NbEditor from "../../../../common/widget/NbEditor"
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel"
  import NbCheckbox from "../../../../common/widget/NbCheckbox.vue"
  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import MakerCarousel from '../../../../common/model/maker/MakerCarousel'
  import CreateSaveButton from "../../widget/CreateSaveButton.vue";
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

  import {getErrorMessage} from '../../../../common/util/Utils'
  export default {

    data () {
      return {
        makerCarousel: new MakerCarousel()
      }
    },
    components: {
      NbTank,
      NbEditor,
      NbSlidePanel,
      NbCheckbox,
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.makerCarousel.httpSave(function (response) {

          Notification.success({
            message: that.makerCarousel.editMode ? '修改轮播图成功！' : '创建轮播图成功！'
          });
          that.$router.push("/by/maker/carousel/list");

        });
      }
    },


    mounted(){

      let that = this;

      this.makerCarousel.id = this.$store.state.route.params.id;

      if (this.makerCarousel.id) {

        this.makerCarousel.editMode = true;
        this.makerCarousel.httpDetail();
      }
    }
  }
</script>
