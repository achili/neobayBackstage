<template>
  <div class="animated fadeIn">

    <div class="row mb10">
      <div class="col-md-12 clearfix">

        <div class="pull-left f24">
          <i class="fa fa-superpowers text-success"></i>

          <span>高级汇总统计分析</span>
        </div>
      </div>
    </div>
    <NbSlidePanel type="info">

      <span slot="heading">
        <i class="fa fa-bell"></i>
        分析选项
      </span>
      <div slot="body">
        <div class="">
          <div class="row mt10">
            <div class="col-md-3 compulsory">表名称：</div>
            <div class="col-md-9">
              <input type="text" class="form-control" v-model="summaryAnalysis.title">
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 compulsory">园区地点：</div>
            <div class="col-md-9">
              <SpaceRegionalSelection :spaceRegional="summaryAnalysis.spaceRegional" :editMode="summaryAnalysis.editMode"></SpaceRegionalSelection>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 compulsory">主要数据对象：</div>
            <div class="col-md-9">
              <select class="form-control" v-model="summaryAnalysis.mainEntityClazz">
                <option :value="null">
                  请选择主要数据
                </option>
                <option v-for="clazz in summaryClazzPage.attributes" :value="clazz.clazz">{{clazz.description}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 compulsory">统计属性：</div>
            <div class="col-md-9">
              <select class="form-control" v-model="summaryAnalysis.fieldName">
                <option :value="null">
                  统计数量
                </option>
                <option v-if="summaryAttribute.isAnalysis" v-for="summaryAttribute in summaryAttributeList" :value="summaryAttribute.name">统计{{summaryAttribute.description}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 compulsory">分类属性：</div>
            <div class="col-md-9">
              <select class="form-control" v-model="summaryAnalysis.classifyAttribute">
                <option :value="null">
                  不分类
                </option>
                <option v-if="summaryAttribute.isClassification" v-for="summaryAttribute in summaryAttributeList" :value="summaryAttribute.name">{{summaryAttribute.description}}</option>
              </select>
            </div>
          </div>

          <div class="row mt10">
            <div class="col-md-3 compulsory">时间间隔：</div>
            <div class="col-md-9">
              <NbBtnDropdown :name="summaryAnalysis.getTimeIntervalTypeName()" size="sm"
                             :color="summaryAnalysis.getTimeIntervalTypeStyle()">
                <ul>
                  <li v-for="(option, index) in summaryAnalysis.TimeIntervalTypeList">
                    <a href="javascript:void(0)" @click="summaryAnalysis.timeIntervalType = option.value">{{option.name}}</a>
                  </li>
                </ul>
              </NbBtnDropdown>
            </div>
          </div>

          <NbSlidePanel class="mt10" type="info" v-show="summaryAnalysis.timeIntervalType != summaryAnalysis.TimeIntervalType.NONE">
            <span slot="heading">
              <i class="fa fa-bell"></i>
              时间间隔相关
            </span>
            <div slot="body">
              <div class="row mt10">
                <div class="col-md-3 compulsory">是否累加：</div>
                <div class="col-md-9">
                  <NbBtnDropdown :name="summaryAnalysis.getCumulativeTypeName()" size="sm"
                                 :color="summaryAnalysis.getCumulativeTypeStyle()">
                    <ul>
                      <li v-for="(option, index) in summaryAnalysis.CumulativeTypeList">
                        <a href="javascript:void(0)" @click="summaryAnalysis.cumulativeType = option.value">{{option.name}}</a>
                      </li>
                    </ul>
                  </NbBtnDropdown>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-3 compulsory">时间属性：</div>
                <div class="col-md-9">
                  <select class="form-control" v-model="summaryAnalysis.timeFieldName">
                    <option :value="null">
                      请选择间隔时间对应的属性
                    </option>
                    <option v-if="summaryAttribute.isTimeInterval" v-for="summaryAttribute in summaryAttributeList" :value="summaryAttribute.name">{{summaryAttribute.description}}</option>
                  </select>
                </div>
              </div>

              <div class="row mt10">
                <div class="col-md-3 compulsory">日期范围：</div>
                <div class="col-md-9">
                  <NbDateRange :startTime="summaryAnalysis.startTime"
                               v-on:startTimeChange="summaryAnalysis.startTime = arguments[0]"
                               :endTime="summaryAnalysis.endTime"
                               v-on:endTimeChange="summaryAnalysis.endTime = arguments[0]"/>
                </div>
              </div>
            </div>
          </NbSlidePanel>

        </div>


        <div class="row mt10">
          <div class="col-md-12">
            <NbAnalysisCharts :summaryAnalysis="summaryAnalysis"></NbAnalysisCharts>
          </div>
        </div>

      </div>

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
              <input type="text" class="form-control" v-model="summaryAnalysis.note">
            </div>
          </div>

          <CreateSaveButton createText="保存到图表模板" :entity="summaryAnalysis" :callback="save" createIcon="fa fa-save"/>

        </div>
      </NbSlidePanel>

    </NbSlidePanel>
  </div>

</template>
<script>

  import NbSlidePanel from  "../../../common/widget/NbSlidePanel.vue"
  import NbAnalysisCharts from '../../../common/widget/charts/NbAnalysisCharts'

  import Pager from  "../../../common/model/base/Pager"
  import Attribute from  "../../../common/model/template/Attribute"

  import SummaryAnalysisResult from "../../../common/model/summary/analysis/SummaryAnalysisResult"
  import SummaryAnalysis from "../../../common/model/summary/analysis/SummaryAnalysis"
  import NbBtnDropdown from '../../../common/widget/NbBtnDropdown'
  import NbDateRange from  "../../../common/widget/NbDateRange.vue"
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'

  import CreateSaveButton from "../../../backyard/view/widget/CreateSaveButton.vue"
  import {Notification} from 'element-ui';



  export default {
    data(){
      return {
        summaryAnalysis: new SummaryAnalysis(),
        summaryClazzPage: new Pager(Attribute),
        choiceAttribute: null,
        summaryAttributeList: [],
        tempAttribute: new Attribute()
      }
    },
    components: {
      NbSlidePanel,
      NbAnalysisCharts,
      NbBtnDropdown,
      NbDateRange,
      CreateSaveButton,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {
      "summaryAnalysis.mainEntityClazz"() {
        this.updateAttributeList();
      }
    },
    methods: {
      updateAttributeList() {
        if(!this.summaryAnalysis.mainEntityClazz) {
          return;
        }
        let that = this;
        that.tempAttribute.httpGetCandidates(that.summaryAnalysis.mainEntityClazz, true, function (attributeList) {
          that.summaryAttributeList = attributeList
        })
      },
      save() {
        let that = this;
        this.summaryAnalysis.httpSave(function () {
          Notification.success({
            message: '保存成功！'
          });
        });
      },
      refresh() {
        let that = this;
       this.summaryAnalysis.httpReport(this.summaryClazzPage.page,this.summaryClazzPage.pageSize,function (pagerMap) {
         that.summaryClazzPage = new Pager(that.summaryAnalysis.mainEntityClazz);
         that.summaryClazzPage.render(pagerMap);
         that.summaryClazzPage.initIndex();
       });
      }
    },
    mounted(){
      //this.summaryClazzPage.httpPage({isSummaryController: true});
      //this.updateAttributeList();

      let that = this;
      this.summaryClazzPage.httpPage({isSummaryController: true},function () {
        let id = that.$store.state.route.query.id;
        if(id){
          that.summaryAnalysis.id = id;
          that.summaryAnalysis.httpDetail(function () {
            that.summaryClazzPage.attributes.forEach(attribut => {
              if(that.summaryAnalysis.mainEntityClazz === attribut.clazz){
                that.updateAttributeList();
                that.choiceAttribute = attribut;
              }
            })
          });

        }
      });

    }
  }

</script>
