<template>
	<div class="animated fadeIn">

		<div class="row">
			<div class="col-md-12">
				<h2>
					<i class="fa fa-fire text-success"></i>
					<span v-show="!keeperBusinessType.editMode">创建服务类型</span>
					<span v-show="keeperBusinessType.editMode">编辑服务类型</span>
				</h2>
			</div>
		</div>

		<div class="row">

			<div class="col-md-12">
        <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						基本信息
					</span>
          <div slot="body">

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">园区地点</label>
              <div class="col-md-10">
                <SpaceRegionalSelection :spaceRegional="keeperBusinessType.spaceRegional" :editMode="keeperBusinessType.editMode"></SpaceRegionalSelection>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">服务名称</label>
              <div class="col-md-10">
                <input type="text" class="form-control" v-model="keeperBusinessType.name">
              </div>
            </div>

            <div class="form-group mt10">
              <img class="thumb-lg pull-left m-r-md">
              <label class="control-label compulsory">图片</label>

              <div>
                <NbTank :tank="keeperBusinessType.poster"/>
              </div>
            </div>

            <div class="row mt10">
              <label class="col-md-2 control-label mt5 compulsory">备注</label>
              <div class="col-md-10">
                <textarea class="form-control" rows="6" v-model="keeperBusinessType.description"
                          placeholder="此处填写描述信息……">
                </textarea>
              </div>
            </div>

            <div class="col-md-12">
              <div class="row mt10">
                <label class="col-md-2 control-label mt5 compulsory">属于哪种服务类型</label>
                <div class="col-md-10">
                  <select class="form-control" v-model="keeperBusinessType.type">
                    <option v-for="Type in keeperBusinessType.getTypeList()" :value="Type.value">
                      {{Type.name}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </NbSlidePanel>

        <NbSlidePanel>
					<span slot="heading" class="text-success f16">
						<i class="fa fa-leaf"></i>
						服务详情页
					</span>
          <div slot="body">
            <!--再加一个清空按钮和搜索按钮-->
            <div class="f15 bold pb10">*添加服务流程(为了前台美观，最好选五个以下，如果多于五个则最好选择偶数个服务流程)</div>
            <div class="row mt5 mb10">
              <div class="col-md-4 col-sm-6">
                <div class="input-group">
                  <input type="text" class="form-control input-sm" placeholder="搜索"
                         v-model="search">
                  <div class="input-group-btn">
                    <button class="btn btn-sm btn-primary">
                      搜索
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-md-8 col-sm-6">
                <button class="btn btn-sm btn-primary" @click.stop.prevent="refresh">
                  清空服务流程
                </button>
              </div>
            </div>

            <!--添加服务流程-->
            <div class="mb20">
              <ProcessCheckbox :keeperBusinessType="keeperBusinessType" :search="search"/>
            </div>
            <div>
              <ProcessItem :keeperBusinessType="keeperBusinessType"/>
            </div>

            <!--添加注意事项-->
            <NbSlidePanel class="mt30">
              <span slot="heading" class="text-success f16">
                <i class="fa fa-credit-card"></i>
                服务注意事项
              </span>
              <button class="btn btn-success pull-right" @click="keeperBusinessType.addTableCell()">
                <i class="fa fa-plus"></i>
                添加注意事项
              </button>
              <div slot="body">
                <div class="pt20" v-for="(tableCell, index) in keeperBusinessType.tableCells">

                  <div class="f15 bold pb20">
                    <span>第{{index + 1}}个注意事项</span>
                    <i class="fa fa-trash f18 text-danger btn-action pull-right"
                       @click.stop.prevent="confirmDeleteTable(index)"></i>
                  </div>


                  <div class="form-group">

                    <div class="row">

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">标题</div>
                          <div class="col-md-10">
                            <input type="text" class="form-control" v-model="tableCell.title"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">详情</div>
                          <div class="col-md-10">
                            <input type="text" class="form-control" v-model="tableCell.content"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">详情的英文翻译</div>
                          <div class="col-md-10">
                            <input type="text" class="form-control" v-model="tableCell.translate"/>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </NbSlidePanel>

            <!--添加所需材料-->
            <NbSlidePanel class="mt30">
              <span slot="heading" class="text-success f16">
                <i class="fa fa-credit-card"></i>
                所需材料
              </span>
              <button class="btn btn-success pull-right" @click="keeperBusinessType.addMaterialCell()">
                <i class="fa fa-plus"></i>
                添加材料
              </button>
              <div slot="body">
                <div v-for="(materialCell, index) in keeperBusinessType.materialCells">

                  <div class="f15 bold pb20">
                    <span>第{{index + 1}}件材料</span>
                    <i class="fa fa-trash f18 text-danger btn-action pull-right"
                       @click.stop.prevent="confirmDeleteMaterial(index)"></i>
                  </div>


                  <div class="form-group">

                    <div class="row">

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">标题</div>
                          <div class="col-md-10">
                            <input type="text" class="form-control" v-model="materialCell.title"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">标题的英文翻译</div>
                          <div class="col-md-10">
                            <input type="text" class="form-control" v-model="materialCell.translate"/>
                          </div>
                        </div>
                      </div>

                      <div class="col-md-12 mt5">
                        <div class="row">
                          <div class="col-md-2 mt5 compulsory">详情</div>
                          <div class="col-md-10">
                            <textarea rows="10" class="form-control" v-model="materialCell.content"></textarea>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            </NbSlidePanel>

            <!--添加登记审核-->
            <!--<NbSlidePanel class="mt30">-->
              <!--<span slot="heading" class="text-success f16">-->
                <!--<i class="fa fa-credit-card"></i>-->
                <!--登记审核-->
              <!--</span>-->
              <!--<button class="btn btn-success pull-right" @click="keeperBusinessType.addExamineCell()">-->
                <!--<i class="fa fa-plus"></i>-->
                <!--添加登记审核-->
              <!--</button>-->
              <!--<div slot="body">-->
                <!--<div v-for="(examineCell, index) in keeperBusinessType.examineCells">-->

                  <!--<div class="f15 bold pb20">-->
                    <!--<span>第{{index + 1}}个登记审核</span>-->
                    <!--<i class="fa fa-trash f18 text-danger btn-action pull-right"-->
                       <!--@click.stop.prevent="confirmDeleteExamine(index)"></i>-->
                  <!--</div>-->

                  <!--<div class="form-group">-->
                    <!--<div class="row">-->
                      <!--<div class="col-md-12 mt5">-->
                        <!--<div class="row">-->
                          <!--<div class="col-md-2 mt5 compulsory">标题</div>-->
                          <!--<div class="col-md-10">-->
                            <!--<input type="text" class="form-control" v-model="examineCell.title"/>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</div>-->
                    <!--</div>-->
                  <!--</div>-->

                <!--</div>-->
              <!--</div>-->
            <!--</NbSlidePanel>-->

            <!--添加提供服务-->
            <!--<NbSlidePanel class="mt30">-->
              <!--<span slot="heading" class="text-success f16">-->
                <!--<i class="fa fa-credit-card"></i>-->
                <!--提供服务-->
              <!--</span>-->
              <!--<button class="btn btn-success pull-right" @click="keeperBusinessType.addServiceCell()">-->
                <!--<i class="fa fa-plus"></i>-->
                <!--添加提供服务-->
              <!--</button>-->
              <!--<div slot="body">-->
                <!--<div v-for="(serviceCell, index) in keeperBusinessType.serviceCells">-->

                  <!--<div class="f15 bold pb20">-->
                    <!--<span>第{{index + 1}}个服务</span>-->
                    <!--<i class="fa fa-trash f18 text-danger btn-action pull-right"-->
                       <!--@click.stop.prevent="confirmDeleteService(index)"></i>-->
                  <!--</div>-->


                  <!--<div class="form-group">-->

                    <!--<div class="row">-->

                      <!--<div class="col-md-12 mt5">-->
                        <!--<div class="row">-->
                          <!--<div class="col-md-2 mt5 compulsory">标题</div>-->
                          <!--<div class="col-md-10">-->
                            <!--<input type="text" class="form-control" v-model="serviceCell.title"/>-->
                          <!--</div>-->
                        <!--</div>-->
                      <!--</div>-->

                    <!--</div>-->
                  <!--</div>-->

                <!--</div>-->
              <!--</div>-->
            <!--</NbSlidePanel>-->

          </div>
        </NbSlidePanel>

        <div class="row">
          <div class="col-md-12 m-t-md">
            <div class="alert alert-danger" v-show="keeperBusinessType.errorMessage">
              {{keeperBusinessType.errorMessage}}
            </div>
            <div>
              <CreateSaveButton :entity="keeperBusinessType" :callback="save" />
            </div>
          </div>
        </div>

			</div>

		</div>

	</div>
</template>

<script>
	import {MessageBox, Notification} from 'element-ui'
  import KeeperBusinessType from  "../../../../../common/model/keeper/business/KeeperBusinessType"
  import LoadingFrame from "../../../widget/LoadingFrame";
  import CreateSaveButton from "../../../widget/CreateSaveButton.vue"
  import NbSlidePanel from "../../../../../common/widget/NbSlidePanel.vue";
  import NbTank from '../../../../../common/widget/NbTank';
  import TypeProcess from '../../../../../common/model/keeper/business/TypeProcess'
  import TableCell from '../../../../../common/model/keeper/business/TableCell';
  import TableAdd from '../../../../../common/model/keeper/business/TableAdd';
  import ProcessCheckbox from '../widget/ProcessCheckbox';
  import ProcessItem from '../widget/ProcessItem';
  import NbCheckbox from "../../../../../common/widget/NbCheckbox";
  import SpaceRegionalSelection from '../../../../../backyard/view/space/regional/Selection'

  export default{
    data () {
      return {
        typeProcess: new TypeProcess(),
        tableCell: new TableCell(),
        tableAdd: new TableAdd(),
				keeperBusinessType: new KeeperBusinessType(),
        search: ""
      }
    },
    components: {
      CreateSaveButton,
      LoadingFrame,
      NbSlidePanel,
      NbTank,
      ProcessCheckbox,
      ProcessItem,
      NbCheckbox,
      SpaceRegionalSelection
    },
    computed: {},
    watch: {
      "search"(newVal, oldVal) {

      }
    },
    methods: {
			save(){
				let that = this;
				this.keeperBusinessType.httpSave(function (response) {
					Notification.success({
						message: that.keeperBusinessType.editMode ? '修改服务类型成功！' : '创建服务类型成功！'
					});
					that.$router.push("/by/keeper/business/type/list/");
				});
			},
			fetchDetail(){
        this.keeperBusinessType.httpDetail();
			},
      refresh() {
        let that = this;
        that.keeperBusinessType.processTypes = [];
      },
      confirmDeleteExamine(index) {
        let that = this;
        MessageBox.confirm('确认删除该登记审核吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.keeperBusinessType.subExamineCell(index)
        }, function() {
        })
      },
      confirmDeleteService(index) {
        let that = this;
        MessageBox.confirm('确定删除该服务吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.keeperBusinessType.subServiceCell(index)
        }, function() {
        })
      },
      confirmDeleteTable(index){
        let that = this;
        MessageBox.confirm('确定删除该注意事项吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.keeperBusinessType.subTableCell(index);
        }, function () {
        });
      },
      confirmDeleteMaterial(index) {
        let that = this;
        MessageBox.confirm('确定删除该材料吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          that.keeperBusinessType.subMaterialCell(index);
        }, function () {

        });
      }
    },
    mounted(){
			let that = this;
			this.keeperBusinessType.id = this.$store.state.route.params.id;
			if (this.keeperBusinessType.id) {
				this.keeperBusinessType.editMode = true;
				this.fetchDetail();
			}
    }
  }


</script>
