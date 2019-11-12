<template>
  <div class="row parking-apply-detail">

    <div class="col-xs-12 text-right">
      <a title="编辑" class="btn btn-success" @click.stop.prevent="$router.push('/by/parking/apply/edit/'+parkingApply.id)">
        <i class="fa fa-pencil"></i>
        编辑
      </a>
    </div>

    <div class="review-tool" v-show="tool.show">
      <div :class="{'review-tool-box': !tool.eject, 'review-tool-box show': tool.eject }">
        <div :class="'review-tool-sign f15 '+ parkingApply.getStatusBackground()" @click="tool.eject=!tool.eject">
          <i class="fa fa-cogs fa-spin"></i><span>{{parkingApply.getStatusName()}}</span>
        </div>
        <div class="review-operation">
          <div class="title f13">操作</div>
          <div class="review-operation-btn">
            <button :class="'mb5 btn btn-'+ parkingApplyStatus.style" v-for="parkingApplyStatus in parkingApply.getStatusList()"
                    :disabled="!parkingApply.statusFilter(parkingApply.status, parkingApplyStatus.value)"
                    @click="parkingApply.requestChangeClicker(parkingApplyStatus.value)">
              {{parkingApplyStatus.name}}
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="col-xs-12">
      <h2 class="text-center">{{parkingApply.name}}的停车申请</h2>
    </div>

    <div class="col-lg-10 ml100 dl-horizontal ibox-content">
      <h4>
        基本信息
      </h4>
      <div class="ibox-content dl-horizontal">
        <dt>联系方式：</dt><dd>{{parkingApply.phone}}</dd>
      </div>
      <div class="ibox-content dl-horizontal">
        <dt>E-mail：</dt><dd>{{parkingApply.email}}</dd>
      </div>
      <div class="ibox-content dl-horizontal">
        <dt>驳回理由：</dt><dd>{{parkingApply.reason}}</dd>
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">身份证正面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.idCardFront && parkingApply.idCardFront.url" :src="parkingApply.idCardFront.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">身份证反面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.idCardBack && parkingApply.idCardBack.url" :src="parkingApply.idCardBack.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">行驶证正面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.drivingLicenceFront && parkingApply.drivingLicenceFront.url" :src="parkingApply.drivingLicenceFront.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">行驶证反面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.drivingLicenceBack && parkingApply.drivingLicenceBack.url" :src="parkingApply.drivingLicenceBack.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">驾驶证正面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.driverLicenceFront && parkingApply.driverLicenceFront.url" :src="parkingApply.driverLicenceFront.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 ">
      <h3 class="text-center">驾驶证反面</h3>
    </div>
    <div class="col-xs-10 ml100 dl-horizontal ibox-content">
      <div class="center">
        <img v-if="parkingApply.driverLicenceBack && parkingApply.driverLicenceBack.url" :src="parkingApply.driverLicenceBack.url" width="300" height="200" hspace="300">
      </div>
    </div>

    <div class="col-xs-12 text-center" v-show="parkingApply.loading">
      <i class="fa fa-spinner fa-spin fa-3x fa-fw"></i>
    </div>
  </div>
</template>

<script>
	import {Notification} from 'element-ui';
	import ParkingApply from '../../../common/model/parking/ParkingApply'
	import NbTank from '../../../common/widget/NbTank'

	export default {

		data () {
			return {
				parkingApply: new ParkingApply(),
				tool: {
					eject: false,
					show: false
				}
			}
		},
		components: {
		NbTank
		},
		methods: {
			fetchDetail(){
				let that = this;
				this.parkingApply.id = this.$store.state.route.params.id;
				if (this.parkingApply.id) {
					this.parkingApply.httpReviewing(function () {
						that.tool.show = true;
					});
				}
			}
		},
		mounted(){
			this.fetchDetail();
		}
	}
</script>

<style lang="less" scoped>
  .parking-apply-detail {
    .ibox-content {
      &>div {
        margin-top:5px;
      }
    }
    .review-tool {
      top: 15%;
      right: 0px;
      overflow: hidden;
      position:fixed;
      z-index:20000;

      .review-tool-box {
        margin-right: -150px;
        position: relative;
        transition-duration: 0.8s;
        &.show {
          margin-right: 0;
        }
        .review-tool-sign {
          position: absolute;
          padding: 7px 10px 7px 13px;
          border-radius: 20px 0 0 20px;
          top: 0;
          left: 0;
          width: 40px;
          color: #fff;
          cursor: pointer;
        }
        .review-operation {
          width: 150px;
          margin-left: 40px;
          background: #efefef;
          .review-operation-btn {
            padding: 10px 30px;
          }
          .title {
            background: #cfcfcf;
            text-align: center;
            text-transform: uppercase;
            font-weight: 600;
            display: block;
            padding: 10px 15px;
          }
        }
      }
    }
  }

</style>
