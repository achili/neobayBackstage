<template>

	<div class="by-message-letter-list animated fadeIn">

		<div class="row">
			<div class="col-md-3">

				<NavigationMenus/>
			</div>
			<div class="col-md-9">
				<div class="mail-box-header">

					<div class="pull-right mail-search">
						<div class="input-group">
							<input type="text" class="form-control input-sm" name="search" placeholder="搜索邮件"
							       v-model="pager.getFilter('keyword').value" @keyup.enter="search">
							<div class="input-group-btn">
								<button type="submit" class="btn btn-sm btn-primary" @click="search">
									搜索
								</button>
							</div>
						</div>
					</div>
					<h2>
						{{title}}
					</h2>
					<div class="mail-tools tooltip-demo m-t-md">

					<span class="mr10">
						<NbCheckbox v-model="allCheck"/>
						<span class="ml5">
							全选
						</span>
					</span>

						<button class="btn btn-white btn-sm" @click="search">
							<i class="fa fa-refresh fa-fw" :class="{'fa-spin':pager.loading}"></i> 刷新
						</button>

						<button class="btn btn-white btn-sm" @click="trashOrDelChecked()">
							<i class="fa fa-trash-o"></i> 删除
						</button>


						<NbBtnDropdown name="标记为" size="sm">
							<ul>
								<li>
									<a @click.prevent="readChecked(true)">
										<i class="fa fa-eye"></i>
										<span class="ml5">已读</span>
									</a>
								</li>
								<li>
									<a @click.prevent="readChecked(false)">
										<i class="fa fa-eye-slash"></i>
										<span class="ml5">未读</span>
									</a>
								</li>
								<li>
									<a @click.prevent="flagChecked(true)">
										<i class="fa fa-flag text-danger"></i>
										<span class="ml5">红旗</span>

									</a>
								</li>
								<li>
									<a @click.prevent="flagChecked(false)">
										<i class="fa fa-ban"></i>
										<span class="ml5">取消红旗</span>

									</a>
								</li>
							</ul>
						</NbBtnDropdown>
						<NbBtnDropdown name="移动至" size="sm">
							<ul>
								<li v-for="item in StatusList">
									<a @click.prevent="moveChecked(item.value)">
										<i :class="item.icon"></i>
										<span class="ml5">{{item.name}}</span>
									</a>
								</li>
							</ul>
						</NbBtnDropdown>


					</div>
				</div>
				<div class="mail-box">
					<table class="table table-hover table-mail mb0">
						<tbody>

						<tr v-for="messageLetter in pager.messageLetters" class="cursor"
						    :class="{'read':messageLetter.read,'unread':!messageLetter.read,'text-danger':messageLetter.flag}"
						    @click.stop.prevent="$router.push({ path: 'detail', query: { id: messageLetter.id }})">
							<td class="check-mail">
								<NbCheckbox v-model="messageLetter.checked"/>
							</td>
							<td class="mail-ontact">

								<a v-if="box === 'outbox'" href="javascript:void(0)">
									{{messageLetter.getReceiverNames()}}
								</a>
								<a v-else href="javascript:void(0)">
									{{messageLetter.sender.nickname}}
								</a>

							</td>
							<td>
								<i v-show="messageLetter.flag" class="fa fa-flag text-danger btn-action"
								   title="取消红旗" @click.stop.prevent="flagMessage(messageLetter,false)"></i>
								<i v-show="!messageLetter.flag" class="fa fa-flag-o btn-action"
								   title="标为红旗" @click.stop.prevent="flagMessage(messageLetter,true)"></i>
								<i class="fa fa-trash-o btn-action"
								   title="删除" @click.stop.prevent="trashOrDelMessage(messageLetter)"></i>

							</td>
							<td class="mail-subject cursor">
								<a href="javascript:void(0)">{{messageLetter.subject}}</a>
							</td>
							<td class="cursor">


								<i v-show="messageLetter.attachmentsNum" class="fa fa-paperclip"></i>

							</td>
							<td class="text-right mail-date cursor">{{messageLetter.createTime |
								simpleDateTime}}
							</td>
						</tr>

						</tbody>
					</table>
				</div>

			</div>
			<div class="col-xs-12 mt20">
				<NbPager :pager="pager" :callback="refresh"></NbPager>
			</div>
		</div>
	</div>

</template>


<script>

	import NavigationMenus from "./widget/NavigationMenus";
	import NbBtnDropdown from '../../../../common/widget/NbBtnDropdown'
	import NbCheckbox from '../../../../common/widget/NbCheckbox.vue'
	import NbPager from '../../../../common/widget/NbPager.vue'
	import Pager from  "../../../../common/model/base/Pager"
	import MessageLetter from  "../../../../common/model/message/letter/MessageLetter"
	import {Notification, MessageBox} from 'element-ui';

	let StatusMap = MessageLetter.prototype.getStatusMap();
	let StatusList = MessageLetter.prototype.getStatusList();

	export default {
		data () {
			return {
				allCheck: false,
				pager: new Pager(MessageLetter),
				StatusList
			}
		},
		components: {
			NavigationMenus,
			NbBtnDropdown,
			NbCheckbox,
			NbPager
		},
		computed: {
			box(){
        if(!this.$store.state.route.params.box) {
          return 'inbox'
        }
				return this.$store.state.route.params.box;
			},
			title(){
				let s = StatusMap[this.box.toUpperCase()];
				if (s) {
					return s.name;
				} else if (this.box === "flag") {
					return "红旗消息";
				}

				return "未知标题";
			}
		},
		watch: {
			"box"(){

				//由于多个页面共用该控件的原因，搜索框先清空
				this.pager.setFilter("keyword", null);


				this.pager.messageLetters = [];
				this.search();


			},
			"allCheck"(){
				for (let i = 0; i < this.pager.messageLetters.length; i++) {
					let messageLetter = this.pager.messageLetters[i];
					messageLetter.checked = this.allCheck;
				}
			}
		},
		methods: {

			getCheckedIds(){
				let ids = [];
				let that = this;
				for (let i = 0; i < this.pager.messageLetters.length; i++) {
					let messageLetter = this.pager.messageLetters[i];

					if (messageLetter.checked) {
						ids.push(messageLetter.id);
					}
				}
				if (!ids.length) {
					Notification.error({
						message: '请选择消息！'
					});
					return null;
				}

				return ids;
			},
			flagMessage(messageLetter, flag){
				let that = this;
				let ids = [];
				ids.push(messageLetter.id);
				messageLetter.httpFlag(ids, flag, function () {
					messageLetter.flag = flag;
				});
			},
			flagChecked(flag){
				let that = this;
				let ids = this.getCheckedIds();
				if (!ids) {
					return;
				}

				this.pager.messageLetters[0].httpFlag(ids, flag, function () {

					that.allCheck = false;
					for (let i = 0; i < that.pager.messageLetters.length; i++) {
						let messageLetter = that.pager.messageLetters[i];

						if (messageLetter.checked) {
							messageLetter.checked = false;
							messageLetter.flag = flag;
						}
					}

				});
			},

			readChecked(read){
				let that = this;
				let ids = this.getCheckedIds();
				if (!ids) {
					return;
				}

				this.pager.messageLetters[0].httpRead(ids, read, function () {

					that.allCheck = false;
					for (let i = 0; i < that.pager.messageLetters.length; i++) {
						let messageLetter = that.pager.messageLetters[i];

						if (messageLetter.checked) {
							messageLetter.checked = false;
							messageLetter.read = read;
						}
					}

				});
			},

			moveChecked(status){
				let that = this;
				let ids = this.getCheckedIds();
				if (!ids) {
					return;
				}

				this.pager.messageLetters[0].httpStatus(ids, status, function () {

					that.allCheck = false;

					that.refresh();

				});
			},
			trashOrDelChecked(){
				if (this.box === "deleted") {
					this.delChecked();
				} else {
					this.trashChecked();
				}
			},
			trashOrDelMessage(messageLetter){
				if (this.box === "deleted") {
					this.delMessage(messageLetter);
				} else {
					this.trashMessage(messageLetter);
				}
			},

			trashChecked(){
				let that = this;
				let ids = this.getCheckedIds();
				if (!ids) {
					return;
				}

				that.pager.messageLetters[0].httpStatus(ids, "DELETED", function () {
					Notification.success({
						message: '操作成功!'
					});
					that.refresh();
				});

			},
			trashMessage(messageLetter){

				let that = this;
				let ids = [];
				ids.push(messageLetter.id);
				messageLetter.httpStatus(ids, "DELETED", function () {
					Notification.success({
						message: '操作成功!'
					});
					that.refresh();
				});
			},
			delChecked(){
				let that = this;
				let ids = this.getCheckedIds();
				if (!ids) {
					return;
				}

				MessageBox.confirm('此操作将彻底删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
					that.pager.messageLetters[0].httpDelete(ids, function () {
						Notification.success({
							message: '成功删除消息!'
						});
						that.search();

					});
				}, null);
			},
			delMessage(messageLetter){

				let that = this;
				let ids = [];
				ids.push(messageLetter.id);
				MessageBox.confirm('此操作会将彻底删除, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(function () {
					messageLetter.httpDelete(ids, function () {
						Notification.success({
							message: '成功删除消息!'
						});
						that.refresh();
					});
				}, null);
			},
			search(){
				this.pager.page = 0;
				this.refresh()
			},
			refresh(){
				let that = this;


				if (this.box === "flag") {
					this.pager.setFilter("flag", true)
				} else {
					this.pager.setFilter("flag", null);
				}

				let s = StatusMap[this.box.toUpperCase()];
				if (s) {
					this.pager.setFilter("status", s.value);
				} else {
					this.pager.setFilter("status", null);
				}

        this.pager.setFilter("orderCreateTime", "DESC");

				this.pager.httpFastPage();

			},
			goToUser(){
			}
		},
		mounted(){

			this.pager.enableHistory();
			this.refresh();


		}
	}

</script>
