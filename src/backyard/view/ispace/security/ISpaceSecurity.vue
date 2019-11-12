<template>
  <div class="by-ispace-security animated fadeIn">
    <div class="row">
      <div class="col-xs-12">
        <div class="row mb10">
          <div class="col-md-12 clearfix">
            <div class="pull-left f24">
              <i class="fa fa-video-camera" aria-hidden="true"></i>
              <span>智能安防</span>
            </div>
          </div>
        </div>
        <div class="mail-box">
          <div class="mail-body">
            <div class="row">
              <div class="col-md-3 all-area">
                <div class="up-area">
                  <div class="top-area">低层区域</div>
                  <div class="body-area">
                    <a href="http://192.168.100.101/doc/page/login.asp?_1546564830369&page=preview" title="有关101的摄像头">
                      <div class="btn btn-action button-area">
                        点击查看101<i class="fa fa-video-camera" aria-hidden="true"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="down-area">
                  <div>北侧大门</div>
                  <div>南侧大门</div>
                  <div>一层东测过道1</div>
                  <div>一层会议室</div>
                  <div>一层前大厅</div>
                  <div>一层后大厅</div>
                  <div>一层办公室大门</div>
                  <div>一层茶水间</div>
                  <div>一层办公室</div>
                  <div>二层东测过道</div>
                  <div>二层电梯层</div>
                  <div>二层西侧消防通道</div>
                  <div>三层东测过道1</div>
                  <div>三层东测过道2</div>
                  <div>三层西侧过道</div>
                  <div>四层东测过道1</div>
                </div>
              </div>
              <div class="col-md-1"></div>
              <div class="col-md-3 all-area">
                <div class="up-area">
                  <div class="top-area">高层区域</div>
                  <div class="body-area">
                    <a href="http://192.168.100.102/doc/page/login.asp?_1546564831242&page=preview" title="有关102的摄像头">
                      <div class="btn btn-action button-area">
                        点击查看102<i class="fa fa-video-camera" aria-hidden="true"></i>
                      </div>
                    </a>
                  </div>
                </div>
                <div class="down-area">
                  <div>四层东测过道2</div>
                  <div>四层西侧过道1</div>
                  <div>四层西侧过道2</div>
                  <div>五层东测过道1</div>
                  <div>五层东测过道2</div>
                  <div>五层西侧过道</div>
                  <div>六层东测过道1</div>
                  <div>六层东测过道2</div>
                  <div>六层西侧过道1</div>
                  <div>六层西侧过道2</div>
                  <div>电梯轿厢</div>
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
  import {Notification} from 'element-ui';

  export default {
    data() {
      return {
      }
    },
    computed: {},
    watch: {},
    methods: {
      search(){
        this.refresh()
      },
      refresh() {}
    },
    components: {},
    mounted() {
      this.refresh();
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .by-ispace-security {
    .mail-body {
      .all-area{
        height: 700px;
        background-color: #EBF2F1;
        border-left: #d0e5f2 2px solid;
        border-right: #d0e5f2 2px solid;
        border-radius:30px;
        line-height: 30px;
        font-family: "微软雅黑", Microsoft YaHei, "Helvetica Neue", Helvetica, Arial, sans-serif, "open sans";
        .up-area{
          height: 150px;
          //border: #d0e5f2 2px solid;
          text-align: center;
          padding: 5px;
          margin: 5px;
          .top-area{
            font-size: xx-large;
            padding: 10px;
            margin: 5px;
          }
          .body-area{
            padding: 10px;
            margin: 5px;
            .button-area{
              font-size: larger;
              background-color: #AFF276;
              width: 130px;
              height: 35px;
            }
          }
        }
        .down-area{
          height: 500px;
          border-top: #d0e5f2 2px solid;
          font-size: large;
          text-align: center;
          padding: 5px;
          margin: 5px;
        }
      }
    }
  }
</style>

