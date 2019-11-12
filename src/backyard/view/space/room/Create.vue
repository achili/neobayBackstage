<template>
	<div class="animated fadeIn">
    <LoadingFrame :loading="spaceRoom.detailLoading">
      <div class="row">
        <div class="col-md-12">
          <h2>
            <i class="fa fa-fire text-success"></i>
            <span v-show="!spaceRoom.editMode">创建房间</span>
            <span v-show="spaceRoom.editMode">编辑房间</span>
          </h2>
          <NbSlidePanel>
            <span slot="heading" class="text-default">
              <i class="fa fa-dot-circle-o"></i>
              基本信息
            </span>
            <div class="row" slot="body">

              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label mt5 compulsory">所属大楼</label>
                  <div class="col-md-10">
                    <SpaceBuildingSelection :activeSpaceBuilding="spaceRoom.spaceBuilding"/>
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

              <div class="col-md-12">
                <div class="row mt10">
                  <label class="col-md-2 control-label">门列表</label>
                  <div class="col-md-10">
                    <div class="row" v-if="spaceRoom.doors && spaceRoom.doors.length > 0">
                      <div class="col-md-8">
                        <span>门名称</span>
                      </div>
                      <div class="col-md-4" >操作</div>
                    </div>
                    <div v-for="door in spaceRoom.doors" :key="door.doorId">
                      <div class="row">
                        <div class="col-md-8">
                          <span class="text-danger">{{door.doorName}}</span>
                        </div>
                        <div class="col-md-4" >
                          <a title="删除" @click.stop.prevent="goDel(door)">
                            <i class="fa fa-trash-o fa-lg text-danger"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div v-if="!spaceRoom.doors || spaceRoom.doors.length === 0">暂未绑定任何门禁</div>

                    <DoorSelection class="mt5" :activeISpaceDoor="choiceISpaceDoor"/>

                    <button class="f12 pull-right btn btn-info" @click="addChoiceISpaceDoor">
                      <i class="fa fa-sort-asc mr5 mt5"></i>添加至门列表
                    </button>

                  </div>
                </div>
              </div>



              <div class="col-md-12 mv10 ">
                <div class="alert alert-danger" v-show="spaceRoom.errorMessage">
                  {{spaceRoom.errorMessage}}
                </div>
              </div>

            </div>
          </NbSlidePanel>
        </div>

        <div class="col-md-12 text-right mt10">
          <CreateSaveButton :entity="spaceRoom" :callback="save" />
        </div>
      </div>
    </LoadingFrame>

  </div>
</template>

<script>
	import NumberInput from '../../../../common/widget/NbNumberInput'
	import {Notification, MessageBox} from 'element-ui';

	import SpaceRoom from  "../../../../common/model/space/SpaceRoom"
	import NbSlidePanel from '../../../../common/widget/NbSlidePanel.vue'
	import SpaceBuildingSelection from '../building/Selection'
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import LoadingFrame from "../../widget/LoadingFrame";
  import DoorSelection from "./widget/DoorSelection.vue";
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";

	export default{
		data(){
			return {
				spaceRoom: new SpaceRoom(),
        choiceISpaceDoor: new ISpaceDoor()
			}
		},
		components: {
			NumberInput,
			NbSlidePanel,
			SpaceBuildingSelection,
      CreateSaveButton,
      LoadingFrame,
      DoorSelection
		},
		computed: {
			address(){
				if (this.spaceRoom.spaceBuilding.address) {
					return this.spaceRoom.spaceBuilding.address + this.spaceRoom.no + "室";
				} else {
					return null;
				}
			}
		},
		watch: {
			"spaceRoom.spaceBuilding.propertyNo"(newVal){
        this.spaceRoom.propertyNo = newVal;
      }
		},
		methods: {
			save(){
				let that = this;
				this.spaceRoom.httpSave(function () {
					Notification.success({
						message: that.spaceRoom.editMode ? '修改房间成功！' : '创建房间成功！'
					});
					that.$router.push("/by/space/room/detail/" + that.spaceRoom.id);
				});
			},
      goDel(iSpaceDoor) {
        this.spaceRoom.doors.splice(this.spaceRoom.doors.indexOf(iSpaceDoor), 1);
      },
      addChoiceISpaceDoor() {
        if(!this.spaceRoom.doors){
          this.spaceRoom.doors = [];
        }
        for(let i = 0; i < this.spaceRoom.doors.length; i++) {
          if(this.spaceRoom.doors[i].doorId === this.choiceISpaceDoor.doorId) {
            Notification.error({
              message:  '不能重复添加门！'
            });
            return
          }
        }
        let tempISpaceDoor = new ISpaceDoor();
        tempISpaceDoor.render(this.choiceISpaceDoor);
        this.spaceRoom.doors.push(tempISpaceDoor);
        this.choiceISpaceDoor.render(new ISpaceDoor());
      }
		},
		mounted(){
      let that = this;
			this.spaceRoom.id = this.$store.state.route.params.id;
			if (this.spaceRoom.id) {
        /*if(this.spaceRoom.doors.length > 0 ){

        }*/
        this.spaceRoom.httpDetail(function () {
          /*Notification.success({
            message: that.spaceRoom.editMode ? '修改房间成功！' : '创建房间成功！'
          });
          that.$router.push("/by/space/room/detail/" + that.spaceRoom.id);*/
        });
				/*this.spaceRoom.editMode = true;*/
			}
		}
	}

</script>
