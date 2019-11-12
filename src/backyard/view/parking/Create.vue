<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <h2>
          <i class="fa fa-fire text-success"></i>
          <span v-show="!parkingApply.editMode">创建停车申请</span>
          <span v-show="parkingApply.editMode">修改停车申请</span>
        </h2>
      </div>
    </div>


    <div class="row">
      <div class="col-xs-12">
        <button v-show="!parkingApply.editMode" class="pull-right btn btn-success f16" @click="save">
          <i class="fa fa-plus"></i>
          创建
        </button>
        <button v-show="parkingApply.editMode" class="pull-right btn btn-primary f16" @click="save">
          <i class="fa fa-save"></i>
          保存
        </button>
      </div>
      <div class="col-xs-12 m-t-md">

        <div class="form-group">
          <label class="control-label">申请人姓名</label>
          <input type="text" class="form-control" v-model="parkingApply.name">
        </div>

        <div class="form-group">
          <label class="control-label">联系方式</label>
          <input type="text" class="form-control" v-model="parkingApply.phone">
        </div>

        <div class="form-group">
          <label class="control-label">E-mail</label>
          <input type="text" class="form-control" v-model="parkingApply.email">
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">身份证正面</label>
          <div>
            <NbTank :tank="parkingApply.idCardFront"/>
          </div>
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">身份证反面</label>
          <div>
            <NbTank :tank="parkingApply.idCardBack"/>
          </div>
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">行驶证正面</label>
          <div>
            <NbTank :tank="parkingApply.drivingLicenceFront"/>
          </div>
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">行驶证反面</label>
          <div>
            <NbTank :tank="parkingApply.drivingLicenceBack"/>
          </div>
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">驾驶证正面</label>
          <div>
            <NbTank :tank="parkingApply.driverLicenceFront"/>
          </div>
        </div>

        <div class="form-group clear">
          <img class="thumb-lg pull-left m-r-md">
          <label class="control-label">驾驶证反面</label>
          <div>
            <NbTank :tank="parkingApply.driverLicenceBack"/>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
	import NbTank from '../../../common/widget/NbTank'
	import {Notification} from 'element-ui';
	import ParkingApply from '../../../common/model/parking/ParkingApply'

	import $ from "jquery"

	export default {

		data () {
			return {
				parkingApply: new ParkingApply()
			}
		},
		components: {
			NbTank
		},
		computed: {},
		watch: {},
		methods: {
			save(){
				let that = this;
				this.parkingApply.httpSave(function (response) {

					Notification.success({
						message: that.parkingApply.editMode ? '修改停车申请成功！' : '创建停车申请成功！'
					});
					that.$router.push("/by/parking/apply/detail/" + that.parkingApply.id);

				});
			}
		},


		mounted(){

			let that = this;

			this.parkingApply.id = this.$store.state.route.params.id;

			if (this.parkingApply.id) {

				this.parkingApply.editMode = true;
				this.parkingApply.httpDetail();
			}
		}
	}
</script>
