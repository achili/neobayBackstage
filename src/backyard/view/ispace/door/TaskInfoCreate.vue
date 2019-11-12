<template>
  <div class="animated fadeIn">
    <div class="row mb10">
      <div class="col-md-12 clearfix">
        <div class="pull-left f24">
          <i class="fa fa-info" aria-hidden="true"></i>
          <span>新建任务通知</span>
        </div>
      </div>
    </div>
    <div class="mail-box">
      <div class="mail-body">
        <div class="row">
          <div class="col-xs-11">
            <CreateSaveButton createText="创建任务通知" :entity="iSpaceTaskInfo" :callback="save"/>
          </div>
          <div class="col-xs-8">
            <div class="col-xs-10 m-t-md">
              <div class="form-group clear">
                <img class="thumb-lg pull-left m-r-md">
                <label class="control-label">图片/文件-上传</label>
                <div>
                  <div>
                    <span>
                      <NbTank :tank="iSpaceTaskInfo.image"/>
                      <i class="fa fa-exclamation-circle" aria-hidden="true"></i>图片宽高须为800px和1280px
                    </span>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">开始日期时间</label>
                <div>
                  <el-date-picker v-model="iSpaceTaskInfo.broadStartDateTime" type="datetime"
                                  placeholder="选择开始日期"></el-date-picker>
                </div>
              </div>
              <div class="form-group">
                <label class="control-label">结束日期时间</label>
                <div>
                  <el-date-picker v-model="iSpaceTaskInfo.broadEndDateTime" type="datetime"
                                  placeholder="选择结束日期时间"></el-date-picker>
                </div>
              </div>
              <div class="form-group">
                <div>
                  <label class="control-label">选择创建的门对象</label>
                </div>
                <!--<div v-for="item in iSpaceDoorPager.iSpaceDoors" :key="item.id" class="col-md-4">
                  <div class="col-xs-12">
                    <ISpaceDoorNbCheckbox :val="item.doorId" v-model="iSpaceTaskInfo.doorList"></ISpaceDoorNbCheckbox>
                    <label>{{item.doorName}}</label>
                  </div>
                </div>
                <div class="col-xs-12" v-show="false">{{iSpaceTaskInfo.doorList.toString()}}</div>-->

                <div class="control-label">
                  <div>
                    <!-- 这里的 $event 是将当前对象传入进去，具体详情请参照vue官方文档 -->
                    <input id="quan" type="checkbox" @click="checkAll($event)" style="cursor:pointer;"> 全选
                  </div>
                  <div v-for="item in iSpaceDoorPager.iSpaceDoors" :key="item.id" class="col-md-4"  style="margin: 5px;">
                    <!-- v-model 双向数据绑定命令 -->
                    <NbCheckbox :val="item.doorId" v-model="iSpaceTaskInfo.doorList"/>{{item.doorName}}
                  </div>
                  <div class="col-xs-12" v-show="false">{{iSpaceTaskInfo.doorList.toString()}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
<script>
  import NbEditor from "../../../../common/widget/NbEditor";
  import NbTank from '../../../../common/widget/NbTank';
  import {Notification} from 'element-ui';
  import CreateSaveButton from "../../../../backyard/view/widget/CreateSaveButton.vue";
  import ISpaceTaskInfo from "../../../../common/model/ispace/door/ISpaceTaskInfo";
  import ISpaceDoor from "../../../../common/model/ispace/door/ISpaceDoor";
  import Pager from "../../../../common/model/base/Pager";
  import ISpaceDoorNbCheckbox from "../door/widget/ISpaceDoorNbCheckbox.vue";
  import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'

  export default {
    data() {
      return {
        ISpaceDoor,
        iSpaceTaskInfo: new ISpaceTaskInfo(),
        iSpaceDoorPager: new Pager(ISpaceDoor)
      }
    },
    components: {
      NbEditor,
      CreateSaveButton,
      NbTank,
      ISpaceDoorNbCheckbox,
      NbCheckbox
    },
    computed: {},
    watch: {
      checkData: { // 监视双向绑定的数组变化
        handler(){
          if(this.iSpaceTaskInfo.doorList.length === this.iSpaceDoorPager.length){
            document.querySelector('#quan').checked = true;
          }else {
            document.querySelector('#quan').checked = false;
          }
        },
        deep: true
      }
    },
    methods: {
      checkAll($event){ // 点击全选事件
        if($event.target.checked){
          let that = this;
          this.iSpaceDoorPager.iSpaceDoors.forEach(item=>{
            // 数组里没有这一个value才push，防止重复push
            if(that.iSpaceTaskInfo.doorList.indexOf(item.doorId) === -1){
              that.iSpaceTaskInfo.doorList.push(item.doorId);
            }
          });
        }else { // 全不选选则清空绑定的数组
          this.iSpaceTaskInfo.doorList = [];
        }
      },
      save() {
        let that = this;
        this.iSpaceTaskInfo.httpSaveTaskInfo(function (response) {
          Notification.success({message: that.iSpaceTaskInfo.editMode ? '成功修改任务通知！' : '成功创建任务通知！'});
          console.log(that.iSpaceTaskInfo)
          /*that.$router.push("/by/task/info/detail/" + that.iSpaceTaskInfo.templateId);*/
          that.$router.push("/by/task/info/detail?templateId=" + that.iSpaceTaskInfo.templateId);
        });
      },
      search(){
        this.iSpaceTaskInfo.page = 0;
        this.refresh()
      },
      refresh() {
        this.iSpaceDoorPager.httpFastPage();
      }
    },
    mounted() {
      this.refresh();

      let that = this;
      /*this.iSpaceTaskInfo.templateId = this.$store.state.route.params.templateId;*/
      this.iSpaceTaskInfo.templateId = this.$store.state.route.query.templateId;
      if (this.iSpaceTaskInfo.templateId) {
        this.iSpaceTaskInfo.editMode = true;
        this.iSpaceTaskInfo.httpDetailTaskInfo(
          /*反填得时候只填门的ID，所以具体得数据需要处理如下*/
          function () {
            /*let resDoorList = JSON.parse(that.iSpaceTaskInfo.doorList);*/
            let resDoorList = that.iSpaceTaskInfo.doorList;
            console.log(resDoorList);
            for (let i in resDoorList) {
              that.iSpaceTaskInfo.doorEditList[i] = resDoorList[i].doorId;
            }
            that.iSpaceTaskInfo.doorList = that.iSpaceTaskInfo.doorEditList;
          }
        );
      }

    }
  }
</script>
