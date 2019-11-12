<template>
  <div class="space-visual-room " :class="[spaceRoom.status === 'FREE' ? 'free-color':'',spaceRoom.status === 'OCCUPIED' ? 'occupied-color':'',spaceRoom.status === 'DISABLE' ? 'disable-color':'',spaceRoom.status === 'SOON' ? 'soon-color':'']"
       v-dragx="spaceRoom" @bindUpdate="bindUpdate"
       :style="{left:spaceRoom.canvasLeft+'px',top:spaceRoom.canvasTop+'px',width:spaceRoom.canvasWidth+'px',height:spaceRoom.canvasHeight+'px'}">
    <div class="drag1"></div>
    <div class="drag-btn drag1">
      <div class="space-drag1-item" v-if="spaceRoom.protocol">{{spaceRoom.protocol.partyB}}</div>
      <div  v-if="spaceRoom.protocol" class="space-drag1-item">
        <div>{{new Date(spaceRoom.protocol.startTime).format("yy-MM-dd")}}至{{new Date(spaceRoom.protocol.endTime).format("yy-MM-dd")}}</div>
      </div>
      <div class="space-drag1-item">
        <div style="display: inline-block">{{spaceRoom.no}}</div>
      </div>
    </div>
    <div class="space-drag1-delete" @click.prevent.stop="spaceRoom.confirmDel(refreshCanvas)"></div>
  </div>
</template>

<script>
  import '../../../../../../common/model/space/Dragx';
  import SpaceRoom from  "../../../../../../common/model/space/SpaceRoom";
  export default {
    data(){
      return{
        isDom:false,
        typeList:[
          {
            name: "空闲",
            value: "FREE",
            type: "free-color",
            color:"#1c84c6"
          },
           {
            name: "被占用",
            value: "OCCUPIED",
            type: "occupied-color",
            color:"#23c6c8"
          },
           {
            name: "禁用",
            value: "DISABLE",
            type: "disable-color",
            color:"#ED5565"
          },
         {
            name: "即将到期",
            value: "SOON",
            type: "soon-color",
            color:"#f8ac59"
          }
        ]
      }
    },
    props: {
      spaceRoom: {
        type: SpaceRoom,
        required: true
      },
      refreshCanvas:{
        type: Function
      },
      spaceRooms:{

      }
    },
    components:{

    },
    methods: {
      bindUpdate(event){
        let data = event.detail;
        this.spaceRoom.canvasTop = data.top;
        this.spaceRoom.canvasLeft = data.left;
        this.spaceRoom.canvasWidth = data.width;
        this.spaceRoom.canvasHeight = data.height;
        data.pager = this.spaceRooms;
      }
    },
    mounted(){
    }
  }
</script>
<style lang="less" rel="stylesheet/less">
  .free-color{
    background-color: #1c84c6;
  }
  .occupied-color{
    background-color: #23c6c8;
  }
  .disable-color{
    background-color: #ED5565;
  }
  .soon-color{
    background-color: #f8ac59;
  }
  .space-visual-room{
    overflow: hidden;
    display: inline-block;
    padding:0 10px;
    text-align: center;
    border-radius: 3px;
    border:solid 2px #0074D9;
    position:absolute;
    user-select:none;
    color: #fff;
    .drag1{
      width: 100%;
      height: 100%;
      position: relative;
      z-index: 999;
    }
    .drag-btn{
      position: relative;
      bottom: 140px;
      z-index: 1;
      .space-drag1-item{
        clear: both;
        margin-top:5px;
        display: block;
        cursor:default;
      }
    }
    .space-drag1-delete{
      width: 20px;
      height: 20px;
      position: absolute;
      display: inline-block;
      right: 0;
      top: 0;
    }
    .space-drag1-delete:before, .space-drag1-delete:after {
      content: '';
      position: absolute;
      top: 50%;
      left: 0;
      width: 20px;
      height: 1px;
      background-color: #888;
      transform: rotate(45deg);
    }
    .space-drag1-delete:after {
      transform: rotate(-45deg);
    }
  }
</style>
