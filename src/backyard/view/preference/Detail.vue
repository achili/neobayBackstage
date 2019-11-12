<template>
	<div class="row parking-apply-detail">

    <div class="col-xs-12 text-right">
      <SpaceRegionalSelection :spaceRegional="spaceRegional" :editMode="false"></SpaceRegionalSelection>
    </div>

    <div v-for="preference in pager.preferences " >
      <div class="col-xs-12 text-right">
        <a title="编辑" class="btn btn-success"
           @click.stop.prevent="$router.push('/by/preference/edit?id='+preference.id)">
          <i class="fa fa-pencil"></i>
          编辑
        </a>
      </div>

      <div class="col-xs-12">
        <h2 class="text-center">系统设置</h2>
      </div>

      <div class="col-xs-12">

        <NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-handshake-o"></i>
					合同字段
				</span>
          <div slot="body">

            <div class="row">
              <div class="col-md-3 ">合同签订方：</div>
              <div class="col-md-9 "><b>{{preference.party}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">法人或者授权人：</div>
              <div class="col-md-9 "><b>{{preference.representative}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">法人或者授权人电话：</div>
              <div class="col-md-9 "><b>{{preference.representativePhone}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">开户银行：</div>
              <div class="col-md-9 "><b>{{preference.bank}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">银行户名：</div>
              <div class="col-md-9 "><b>{{preference.bankName}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">开户银行账号：</div>
              <div class="col-md-9 "><b>{{preference.bankNo}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">开票信息-甲方纳税人识别号：</div>
              <div class="col-md-9 "><b>{{preference.taxpayerCode}}</b></div>
            </div>
            <div class="row mt10">
              <div class="col-md-3 ">开票信息-甲方地址：</div>
              <div class="col-md-9 "><b>{{preference.partyAAddress}}</b></div>
            </div>
            <div class="row mt10">
              <div class="col-md-3 ">开票信息-甲方电话：</div>
              <div class="col-md-9 "><b>{{preference.partyASignPhone}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">签约地点：</div>
              <div class="col-md-9 "><b>{{preference.signAddress}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">财务部联系人：</div>
              <div class="col-md-9 "><b>{{preference.financeDuty}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">财务部联系电话：</div>
              <div class="col-md-9 "><b>{{preference.financePhone}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">财务部地址：</div>
              <div class="col-md-9 "><b>{{preference.financeAddress}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">孵化空间：</div>
              <div class="col-md-9 "><b>{{preference.incubatorSpace}}</b></div>
            </div>

          </div>
        </NbSlidePanel>

        <NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-support"></i>
					项目字段
				</span>
          <div slot="body">

            <div class="row">
              <div class="col-md-3 ">入驻地址：</div>
              <div class="col-md-9 "><b>{{preference.entryAddress}}</b></div>
            </div>

          </div>
        </NbSlidePanel>

        <NbSlidePanel>
				<span slot="heading" class="text-success f16">
					<i class="fa fa-download"></i>
					版本更新字段
				</span>
          <div slot="body">

            <div class="row">
              <div class="col-md-3 ">版本号：</div>
              <div class="col-md-9 "><b>{{preference.versionNumber}}</b></div>
            </div>

            <div class="row mt10">
              <div class="col-md-3">Android版本文件：</div>
              <div class="col-md-9">
                <NbTank :tank="preference.versionFile" :edit="false"/>
              </div>
            </div>

            <div class="row mt10">
              <div class="col-md-3 ">IOS版本URL：</div>
              <div class="col-md-9 "><b>{{preference.appStoreUrl}}</b></div>
            </div>

          </div>
        </NbSlidePanel>

      </div>
    </div>

	</div>
</template>

<script>
	import {Notification} from 'element-ui';
	import NbSlidePanel from '../../../common/widget/NbSlidePanel.vue';
  import NbTank from '../../../common/widget/NbTank'
  import SpaceRegionalSelection from '../../../backyard/view/space/regional/Selection'
  import Pager from "../../../common/model/base/Pager";
  import Preference from "../../../common/model/preference/Preference";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";

	export default {

		data () {
			return {
				preference: this.$store.state.preference,
        pager:new Pager(Preference),
        spaceRegional:new SpaceRegional()
			}
		},
		components: {
			NbSlidePanel,
      NbTank,
      SpaceRegionalSelection
		},
    props:{

    },
    watch:{
      "spaceRegional.id"(newVal,oldVal){
        this.refresh();
      }
    },
		methods: {
      search() {
        this.pager.page = 0;
        this.refresh();
      },
      refresh() {
        let spaces = [];
        spaces.push(this.spaceRegional.id);
        this.pager.setFilter("spaceRegionalIds",spaces);
        this.pager.httpFastPage();
      }
    },
		mounted(){
      this.refresh();
		}
	}
</script>

<style lang="less" scoped>

</style>
