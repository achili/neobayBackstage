<template>
  <div class="animated fadeIn maker-card-create">
    <div class="col-md-12" style="background-color: #FFFFFF;padding: 20px;overflow-y: scroll;height: 600px;">
      <div style="padding: 10px 30px;border: 2px solid #ff8d1d;">

        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">申请信息</span>
          </div>
          <div style="padding: 20px 50px;font-size: 16px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5" align="right">项目</div>
              <div class="col-md-10">
                <ProjectPagerSelection :activeProject="makerCard.project" :initFilter="{'userId':user.id}"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">项目名称</div>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="makerCard.projectName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">企业名称</div>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="makerCard.companyName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5" >
                <div class="col-md-3 mt5 " align="right" v-for="item in ['新办','补卡','添加']" >
                  <span class="f16 ">{{item}}</span>
                  <NbRadio  v-model="makerCard.type" name="type" :val="item" />
                </div>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5" >
                <div class="col-md-3 mt5" align="right">授权门禁</div>
                <div class="col-md-2 mt5" ><nobr>一号楼:</nobr></div>
                <div class="col-md-2 mt5"  v-for="item in ['南楼','北楼']">
                  <nobr>
                    <span class="f16 "> {{item}} </span>
                    <NbCheckbox  v-model="makerCard.entranceGuardOne" :val="item" />
                  </nobr>
                </div>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-8 mt5" >
                <div class="col-md-3 mt5" align="right"></div>
                <div class="col-md-2 mt5" ><nobr>二号楼:</nobr></div>
                <div class="col-md-2 mt5"  v-for="item in ['1F东西','2F东西','3F西']">
                  <nobr>
                    <span class="f16 "> {{item}} </span>
                    <NbCheckbox  v-model="makerCard.entranceGuardTwo" :val="item" />
                  </nobr>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">用户信息</span>
          </div>
          <div style="padding: 20px 50px;font-size: 16px;color: #666666;">
            <div class="row">
              <div class="col-md-2 mt5" align="right">联系人</div>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="makerCard.leaderName"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">电话</div>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="makerCard.leaderPhone"/>
              </div>
            </div>
            <div class="row mt10">
              <div class="col-md-2 mt5" align="right">邮箱</div>
              <div class="col-md-3">
                <input type="text" class="form-control" v-model="makerCard.leaderEmail"/>
              </div>
            </div>
           </div>
          </div>

        <div>
          <div style="font-size: 20px;color: #333333;border-bottom: 2px solid #cdcdcd;padding-bottom: 8px;">
            <span style="border-bottom: 2px solid #ff8d1d;padding-bottom: 10px;">申请人</span>
          </div>
          <div style="padding: 20px 50px;font-size: 16px;color: #666666;">

              <div class="row">
                <button class="btn btn-success" @click="makerCard.addMakerCardMember()">
                  <i class="fa fa-plus"></i> 增加申请人
                </button>
              </div>

              <div v-for="(makerCardMember, index) in makerCard.makerCardMembers" >
                <div class="row mt10">
                  <div class="col-md-2 mt5" align="right" >申请人{{index + 1}}</div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" v-model="makerCardMember.name"/>
                  </div>
                  <div class="col-md-2 mt5" align="right" >身份证</div>
                  <div class="col-md-3">
                    <input type="text" class="form-control" v-model="makerCardMember.idCard"/>
                  </div>
                  <i class="fa fa-trash f18 text-danger btn-action pull-right"
                     @click.stop.prevent="confirmDeleteMember(index)"></i>
                </div>
              </div>

            </div>
          </div>

        <div class="mt40 mb50 text-center">
          <div class="alert alert-danger" v-show="makerCard.errorMessage">
            {{makerCard.errorMessage}}
          </div>

          <SubmitButton :callback="save" :title="sportTitle" :loading="makerCard.loading"
                        submitIcon="" submitClass="sport-submit" :entity="makerCard"/>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import {Notification, MessageBox} from 'element-ui';
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import ProjectPagerSelection from "../../project/Selection.vue";
  import LoadingFrame from "../../widget/LoadingFrame";
  import CreateSaveButton from "../../widget/CreateSaveButton.vue"
  import SubmitButton from "../../widget/SubmitButton.vue";
  import NbCheckbox from "../../../../common/widget/NbCheckbox"
  import MakerCard from "../../../../common/model/maker/card/MakerCard";
  import MakerCardMember from "../../../../common/model/maker/card/MakerCardMember";
  import NbRadio from "../../../../common/widget/NbRadio"

  export default{
    data () {
      return {
        makerCard: new MakerCard(),
        user: this.$store.state.user,
        sportTitle: "提交"
      }
    },
    components: {
      NbSlidePanel,
      LoadingFrame,
      CreateSaveButton,
      SubmitButton,
      NbCheckbox,
      ProjectPagerSelection,
      NbRadio
    },
    computed: {},
    watch: {
      "makerCard.project.id"(newVal, oldVal){
        this.makerCard.projectName = this.makerCard.project.name;
        this.makerCard.companyName = this.makerCard.project.registeredCompanyName;
      }
    },
    methods: {
      save(){
        let that = this;
        this.makerCard.errorMessage = null;
        this.makerCard.httpSave(function (response) {
          if (parent) {
            if (parent.SubmitCallBack) {
              parent.SubmitCallBack();
            }
          }
          Notification.success({
            message: that.makerCard.editMode ? '修改一卡通申请成功！' : '创建一卡通申请成功！'
          });
          that.$router.push({ path: 'detail', query: { id: that.makerCard.id } });
          that.makerCard.clearLocalStorage();

        });
      },
      fetchDetail(){
        //this.makerCard.httpDetail();
        let that = this;
        this.makerCard.httpDetail(function (response) {
          let EntranceGuard = [];
          for (let i = 0; i < that.makerCard.entranceGuard.length; i++) {
            if (EntranceGuard.indexOf(that.makerCard.entranceGuard[i]) === -1) EntranceGuard.push(that.makerCard.entranceGuard[i]);
          }
          that.makerCard.entranceGuard = EntranceGuard.concat();
        })
      },

      //确认删除团队成员
      confirmDeleteMember(index){
        let that = this;
        MessageBox.confirm('确定删除此申请人吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.makerCard.subMakerCardMember(index);
        }, function () {
        });
      }
    },
    mounted(){
      let that = this;

      this.makerCard.id = this.$store.state.route.query.id;
      if (this.makerCard.id) {
        this.makerCard.editMode = true;
        this.fetchDetail();
        this.makerCard.httpDetail();
      }else {
        this.makerCard.leaderName = this.user.nickname;
        this.makerCard.leaderPhone = this.user.phone;
        this.makerCard.leaderEmail = this.user.email;

        if (this.makerCard.makerCardMembers.length === 0 && this.makerCard.makerCardMembers) {
          this.makerCard.makerCardMembers.push(new MakerCardMember());
        }
      }

    }
  }

</script>

<style lang="less" rel="stylesheet/less">
  .maker-card-create {
    .form-control-card {
      width: 200px;
      border: 1px solid #a7b1c2;
      height: 35px;
      padding: 0 10px;
    }
    .sport-submit {
      background: linear-gradient(135deg, #ff8a00 0%, #fda100 100%);
      border-radius: 6px;
      padding: 10px 30px;
      font-size: 16px;
      border: #f8ac59;
      color: #FFFFFF;

    }

  }
</style>
