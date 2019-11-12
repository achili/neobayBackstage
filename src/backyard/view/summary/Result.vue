<template>
  <div class="animated fadeIn">

    <div class="mb10">
      <div class="clearfix">

        <div class="pull-left f24">
          <i class="fa fa-bar-chart text-success"></i>

          <span>汇总统计</span>
        </div>
      </div>
    </div>

    <!--使用方法-->
    <NbSlidePanel type="info" :initShow="false">

      <span slot="heading">
        <i class="fa fa-bell"></i>
        使用方法
      </span>
      <div slot="body">
        <div class="alert alert-info">
          <p>
            一：选择需要查询的主要数据。
          </p>
          <p>
            主要数据对象是每一行显示的主要数据，每一行的主要数据是唯一的。比如需要查询每个项目的xxx内容，那么项目就是主要数据对象，一行代表一个项目，不同行必须是不同的项目。
          </p>
          <p>
            错误示范：查询每个企业管家申请对应的项目名称，主要数据对象选择项目。
          </p>
          <p>
            正确示范：查询每个企业管家申请对应的项目名称，主要数据对象选择企业管家申请。
          </p>
          <p>
            二：添加需要查询的字段。
          </p>
          <p>
            三：点击查询按钮。
          </p>
        </div>
      </div>
    </NbSlidePanel>

    <div>
      <!--选择主要数据-->
      <NbSlidePanel type="info">
        <span slot="heading" class="f16">
          <i class="fa fa-cogs"></i>
            统计汇总
        </span>
        <div slot="body">
          <div class="">
            <div class="mt5 compulsory">主要数据</div>
            <div class="">
              <select class="form-control" v-model="choiceAttribute" @change="choose">
                <option :value="null">
                  请选择主要数据
                </option>
                <option v-for="clazz in summaryClazzPage.attributes" :value="clazz">{{clazz.description}}</option>
              </select>
            </div>
          </div>

          <div class="">
            <div class="mt5 compulsory">园区地点</div>
            <div class="">
              <SpaceRegionalSelection :spaceRegional="summary.spaceRegional" :editMode="summary.editMode"></SpaceRegionalSelection>
            </div>
          </div>

          <div class="alert alert-danger text-left mt10" v-show="summary.errorMessage">
            {{summary.errorMessage}}
          </div>

          <div>请选择属性,选择完毕后刷新表格预览</div>

          <!--属性选择-->
          <!--<div class="row mt10">-->
          <!--<div class="col-md-4 col-sm-6 mt5"  v-for="attribute in attributeList">-->
          <!--<NbCheckbox :val="attribute" v-model="summary.summaryAttributeInfo"></NbCheckbox>-->
          <!--<label>{{attribute.description}}</label>-->
          <!--</div>-->
          <!--</div>-->

          <div>
            <AttributeCheckbox :summary="summary"></AttributeCheckbox>
          </div>

        </div>


        <button class="mt20 mb10 btn btn-primary" @click.stop.prevent="refresh">
          <i class="fa fa-refresh"></i>
          <span>刷新预览表格</span>
        </button>

        <ResultTable :summary="summary" :pager="reportPager" :refresh="refresh"></ResultTable>

        <a class="btn btn-success" target="_blank" @click="summary.exportExcelUrl()">
          <i class="fa fa-file-excel-o"></i>
          导出为Excel
        </a>

        <NbSlidePanel class="mt20" :initShow="false">

          <span slot="heading">
            <i class="fa fa-save"></i>
            保存
          </span>
          <div slot="body">

            <div class=""></div>
            <div class="row mv10">
              <div class="col-md-3 ">名称：</div>
              <div class="col-md-9">
                <input type="text" class="form-control" v-model="summary.name">
              </div>
            </div>

            <CreateSaveButton createText="保存到统计模板" :entity="summary" :callback="save" createIcon="fa fa-save"/>


          </div>
        </NbSlidePanel>



      </NbSlidePanel>

    </div>

  </div>

</template>
<script>
  import Summary from  "../../../common/model/summary/Summary"
  import Attribute from  "../../../common/model/template/Attribute"
  import Pager from  "../../../common/model/base/Pager"
  import BaseEntity from  "../../../common/model/base/BaseEntity"
  import {Notification} from 'element-ui';
  import models from "../../../common/model_/models"
  import {higherCamel} from "../../../common/filter/str"

  import NbSlidePanel from  "../../../common/widget/NbSlidePanel.vue"
  import ResultTable from  "./widget/resultTable/ResultTable.vue"
  import NbExpanding from '../../../common/widget/NbExpanding'
  import NbCheckbox from "../../../common/widget/NbCheckbox.vue";

  import AttributeCheckbox from "./widget/attributeCheckbox/AttributeCheckbox.vue"
  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

  export default {
    data(){
      return {
        summary: new Summary(),
        choiceAttribute: null,
        summaryClazzPage: new Pager(Attribute),
        reportPager: new Pager(BaseEntity),
        attributeList: [],
        isFirst: false
      }
    },
    components: {
      NbSlidePanel,
      ResultTable,
      NbExpanding,
      NbCheckbox,
      AttributeCheckbox,
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {
      "choiceAttribute"() {
        this.summary.errorMessage = null;
        if(!this.choiceAttribute) {
          this.summary = new Summary();
        } else {
          this.summary.name = this.choiceAttribute.name;
          if(!this.isFirst) {
            this.summary.summaryAttributeInfo = [];
          }
          this.summary.mainEntityPackage = this.choiceAttribute.clazz;
          this.summary.mainEntityClazz = models[higherCamel(this.choiceAttribute.name)];
          this.reportPager = new Pager(this.summary.mainEntityClazz);
        }
      }
    },
    methods: {
      choose() {


      },
      save() {
        console.log("hgehehe")
        let that = this;
        this.summary.httpSave(function () {
          Notification.success({
            message: '保存成功！'
          });
        });
      },
      refresh() {
        let that = this;
        this.summary.httpReport(this.reportPager.page, this.reportPager.pageSize,this.summary.spaceRegional, function (pagerMap) {
          that.reportPager = new Pager(that.summary.mainEntityClazz);
          that.reportPager.render(pagerMap);
          that.reportPager.initIndex();
        });
      }
    },
    mounted(){
      let that = this;
      this.summaryClazzPage.httpPage({isSummaryController: true}, function () {
        let id = that.$store.state.route.query.id;
        if(id) {
          that.summary.id = id;
          that.summary.httpDetail(function () {
            that.summaryClazzPage.attributes.forEach(attribut => {
              if(that.summary.mainEntityClazz === attribut.clazz) {
                that.isFirst = true;
                that.choiceAttribute = attribut;
              }
            })
          });
        }
      });
    }
  }

</script>


<!--/*先选择主数据对象(从可选数据对象中 对应着包名、动态引入的js、)-》-->
<!--*/-->
