<template>
	<div class="animated fadeIn">

		<LoadingFrame :loading="company.detailLoading">
			<div class="row">
				<div class="col-xs-12">
					<h2>
						<i class="fa fa-fire text-success"></i>
						<span v-show="!company.editMode">新建公司</span>
						<span v-show="company.editMode">编辑公司</span>
					</h2>

					<CreateSaveButton :entity="company" :callback="save"/>
				</div>
			</div>

			<div class="row">

				<div class="col-xs-12 ml10">
					<button v-for="type in company.Types" class="btn ml10 mb5 mt5"
					        :class="{'btn-success': selected===type.index,'btn-default': selected!==type.index}"
					        @click="chooseType(type.index)">
            <span :class="{'compulsory':type.compulsory}"></span>
						<i :class="type.fa"></i>
						<span>
              {{type.name}}
            </span>
					</button>

					<BasicInfo v-show="selected === 0" :company="company"/>
          <EquityStruc v-show="selected === 2" :company="company"/>
          <CoreStruc v-show="selected === 3" :company="company"/>
          <FinanceInfo v-show="selected === 4" :company="company"/>
          <PatentInfo v-show="selected === 5" :company="company"/>
          <IntellectInfo v-show="selected === 7" :company="company"/>
          <InvestInfo v-show="selected === 6" :company="company"/>
          <QulifiInfo v-show="selected === 8" :company="company"/>
          <OrganizationInfo v-show="selected === 9" :company="company"/>

					<AddInfo v-show="selected === 1" :company="company"/>



				</div>
			</div>

			<div class="row">
				<div class="col-xs-12 m-t-md">
					<div class="alert alert-danger" v-show="company.errorMessage">
						{{company.errorMessage}}
					</div>
					<div class="pull-right">
						<button class="mr5 btn btn-success" @click="saveLocalData">
							<i class="fa fa-save"></i>
							本地保存
						</button>
						<CreateSaveButton :entity="company" :callback="save"/>
					</div>
				</div>
			</div>
		</LoadingFrame>

	</div>
</template>
<script>
	import NbTank from '../../../common/widget/NbTank'
	import {simpleDateTime, str2Date} from '../../../common/filter/time'
	import {Notification} from 'element-ui'
	import Company from '../../../common/model/company/Company'
	import CreateSaveButton from "../widget/CreateSaveButton.vue"
	import LoadingFrame from "../widget/LoadingFrame";

	import BasicInfo from './widget/BasicInfo';
	import AddInfo from './widget/AddInfo';
	import FinanceInfo from './widget/FinanceInfo';
	import IntellectInfo from './widget/IntellectInfo';
	import InvestInfo from './widget/InvestInfo';
	import OrganizationInfo from './widget/OrganizationInfo';
	import PatentInfo from './widget/PatentInfo';
	import QulifiInfo from './widget/QulifiInfo';
	import CoreStruc from './widget/CoreStruc';
	import EquityStruc from './widget/EquityStruc';
	import $ from "jquery"

	export default {
		data () {
			return {
				selected: 0,
				company: new Company()

			}
		},
		components: {
			NbTank,
			BasicInfo,
			AddInfo,
			CoreStruc,
			EquityStruc,
			FinanceInfo,
			IntellectInfo,
			InvestInfo,
			OrganizationInfo,
			PatentInfo,
			QulifiInfo,
			CreateSaveButton,
			LoadingFrame
		},
		computed: {},
		watch: {},
		methods: {
			//保存功能
			saveLocalData () {
        this.company.saveToLocalStorage();
				Notification.success({
					message: '保存成功！'
				});
			},
			save(){
				let that = this;
				that.company.httpSave(function (response) {
					Notification.success({
						message: that.company.editMode ? '修改公司成功！' : '创建公司成功！'
					});
					that.$router.push({path: 'detail', query: { id: that.company.id }});
				});
			},
			chooseType(num) {
				this.selected = num;
			},
			fetchDetail(){
				this.company.httpDetail();
			}
		},
		mounted(){
			let that = this;
			that.company.id = that.$store.state.route.query.id;
			if (that.company.id) {
				that.company.editMode = true;
				that.fetchDetail();
			} else {
        this.company.renderFromLocalStorage()
			}
		}
	}


</script>
