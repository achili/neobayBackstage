<template>
  <div class="ispace-energy-list">
    <div class="row mt10">
      <label class="col-md-2 control-label mt5 compulsory">设备名称</label>
      <div class="col-md-10">
        <input type="text" class="form-control"  v-model="energyPoint.name">
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-2 control-label mt5 compulsory">设备ID</label>
      <div class="col-md-10">
        <input type="text" class="form-control"  v-model="energyPoint.deviceId">
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-2 control-label mt5 compulsory">点位ID</label>
      <div class="col-md-10">
        <input type="text" class="form-control" v-model="energyPoint.point">
      </div>
    </div>

    <div class="row mt10">
      <label class="col-md-2 control-label mt5 compulsory">设备类型</label>
      <span class="col-md-10">
        <span>
          <NbRadio v-model="energyPoint.type" val="WATT_METER" name="type"></NbRadio>
          <label>电表</label>
        </span>
        <span>
          <NbRadio v-model="energyPoint.type" val="AIR_CONDITIONER" name="type"></NbRadio>
          <label>空调调控器</label>
        </span>
      </span>
    </div>
    <div class="col-xs-12 mv10 text-right">
      <CreateSaveButton :entity="energyPoint" :callback="save"/>
    </div>
  </div>

</template>
<script>

  import {MessageBox, Notification as NotificationBox} from 'element-ui'
  import NbRadio from "../../../../../common/widget/NbRadio.vue";
  import NbPagerSelection from "../../../../../common/widget/NbPagerSelection";
  import EnergyPoint from "../../../../../common/model/ispace/energy/EnergyPoint";
  import NbDateRange from  "../../../../../common/widget/NbDateRange.vue";
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue";


  export default{
    data(){
      return {
        energyPoint: new EnergyPoint(),
        innoTokenTypesList: []
      }
    },
    components: {
      NbRadio,
      NbPagerSelection,
      NbDateRange,
      NbSlidePanel,
      CreateSaveButton
    },
    computed: {},
    watch: {},
    methods: {
      save(){
        let that = this;
        this.energyPoint.httpSave(function (response) {
          NotificationBox.success({
            message: that.energyPoint.editMode ? '修改设备成功！' : '设备创建成功！'
          });
          that.$router.push("/by/ispace/energy/list");
        });
      }
    },
    mounted(){

    }
  }
</script>
