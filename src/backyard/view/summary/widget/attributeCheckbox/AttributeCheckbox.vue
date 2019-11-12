<template>
  <!--这是属性选择框  有递归-->
  <div class="border-radius-5 border p5">
    <div class="row mt5" v-if="attributeList.length > 30">
      <div class="col-md-4 col-sm-6">
        <div class="input-group">
          <input type="text" class="form-control input-sm" placeholder="搜索"
                 v-model="search">
          <div class="input-group-btn">
            <button class="btn btn-sm btn-primary">
              搜索
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row mt5 mb10">
      <div class="col-md-4 col-sm-6 mt5"  v-for="attribute in attributeList" v-show="attribute.isShow" v-if="attribute.isPrimitive || attribute.packageName === 'java.util.List'">
        <NbCheckbox :val="attribute" v-model="summary.summaryAttributeInfo"></NbCheckbox>
        <label>{{attribute.description}}</label>
      </div>
    </div>

    <div class="mt10 mb10" v-for="attribute in attributeList" v-if="!attribute.isPrimitive && attribute.packageName !== 'java.util.List'">
      <AttributeCheckboxChildren :summary="summary" :propAttribute="attribute"></AttributeCheckboxChildren>
    </div>
  </div>
</template>
<script>
  import Summary from "../../../../../common/model/summary/Summary";
  import Attribute from "../../../../../common/model/template/Attribute";
  import SummaryAttribute from "../../../../../common/model/summary/SummaryAttribute";

  import NbCheckbox from "../../../../../common/widget/NbSummaryCheckbox";
  import AttributeCheckboxChildren from "./widget/AttributeCheckboxChildren.vue";

  export default{
    data(){
      return {
        //watch里的方法是非阻塞类型的，这里临时保存summaryAttributeList是必须的
        summaryAttributeList: [],
        attributeList: [],
        tempAttribute: new Attribute(),
        search: null
      }
    },
    props: {
      summary: {
        type: Summary,
        required: true
      }
    },
    computed: {

    },
    components: {
      NbCheckbox,
      AttributeCheckboxChildren
    },
    watch: {
      "summary.mainEntityPackage"(newVal, oldVal) {
        if(newVal) {
          this.updateAttributeList();
        }
      },
      "summaryAttributeList"(newVal, oldVal) {
        let summaryAttribute = new SummaryAttribute();
        this.attributeList = JSON.parse(JSON.stringify(summaryAttribute.getListByAttributeList(newVal, null, this.summary.name)));
      },
      "search"(newVal, oldVal) {
        let allIsShow = true;
        if(!newVal) {
          this.attributeList.forEach(attribute => {
            attribute.isShow = true
          })
        } else {
          this.attributeList.forEach(attribute => {
            attribute.isShow = attribute.simpleDescription.indexOf(newVal) !== -1;
          })
        }

      }
    },
    methods: {
      updateAttributeList() {
        let that = this;
        that.tempAttribute.httpGetCandidates(that.summary.mainEntityPackage, true, function (attributeList) {
          that.summaryAttributeList = attributeList
        })
      },
      isShow(attribute) {
        let isContain = true;
        if(this.search) {
          isContain = attribute.simpleDescription.contain(this.search);
          return attribute.isPrimitive && isContain;
        }
        return attribute.isPrimitive;
      }
    },
    mounted(){

    }
  }
</script>
