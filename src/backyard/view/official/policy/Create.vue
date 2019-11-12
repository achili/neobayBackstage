<template>
	<div class="animated fadeIn">
		<div class="row">
			<div class="col-xs-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!policy.editMode">发布政策</span>
					<span v-show="policy.editMode">编辑政策</span>
				</h2>
			</div>
		</div>

		<div class="row">
			<div class="col-xs-12">
				<CreateSaveButton  :entity="policy" :callback="save" />
			</div>
			<div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">园区地点</label>
          <SpaceRegionalSelection :spaceRegional="policy.spaceRegional" :editMode="policy.editMode"></SpaceRegionalSelection>
        </div>

				<div class="form-group">
					<label class="control-label">标题</label>
					<input type="text" class="form-control" v-model="policy.title">
				</div>

        <div class="form-group">
          <label class="control-label">标签</label>
          <NbTags :Clazz="OfficialPolicyTag" :tags="policy.tags" :spaceRegional="policy.spaceRegional" />
        </div>

        <!--<div class="form-group">-->
          <!--<label class="control-label">政策类型</label>-->
          <!--<div>-->
            <!--<select v-model="policy.type" class="form-control">-->
              <!--<option :value="type.value" v-for="type in policy.TypeList" v-if="type.value">{{type.name}}</option>-->
            <!--</select>-->
          <!--</div>-->
        <!--</div>-->

        <div class="form-group">
          <label  class="control-label">地区政策: </label>
          <!--<input type="text" class="form-control" v-model="policy.area.name">-->

          <AreaPagerSelection :PolicyArea="policy.area" class="mt10 " />
        </div>

				<div class="form-group">
					<label class="control-label">作者</label>
					<input type="text" class="form-control" v-model="policy.author">
				</div>
				<div class="form-group">
					<label class="control-label">发布时间</label>
					<div>
						<el-date-picker
							v-model="policy.releaseTime"
							type="datetime"
							placeholder="选择日期时间">
						</el-date-picker>
					</div>
				</div>
        <div class="form-group">
          <label class="control-label">摘要</label>
          <textarea rows="3" class="form-control" v-model="policy.digest" placeholder="请输入摘要..."></textarea>
        </div>
				<div class="m-b-md">
					<label class="control-label">正文</label>
					<div>
						<NbEditor v-model="policy.content" height="400px;"/>
					</div>
				</div>
			</div>
			<div class="col-xs-12 m-t-md">
				<div class="alert alert-danger" v-show="policy.errorMessage">
					{{policy.errorMessage}}

				</div>
				<div>
					<CreateSaveButton  :entity="policy" :callback="save" />

				</div>
			</div>
		</div>
	</div>

</template>
<script>
  import NbTags from '../../../../common/widget/NbTags'
  import NbEditor from "../../../../common/widget/NbEditor"
  import {simpleDateTime, str2Date} from '../../../../common/filter/time'
  import {Notification} from 'element-ui';
  import OfficialPolicy from  "../../../../common/model/official/OfficialPolicy"
  import OfficialPolicyTag from "../../../../common/model/official/OfficialPolicyTag"
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import Pager from  "../../../../common/model/base/Pager"
  import AreaPagerSelection from "../policy/Selection.vue";
  import SpaceRegionalSelection from '../../../../backyard/view/space/regional/Selection'

  import $ from "jquery"

  export default {

    data () {
      return {
        OfficialPolicyTag,
        policy: new OfficialPolicy(),
        officialPolicyTagPager: new Pager(OfficialPolicyTag)
      }
    },
    components: {
      NbTags,
      NbEditor,
      CreateSaveButton,
      AreaPagerSelection,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {
      "policy.tags"() {
        this.changeTagsArray();
      },
      "policy.editMode"() {
        this.changeTagsArray();
      },
      "policy.area.id"(newVal, oldVal) {
        this.policy.name = this.policy.area.name;
      }
    },
    methods: {
      save(){
        let that = this;

        this.policy.httpSave(function (response) {
          Notification.success({
            message: that.policy.editMode ? '修改政策成功！' : '创建政策成功！'
          });
          that.$router.push("/by/official/policy/detail/" + that.policy.id);

        });
      },
      refresh() {
        this.officialPolicyTagPager.pageSize = 30;
        this.officialPolicyTagPager.httpFastPage();
      },
      changeTagsArray() {
        let that = this;
        if(this.officialPolicyTagPager.officialPolicyTags) {
          this.officialPolicyTagPager.officialPolicyTags.forEach(function (obj) {
            if(that.article.tags.indexOf(obj.name) >= 0) {
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
      this.policy.id = this.$store.state.route.params.id;

      if (this.policy.id) {
        this.policy.editMode = true;
        this.policy.httpDetail();
      } else {
        this.policy.author = this.$store.state.user.nickname;
      }

      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">

</style>
