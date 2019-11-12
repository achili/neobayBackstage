<template>
  <div class="space-visual-site-content animated fadeIn">
    <NewSpacePopup :newSpacePopup="newSpacePopup" v-on:SpacePopup="closeSpace" :newSpaceId="newSpaceId"></NewSpacePopup>
    <h1 class="visual-site-title">零号湾二号楼平面布置图</h1>
    <div class="project-management-content" :class="display === true ? 'display-play-add':'display-play-reduce'">
      <div class="project-management-left">
        <div class="project-management-search">
          <div class="management-search-content">
            <div class="search-content-ipt">
              <input type="text" class="form-control input-sm search-ipt" v-model="value"  @keyup.enter="search" placeholder="编号/名称/地址/描述">
            </div>
            <div class="input-group-btn">
              <button type="submit" class="btn btn-sm btn-primary search-content-btn" @click="search(value)">
                搜索
              </button>
            </div>
          </div>
        </div>
        <div class="project-management-left-content">
          <div class="project-management-content-left">
            <div class="item-project-content select-item" v-for="item in searchPager" :key="item.id"
                 draggable='true'  @dragend='dataDragEnd($event,item)' v-if="!item.canvasFloor" @dblclick.prevent.stop="edit(item.id)">
              <div class="drag1">
                <div class="item-project-no" v-if="!item.protocol">项目名称:无</div>
                <div class="item-project-phone" v-if="item.protocol">
                  <div class="item-project-title">项目名称:{{item.protocol.partyB}}</div>
                  <div class="item-project-name">负责人:{{item.protocol.project.leader}}</div>
                  <div class="item-project-name">联系电话:{{item.protocol.project.leaderPhone}}</div>
                </div>
                <div class="item-project-no" v-for="sta in spaceRoom.StatusMap" :key="sta.value" v-if="sta.value === item.status">
                  状态:{{sta.name}}
                </div>
                <div class="item-project-no">编号:{{item.no}}</div>
              </div>
              <div class="item-no-project-delete" @click.prevent.stop="item.confirmDel(refresh)" v-if="!item.protocol"></div>
              <div class="item-no-project-delete-info" @click.prevent.stop="item.confirmDel(refresh)" v-if="item.protocol"></div>
            </div>
          </div >
        </div>
        <div class="project-management-add">
          <div class="project-management-add-btn"  @click.prevent.stop="newSpace">新建空间</div>
        </div>
        <div class="project-management-btn-text" @click.stop.prevent="displayBlack">操作台</div>
      </div>
    </div>
    <div class="visual-site-content">
      <div class="visual-site">
        <div class="floor-content">
          <div class='people-content'>
            <div class="visual-site-content-floor">6F
              <div class="visual-site-type">
                <div class="visual-site-type-list" style="background-color:#1c84c6;">
                  <span>空闲</span>
                </div>
                <div class="visual-site-type-list" style="background-color:#23c6c8;">
                  <span>被占用</span>
                </div>
                <div class="visual-site-type-list" style="background-color:#ED5565;">
                  <span>禁用</span>
                </div>
                <div class="visual-site-type-list" style="background-color:#f8ac59;">
                  <span>即将到期</span>
                </div>
              </div>
            </div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
            <div style="text-align: center;"><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i></div>
            <div class="visual-site-content-floor">5F</div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
            <div style="text-align: center;"><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i></div>
            <div class="visual-site-content-floor">4F</div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
            <div style="text-align: center;"><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i></div>
            <div class="visual-site-content-floor">3F</div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
            <div style="text-align: center;"><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i></div>
            <div class="visual-site-content-floor">2F</div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
            <div style="text-align: center;"><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i><i class="fa fa-caret-down fa-4x"></i></div>
            <div class="visual-site-content-floor">1F</div>
            <div class="six-floor-content">
              <div class="six-floor-left">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
              <div class="six-floor-right">
                <div class="six-floor-left-top">

                </div>
                <div class="six-floor-left-bottom">

                </div>
              </div>
            </div>
          </div>
          <div class="drag-div">
            <VisualRoom :spaceRooms="canvasPager" :spaceRoom="item"
                        v-for="item in canvasPager" :key="item.id"
                        v-if="item.canvasFloor"
                        :refreshCanvas="refreshCanvas">
            </VisualRoom>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import draggable from 'vuedraggable';
  import NewSpacePopup from './widget/NewSpacePopup';
  import Pager from  "../../../../common/model/base/Pager";
  import SpaceRoom from  "../../../../common/model/space/SpaceRoom";
  import VisualRoom from "./visual/room/VisualRoom";
  import '../../../../common/model/space/Dragx';
  export default {
    name: "Visual",
    data(){
      let spaceRooms = new SpaceRoom();
      spaceRooms.spaceBuilding.id = 3;
      return{
        editing:false,
        pager: new Pager(SpaceRoom,200),
        display:false,
        newSpaceId:0,
        newSpacePopup:false,
        spaceRoom:spaceRooms,
        value:null,
        canvasPager:null,
        searchPager:null
      }
    },
    components:{
      draggable,
      NewSpacePopup,
      VisualRoom
    },
    methods: {
      //空间修改
      edit(i) {
        this.newSpacePopup = true;
        this.newSpaceId = i;
      },
      //打开新建空间弹窗
      newSpace(){
        this.newSpacePopup = true;
      },
      //关闭新建空间弹窗
      closeSpace(evt){
        this.newSpacePopup = evt;
      },
      dataDragEnd(event,item) {
        let that = this;
        item.canvasFloor = 1;
        item.spaceBuilding.id = 3;
        let strTopFixed = (document.documentElement.scrollTop / 397).toFixed(1);
        if(strTopFixed >= 0.1 && strTopFixed <= 0.4){
          item.canvasTop = 45;
        }else if(strTopFixed >= 0.5 && strTopFixed <= 0.8){
          item.canvasTop = 203;
        }else if(strTopFixed >= 1.1 && strTopFixed <= 1.4){
          item.canvasTop = 442;
        }else if(strTopFixed >= 1.5 && strTopFixed <= 1.8){
          item.canvasTop = 600;
        }else if(strTopFixed >= 2.1 && strTopFixed <= 2.4){
          item.canvasTop = 839;
        }else if(strTopFixed >= 2.5 && strTopFixed <= 2.8){
          item.canvasTop = 997;
        }else if(strTopFixed >= 3.1 && strTopFixed <= 3.4){
          item.canvasTop = 1236;
        }else if(strTopFixed >= 3.5 && strTopFixed <= 3.8){
          item.canvasTop = 1394;
        }else if(strTopFixed >= 4.1 && strTopFixed <= 4.4){
          item.canvasTop = 1633;
        }else if(strTopFixed >= 4.5 && strTopFixed <= 4.8){
          item.canvasTop = 1791;
        }else if(strTopFixed >= 5.1 && strTopFixed <= 5.4){
          item.canvasTop = 2030;
        }else if(strTopFixed >= 5.5 && strTopFixed <= 5.8){
          item.canvasTop = 2188;
        }
        item.canvasLeft = event.screenX;
        item.httpSave(function () {
          that.refreshCanvas();
        });
      },
      displayBlack(){
        this.display = !this.display;
      },
      //刷新空间列表
      refresh() {
        let that = this;
        let spaceRoomSearchPager = new SpaceRoom();
        spaceRoomSearchPager.httpGetVisualPage(this.pager ,function (pager) {
          that.searchPager = pager.spaceRooms;
        });
      },
      //刷新画板
      refreshCanvas() {
        let that = this;
        let spaceRoomCanvasPager = new SpaceRoom();
        spaceRoomCanvasPager.httpGetVisualPage(this.pager ,function (pager) {
          that.canvasPager = pager.spaceRooms;
        });
      },
      //搜索
      search(c){
        this.pager.setFilter("keyword", c);
        this.pager.page = 0;
        this.refresh();
      },
      filters(){
        return this.pager.FILTERS;
      }
    },
    mounted(){
      this.refresh();
      this.refreshCanvas();
    }
  }

</script>
<style lang="less" rel="stylesheet/less">
  .space-visual-site-content{
    width: 100%;
    .project-management-content{
      width: 260px;
      position: fixed;
      top: 66px;
      height: 100%;
      z-index: 999;
      background-color: #f3f3f4;
      transition: all .4s cubic-bezier(.4,0,.2,1);
      .project-management-left{
        width: 260px;
        height: 100%;
        border: 1px solid #000;
        border-right: none;
        .project-management-search{
          height: 50px;
          .management-search-content{
            padding: 10px 20px ;
            .search-content-ipt{
              width: 77%;
              display: inline-block;
              float: left;
              .search-ipt{

              }
            }
            .input-group-btn{
              width: 20%;
              .search-content-btn{
                display: inline-block;
                float: left;
              }
            }
          }
        }
        .project-management-left-content{
          width: 260px;
          height: 80%;
          overflow: auto;
          .project-management-content-left{
            padding: 5px 20px  10px 20px;
            overflow: auto;
            .item-project-content{
              width: 100%;
              border: 1px solid #000;
              padding: 18px 5px 0 5px;
              margin-top: 5px;
              .drag1{

                .item-project-no{
                  padding: 5px;
                }

                .item-project-phone{
                  .item-project-title{
                    padding: 5px 25px 5px 5px;
                  }
                 .item-project-name{
                   padding: 5px;
                 }
                }
              }
              .item-project-delete{
                width: 20px;
                height: 20px;
                position: relative;
                top: -112px;
                left: 180px;
                display: inline-block;
              }
              .item-no-project-delete{
                width: 20px;
                height: 20px;
                position: relative;
                bottom: 97px;
                display: inline-block;
                left: 183px;
              }
              .item-no-project-delete-info{
                width: 20px;
                height: 20px;
                position: relative;
                bottom: 172px;
                display: inline-block;
                left: 183px;
              }
              .item-no-project-delete:before, .item-no-project-delete:after {
                content: '';
                position: absolute;
                top: 50%;
                width: 20px;
                height: 1px;
                background-color: #006bae;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              }
              .item-no-project-delete-info:before, .item-no-project-delete-info:after {
                content: '';
                position: absolute;
                top: 50%;
                width: 20px;
                height: 1px;
                background-color: #006bae;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              }
              .item-no-project-delete:after {
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              }
              .item-no-project-delete-info:after {
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              }
              .item-project-delete:before, .item-project-delete:after {
                content: '';
                position: absolute;
                top: 50%;
                width: 20px;
                height: 1px;
                background-color: #888;
                -webkit-transform: rotate(45deg);
                transform: rotate(45deg);
              }

              .item-project-delete:after {
                -webkit-transform: rotate(-45deg);
                transform: rotate(-45deg);
              }
            }
          }
        }
        .project-management-add{
          width: 259px;
          padding: 15px 0;
          background-color: #fff;
          .project-management-add-btn{
            padding: 10px 0;
            font-size: 16px;
            width: 50%;
            margin: auto;
            text-align: center;
            background: #fff;
            border-radius: 5px;
            border: 1px solid #ccc;
            cursor: pointer;
          }
        }
        .project-management-btn-text{
          display: inline-block;
          position: absolute;
          width: 35px;
          cursor: pointer;
          height: 200px;
          background: #006bae;
          border-radius: 10px 0 0 10px;
          line-height: 66px;
          font-size: 18px;
          color: #fff;
          text-align: center;
          top: 0;
          left: -35px;
          bottom: 0;
          margin: auto;
          z-index: 999999;
        }
      }
    }
    .display-play-add{
      right: 0;
    }
    .display-play-reduce{
      right: -260px;
    }
    .visual-site-title{
      text-align: center;
    }
    .project-content {
      .select-item{
        background-color: #5bc0de;
        display: inline-block;
        text-align: center;
        border-radius: 3px;
        cursor: pointer;
        width: 120px;
        height: 120px;
        color: #fff;
      }
    }
    .visual-site-content{
      width: 100%;
      overflow-x: auto;
      margin: auto;
      .visual-site{
        width: 1430px;
        position: relative;
        left: 0;
        top: 0;
        margin: auto;
        height: 2400px;
        .floor-content{
          width: 1430px;
          position: absolute;
          bottom: 20px;
          height: 2370px;
          .people-content{
            background: #fff;
            .visual-site-content-floor{
              text-align: center;
              font-size: 28px;
              line-height: 45px;
              .visual-site-type{
                font-size: 14px;
                display: inline-block;
                position: absolute;
                width: 280px;
                right: 0;
                height: 45px;
                .visual-site-type-list{
                  width: 70px;
                  float: right;
                  display: inline-block;
                }
              }
            }
            .six-floor-content{
              height: 300px;
              .six-floor-left{
                height: 300px;
                float: left;
                width: 50%;
                border:2px solid #000 ;
                border-right: none;
                .six-floor-left-top{
                  width: 100%;
                  height: 140px;
                  border-bottom: 2px solid #000;
                  background-color: #f3f3f4;
                }
                .six-floor-left-bottom{
                  margin-top: 16px;
                  width: 92%;
                  height: 140px;
                  float: left;
                  border-right: 2px solid #000;
                  border-top: 2px solid #000;
                  background-color: #f3f3f4;
                }
              }
              .six-floor-right{
                height: 300px;
                width: 50%;
                float: right;
                border:2px solid #000 ;
                border-left:none ;
                .six-floor-left-top{
                  width: 100%;
                  height: 140px;
                  border-bottom: 2px solid #000;
                  background-color: #f3f3f4;
                }
                .six-floor-left-bottom{
                  margin-top: 16px;
                  width: 92%;
                  height: 140px;
                  float: right;
                  border-left: 2px solid #000;
                  border-top: 2px solid #000;
                  background-color: #f3f3f4;
                }
              }
            }
            .template-box-hidden{
              transition: all .3s cubic-bezier(.4,0,.2,1);
              display: inline-block;
              text-align: center;
              cursor: pointer;
              width: 60px;
              height: 120px;
              color: #fff;
              float: left;
              border-right: 1px solid #000;
              background:linear-gradient(-64deg,transparent 49.5%,
              #ccc 49.5%,
              #ccc 50.5%,
              transparent 50.5%);
            }
          }
          .drag-div{
            height: 2370px;
            width: 100%;
            cursor: pointer;
            display: inline-block;
            position: absolute;
            top: 0;
            left: 0;
            .select-project-item{
              display: inline-block;
              padding:0 10px;
              text-align: center;
              border-radius: 3px;
              border:solid 2px #000;
              position:relative;
              .drag-people-label{
                margin-bottom: 0;
              }
            }
          }
        }
      }

    }
  }
</style>
