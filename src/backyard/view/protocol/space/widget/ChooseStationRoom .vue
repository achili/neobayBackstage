<template>
  <div>
    <NbSlidePanel type="info">
      <span slot="heading" class="f16">
        <i class="fa fa-cogs"></i>
          填写房屋信息
      </span>

      <div slot="body">

        <div class="form-group clearfix mt10" v-if="protocolSpace.type === Type.NURSERY">
          <label class="col-md-12 control-label">选择工位</label>

          <div class="col-md-12">
            <SpaceSeatMultiSelection ref="spaceSeatMultiSelection" :spaceSeats="spaceList"/>
          </div>
        </div>

        <div class="form-group clearfix mt10" v-else>
          <label class="col-md-2 control-label">选择房间</label>
          <div class="col-md-10">
            <SpaceRoomMultiSelection ref="spaceRoomMultiSelection" :spaceRooms="spaceList"
                                     :initFilter="{'type':'OFFICE'}"/>
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">房屋地址</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="protocolSpace.address">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">建筑面积(m<sup>2</sup>)</label>
          <div class="col-md-9">
            <input type="number" class="form-control" v-model="protocolSpace.area">
          </div>
        </div>

        <div class="row mt10">
          <label class="col-md-3 control-label mt5 compulsory">产权证编号</label>
          <div class="col-md-9">
            <input type="text" class="form-control" v-model="protocolSpace.propertyNo">
          </div>
        </div>

      </div>

    </NbSlidePanel>
  </div>
</template>


<script>
  import NbSlidePanel from '../../../../../common/widget/NbSlidePanel'
  import NbExpanding from '../../../../../common/widget/NbExpanding.vue'
  import NbBtnDropdown from '../../../../../common/widget/NbBtnDropdown.vue'
  import SpaceSeatMultiSelection from '../../../space/seat/Graph.vue'
  import SpaceRoomMultiSelection from '../../../space/room/MultiSelection.vue'
  import CreateSaveButton from '../../../widget/CreateSaveButton.vue'
  import ProtocolSpace from '../../../../../common/model/protocol/space/ProtocolSpace'
  import NotificationControlPanel from '../../../notification/widget/ControlPanel.vue'
  import Notification from '../../../../../common/model/notification/Notification'
  import { Notification as NotificationBox } from 'element-ui'
  import SpaceSeat from '../../../../../common/model/space/SpaceSeat'

  export default {
    data () {
      return {
        flipped: true,
        currentReason: null,
        Type: this.protocolSpace.Type,
        spaceList: [],
        isFirst: true
      }
    },
    props: {
      protocolSpace: {
        type: ProtocolSpace,
        required: true
      }
    },
    watch: {
      'spaceList' (newVal, oldVal) {
        this.protocolSpace.spaceIds = []
        let propertyNo = ''
        let address = ''
        let arr = []
        if (newVal.length > 0) {
          address = newVal[0].address
          newVal.forEach(space => {
            if (this.protocolSpace.type === this.protocolSpace.Type.NURSERY) {
              address += ',' + space.no
            } else {
              address += ',' + space.no + '室'
            }
            propertyNo += space.propertyNo + ','
            //填装ID
            this.protocolSpace.spaceIds.push(space.id)
          })
          propertyNo = propertyNo.substring(0, propertyNo.length - 1)

          arr = address.split(',')
          arr.splice(1, 1)
        }
        this.protocolSpace.propertyNo = propertyNo
        this.protocolSpace.address = arr.toString()

      },
      'protocolSpace.type' (newVal, oldVal) {
        if (this.isFirst && this.protocolSpace.editMode) {
          this.isFirst = false
          return
        }
        this.spaceList = []
        this.protocolSpace.spaceIds = []
        this.protocolSpace.propertyNo = ''
        this.protocolSpace.address = ''
      },
      'protocolSpace.spaceSeats' (newVal, oldVal) {
        this.spaceList = newVal
      },
      'protocolSpace.spaceRooms' (newVal, oldVal) {
        this.spaceList = newVal
      }
    },
    components: {
      NbSlidePanel,
      NbExpanding,
      NbBtnDropdown,
      SpaceSeatMultiSelection,
      SpaceRoomMultiSelection
    },
    methods: {},
    mounted () {}
  }


</script>
