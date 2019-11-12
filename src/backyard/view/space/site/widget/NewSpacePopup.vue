<template>
    <div class="new-space-popup" @click.stop="closePopup" v-if="newSpacePopup">
      <div class="new-space-popup-content" @click.stop.prevent>
        <LoadingFrame :loading="spaceRoom.detailLoading">
          <div class="row">
            <div class="col-md-12">
            <span slot="heading" class="text-default">
              <i class="fa fa-dot-circle-o"></i>
              基本信息
            </span>
                <div class="row mt20" slot="body">
                  <div class="col-md-12">
                    <div class="row mt10">
                      <label class="col-md-2 control-label mt5 compulsory">所属大楼</label>
                      <div class="col-md-10">
                        <input type="text" disabled class="form-control" value="零号湾2号楼">
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5 compulsory">房间名称</label>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="spaceRoom.name">
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5 compulsory">房间类型</label>
                      <div class="col-md-8">
                        <select class="form-control" v-model="spaceRoom.type">
                          <option value="">
                            请选择房间类型
                          </option>
                          <option v-for="Type in spaceRoom.getTypeList()" :value="Type.value">
                            {{Type.name}}
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5 compulsory">房间编号</label>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="spaceRoom.no">
                      </div>
                    </div>
                  </div>


                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5 compulsory">房间面积</label>
                      <div class="col-md-8">
                        <input type="number" class="form-control" v-model="spaceRoom.area">
                      </div>
                    </div>
                  </div>

                  <div class="col-md-6">
                    <div class="row mt10">
                      <label class="col-md-4 control-label mt5 compulsory">房产证编号</label>
                      <div class="col-md-8">
                        <input type="text" class="form-control" v-model="spaceRoom.propertyNo">
                      </div>
                    </div>
                  </div>


                  <div class="col-md-12">
                    <div class="row mt10">
                      <label class="col-md-2 control-label mt5 compulsory">地址</label>
                      <div class="col-md-10">
                        <input type="text" disabled class="form-control" :value="address">
                      </div>
                    </div>
                  </div>


                  <div class="col-md-12">
                    <div class="row mt10">
                      <label class="col-md-2 control-label mt5 compulsory">描述</label>
                      <div class="col-md-10">
                    <textarea class="form-control" rows="4" v-model="spaceRoom.description"
                              placeholder="此处填写房间描述……"></textarea>
                      </div>
                    </div>
                  </div>

                  <div class="col-md-12 mv10 ">
                    <div class="alert alert-danger" v-show="spaceRoom.errorMessage">
                      {{spaceRoom.errorMessage}}
                    </div>
                  </div>

                </div>
            </div>

            <div class="col-md-12 text-right">
              <CreateSaveButton :entity="spaceRoom" :callback="save" />
            </div>
          </div>
        </LoadingFrame>
      </div>
    </div>
</template>

<script>
  import NumberInput from '../../../../../common/widget/NbNumberInput';
  import {Notification, MessageBox} from 'element-ui';
  import SpaceRoom from  "../../../../../common/model/space/SpaceRoom";
  import NbSlidePanel from '../../../../../common/widget/NbSlidePanel.vue';
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue";
  import LoadingFrame from "../../../widget/LoadingFrame";
    export default {
      name: "NewSpacePopup",
      data(){
        let spaceRoom = new SpaceRoom();
        spaceRoom.spaceBuilding.id = 3;
        return{
          spaceRoom: spaceRoom,
          closeSpacePopup:false
        }
      },
      components:{
        NumberInput,
        NbSlidePanel,
        CreateSaveButton,
        LoadingFrame
      },
      props:{
        newSpacePopup:{

        },
        newSpaceId:{

        }
      },
      watch: {
        "spaceRoom.spaceBuilding.propertyNo"(newVal, oldVal){
          this.spaceRoom.propertyNo = newVal;
        },
        "newSpaceId"(newVal){
          this.spaceRoom.id = newVal;
          this.spaceRoom.editMode = true;
          this.fetchDetail();
        }
      },
      computed: {
        address(){
          if (this.spaceRoom.spaceBuilding) {
            return '零号湾2号楼' + this.spaceRoom.no + "室";
          } else {
            return null;
          }
        }
      },
      methods:{
        closePopup(){
          this.$emit('SpacePopup', false);
        },
        save(){
          let that = this;
          this.spaceRoom.httpSave(function (response) {
            Notification.success({
              message: that.spaceRoom.editMode ? '修改房间成功！' : '创建房间成功！'
            });
            that.closePopup();
          });
        },
        fetchDetail(){
          let that = this;
          that.spaceRoom.httpDetail();
        }
      },
      mounted(){}
    }
</script>

<style lang="less" rel="stylesheet/less">
  .new-space-popup{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9999;
    .new-space-popup-content{
      width: 800px;
      height: 530px;
      margin:225px auto;
      background: #fff;
      padding: 20px;
      border: 1px solid #888;
    }
  }
</style>
