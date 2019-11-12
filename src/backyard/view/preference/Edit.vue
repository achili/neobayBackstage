<template>
	<div class="animated fadeIn">

		<NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-handshake-o"></i>
					合同字段
				</span>
			<div slot="body">

				<div class="row">
					<label class="col-md-2 control-label mt5 compulsory">合同签订方</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.party">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">法人或者授权人</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.representative">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">法人或者授权人电话</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.representativePhone">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">开户银行</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.bank">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">银行户名</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.bankName">
					</div>
				</div>


				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">开户银行账号</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.bankNo">
					</div>
				</div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">开票信息-甲方纳税人识别号</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="preference.taxpayerCode">
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">开票信息-甲方地址</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="preference.partyAAddress">
          </div>
        </div>
        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">开票信息-甲方电话</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="preference.partyASignPhone">
          </div>
        </div>

        <div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">签约地点</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.signAddress">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">财务部联系人</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.financeDuty">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">财务部联系电话</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.financePhone">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">财务部地址</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.financeAddress">
					</div>
				</div>

				<div class="row mt10">
					<label class="col-md-2 control-label mt5 compulsory">孵化空间</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.incubatorSpace">
					</div>
				</div>


			</div>
		</NbSlidePanel>
		<NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-handshake-o"></i>
					项目字段
				</span>
			<div slot="body">

				<div class="row">
					<label class="col-md-2 control-label mt5 compulsory">入驻地址</label>
					<div class="col-md-10">
						<input type="text" class="form-control" v-model="preference.entryAddress">
					</div>
				</div>

			</div>
		</NbSlidePanel>
    <NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-handshake-o"></i>
					版本更新字段
				</span>
      <div slot="body">

        <div class="row">
          <label class="col-md-2 control-label mt5 compulsory">版本号</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="preference.versionNumber">
          </div>
        </div>

        <div class="row mt10">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label col-md-2 mt5 compulsory">版本文件</label>
          <div class="col-md-10">
            <NbTank :tank="preference.versionFile"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-2 control-label mt5 compulsory">IOS版本URL</label>
          <div class="col-md-10">
            <input type="text" class="form-control" v-model="preference.appStoreUrl">
          </div>
        </div>

      </div>
    </NbSlidePanel>

		<div>
			<div class="alert alert-danger text-center" v-show="preference.errorMessage">
				{{preference.errorMessage}}
			</div>
			<CreateSaveButton :entity="preference" :callback="save"/>
		</div>


	</div>

</template>

<script>
	import {Notification} from 'element-ui';
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue'
	import CreateSaveButton from '../widget/CreateSaveButton.vue'
  import NbTank from '../../../common/widget/NbTank'
  import Preference from "../../../common/model/preference/Preference";

	export default {

		data () {
			return {
				preference: new Preference()
			}
		},
		components: {
			NbSlidePanel,
			CreateSaveButton,
      NbTank
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.preference.httpSave(function () {
					Notification.success({
						message: '修改系统设置成功！'
					});
					that.$router.push("/by/preference/detail");
				});
			}
		},
		mounted(){

      this.preference.id = this.$store.state.route.query.id;
      if (this.preference.id) {
        this.preference.editMode = true;
        this.preference.httpDetail();
      }
		}
	}
</script>
<style lang="less" rel="stylesheet/less">
  .file-button{
    margin-left: 17.5%;
  }
</style>
