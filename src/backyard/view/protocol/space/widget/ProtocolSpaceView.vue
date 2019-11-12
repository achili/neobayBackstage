<template>

	<div>

		<NbSlidePanel>

      <span slot="heading" class="text-success f16">
        <i class="fa fa-dot-circle-o"></i>
        基本信息
      </span>
			<div slot="body">

				<div class="row" v-show="user.hasPermissionSpace(FeatureType.SPACE_APPLY_MANAGE,protocolSpace.spaceRegional.id)">
          <div class="col-md-3">关联创业空间申请：</div>
          <div class="col-md-9 bold">
						<router-link :to="{path: '/by/space/apply/detail/', query: { id: protocolSpace.spaceApply.id }}">{{protocolSpace.spaceApply.name}}
						</router-link>
					</div>
				</div>


				<div class="row mt10">
          <div class="col-md-3">关联项目：</div>
          <div class="col-md-9 bold">
            <router-link :to="user.hasPermissionSpace(FeatureType.PROJECT_MANAGE,protocolSpace.spaceRegional.id)? {path: '/by/project/detail', query: { id: protocolSpace.project.id }}: {path: '/group/project/detail', query: { id: protocolSpace.project.id }}">{{protocolSpace.project.name}}
            </router-link>
					</div>
				</div>

        <div class="row mt10">
          <div class="col-md-3 ">园区地点：</div>
          <div class="col-md-9 ">
           {{protocolSpace.spaceRegional.name}}
          </div>
        </div>

				<div class="row mt10">
          <div class="col-md-3 ">名称：</div>
          <div class="col-md-9 ">
						<b>{{protocolSpace.name}}</b>
						<span v-if="protocolSpace.archive" class="label label-danger">已归档</span>
					</div>
				</div>

        <div class="row mt10">
          <div class="col-md-3 ">类型：</div>
          <div class="col-md-9 ">
            <span :class="'label label-'+protocolSpace.getTypeStyle()">
              {{ protocolSpace.getTypeName() }}
            </span>
          </div>
        </div>

        <div class="row mt10" v-show="protocolSpace.type === protocolSpace.Type.INCUBATOR">
          <div class="col-md-3 ">电费收取方式：</div>
          <div class="col-md-9 ">
            <span :class="'label label-'+protocolSpace.getTariffTypeStyle()">
              {{ protocolSpace.getTariffTypeName() }}
            </span>
          </div>
        </div>

        <div class="row mt10">
          <div class="col-md-3 ">乙方用户：</div>
          <div class="col-md-9 ">
						<UserProfileLink :user="protocolSpace.user"/>
					</div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">创建时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.createTime | simpleDate}}</b></div>
				</div>


				<div class="row mt10">
          <div class="col-md-3 ">编号：</div>
          <div class="col-md-9 "><b>{{protocolSpace.no}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">甲方：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyA}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">乙方：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyB}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">房屋地址：</div>
          <div class="col-md-9 "><b>{{protocolSpace.address}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">建筑面积(m<sup>2</sup>)：</div>
          <div class="col-md-9 "><b>{{protocolSpace.area}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">产权证编号：</div>
          <div class="col-md-9 "><b>{{protocolSpace.propertyNo}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">年限：</div>
          <div class="col-md-9 "><b>{{protocolSpace.year}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">开始时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.startTime | simpleDate}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">结束时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.endTime | simpleDate}}</b></div>
				</div>

        <div class="row mt10" v-if="protocolSpace.spaceApply.type === protocolSpace.spaceApply.Type.ACCELERATOR">
          <div class="col-md-3 ">交付时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.deliveryTime | simpleDate}}</b></div>
        </div>
        <div class="row mt10" v-if="protocolSpace.spaceApply.type !== protocolSpace.spaceApply.Type.ACCELERATOR">
          <div class="col-md-3 ">第一期租金缴纳时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.firstRentalTime | simpleDate}}</b></div>
        </div>
        <div class="row mt10" v-if="protocolSpace.spaceApply.type !== protocolSpace.spaceApply.Type.ACCELERATOR">
          <div class="col-md-3 ">缴纳履约保证金时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.depositTime | simpleDate}}</b></div>
        </div>
        <div class="row mt10" v-show="protocolSpace.type === protocolSpace.Type.ACCELERATOR">
          <div class="col-md-3 ">装修免租期月数：</div>
          <div class="col-md-9 "><b>{{protocolSpace.rentFreePeriod }}</b></div>
        </div>

				<div class="row mt10">
          <div class="col-md-3 ">费用起算时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.rentStartTime | simpleDate}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">续租提前月数：</div>
          <div class="col-md-9 "><b>{{protocolSpace.reletAheadMonth }}</b></div>
				</div>
				<div class="row mt10" v-if="protocolSpace.spaceApply.type == protocolSpace.spaceApply.Type.ACCELERATOR">
          <div class="col-md-3 ">定金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.frontMoney }}</b></div>
				</div>
				<div class="row mt10" v-if="protocolSpace.spaceApply.type == protocolSpace.spaceApply.Type.ACCELERATOR">
          <div class="col-md-3 ">大写定金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.frontMoneyRental }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">租金/月：</div>
          <div class="col-md-9 "><b>{{protocolSpace.rental }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">大写租金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.capitalRental }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">几个月的履约保证金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.depositMonth }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">履约保证金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.deposit }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">大写履约保证金：</div>
          <div class="col-md-9 "><b>{{protocolSpace.capitalDeposit }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">抵扣总额：</div>
          <div class="col-md-9 "><b>{{protocolSpace.totalInnoToken }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">几个月付一次：</div>
          <div class="col-md-9 "><b>{{protocolSpace.intervalMonth }}</b></div>
				</div>


				<div class="row mt10">
          <div class="col-md-3 ">甲方联系电话：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyAPhone }}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">乙方联系电话：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyBPhone }}</b></div>
				</div>

        <div class="row mt10">
          <div class="col-md-3 ">财务联系人姓名：</div>
          <div class="col-md-9 "><b>{{protocolSpace.dutyName }}</b></div>
        </div>

        <div class="row mt10">
          <div class="col-md-3 ">财务联系人电话：</div>
          <div class="col-md-9 "><b>{{protocolSpace.dutyPhone }}</b></div>
        </div>

        <div class="row mt10">
          <div class="col-md-3 ">财务联系人邮箱：</div>
          <div class="col-md-9 "><b>{{protocolSpace.dutyEmail }}</b></div>
        </div>

				<div class="row mt10">
          <div class="col-md-3 ">状态：</div>
          <div class="col-md-9 ">
                      <span :class="'label label-'+protocolSpace.getStatusStyle()">
                        {{ protocolSpace.getStatusName() }}
                      </span>
					</div>
				</div>

				<div class="row mt10" v-if="user.hasPermissionSpace(FeatureType.PROTOCOL_SPACE_MANAGE,protocolSpace.spaceRegional.id)">
          <div class="col-md-3 ">PDF下载：</div>
          <div class="col-md-9 ">
						<a class="btn btn-success" target="_blank" :href="protocolSpace.downloadPdfUrl()">
							<i class="fa fa-file-pdf-o"></i>
							下载
						</a>
					</div>
				</div>

        <div class="row mt10">
          <div class="col-md-3 ">其它附件：</div>
          <div class="col-md-9 ">
            <NbTanks :tanks="protocolSpace.attachments" :edit="false"/>
          </div>
        </div>


      </div>
		</NbSlidePanel>

    <NbSlidePanel>
      <span slot="heading" class="text-success f16">
        <i class="fa fa-dot-circle-o"></i>
        发票信息
      </span>
      <div slot="body">
        <div class="row">
          <div class="col-md-6">

            <div class="row mt10">
              <div class="col-md-6 ">甲方纳税人识别号：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyACode}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">甲方开户银行：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyABank}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">甲方银行账号：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyABankNo}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">甲方地址：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyAAddress}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">甲方电话：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyASignPhone}}
              </div>
            </div>

          </div>
          <div class="col-md-6">

            <div class="row mt10">
              <div class="col-md-6 ">乙方纳税人识别号：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyBCode}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">乙方开户银行：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyBBank}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">乙方银行账号：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyBBankNo}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">乙方地址：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyBAddress}}
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-6 ">乙方电话：</div>
              <div class="col-md-6 ">
                {{protocolSpace.partyBSignPhone}}
              </div>
            </div>

          </div>
        </div>

        <div class="row mt10">
          <div class="col-md-3 ">发票类型：</div>
          <div class="col-md-9 ">
            {{protocolSpace.invoiceType}}
          </div>
        </div>
      </div>
    </NbSlidePanel>

    <NbSlidePanel v-if="protocolSpace.status !== protocolSpace.Status.NEW">

      <span slot="heading" class="text-success f16">
        <i class="fa fa-dot-circle-o"></i>
        签约信息
      </span>
			<div slot="body">

				<div class="row mt10">
          <div class="col-md-3 ">甲方代表人：</div>
          <div class="col-md-9 ">
						{{protocolSpace.partyARepresentative}}
					</div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">甲方签署时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyATime | simpleDate}}</b></div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">乙方代表人：</div>
          <div class="col-md-9 ">
						{{protocolSpace.partyBRepresentative}}
					</div>
				</div>

				<div class="row mt10">
          <div class="col-md-3 ">乙方签署时间：</div>
          <div class="col-md-9 "><b>{{protocolSpace.partyBTime | simpleDate}}</b></div>
				</div>

        <div class="row mt10">
          <div class="col-md-3 ">合同版本号：</div>
          <div class="col-md-9 "><b>{{protocolSpace.contractNo}}</b></div>
        </div>

        <div class="row mt10">
          <div class="col-md-3 ">扫描件：</div>
          <div class="col-md-9 ">
						<NbTank :tank="protocolSpace.scanning" :edit="true"/>
					</div>
				</div>
        <div class="col-md-12 mv10 text-right">
          <CreateSaveButton  class="ml1" :entity="protocolSpace" :callback="save"/>
        </div>
			</div>
		</NbSlidePanel>

		<NbSlidePanel v-if="protocolSpace.status !== protocolSpace.Status.NEW">

      <span slot="heading" class="text-success f16">
        <i class="fa fa-cny"></i>
        付款信息
      </span>
			<div slot="body">

				<div class="row">
          <div class="col-md-3 ">相关付款信息单：</div>
          <div class="col-md-9 ">

						<div class="bold mb10" v-for="(financePayInfo,index) in protocolSpace.financePayInfos">
							<a href="javascript:void(0)"
							   @click.stop.prevent="$router.push('/by/finance/pay/info/detail/'+financePayInfo.id)">
								{{financePayInfo.name}}
							</a>
						</div>

					</div>
				</div>

			</div>
		</NbSlidePanel>

	</div>

</template>


<script>
	import ProtocolSpace from  "../../../../../common/model/protocol/space/ProtocolSpace"
	import NbSlidePanel from  "../../../../../common/widget/NbSlidePanel.vue"
	import NbTank from  "../../../../../common/widget/NbTank.vue"
	import NbTanks from  "../../../../../common/widget/NbTanks.vue"
	import UserProfileLink from "../../../widget/UserProfileLink";
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"

  export default{
		data(){
			return {
				FeatureType: this.$store.state.FeatureType,
				user: this.$store.state.user
			}
		},
		props: {
			protocolSpace: {
				type: ProtocolSpace,
				required: true
			}

		},
    methods: {
      save(){
        let that = this;
        this.protocolSpace.saveScanning(function (response) {
          Notification.success({
            message: that.keeperBusiness.editMode ? '修改签约信息成功！' : '创建签约信息成功！'
          });
          //that.$router.push("list");
        });
      }
    },

		components: {
			NbSlidePanel,
			UserProfileLink,
			NbTanks,
			NbTank,
      CreateSaveButton
		}

	}


</script>
