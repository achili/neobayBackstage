<template>
	<div>

		<select class="user-selections form-control" multiple="multiple" style="width: 100%">
		</select>

	</div>

</template>
<script>
	import User from "../../../common/model/user/User";

	import "select2/dist/css/select2.min.css";
	import $ from "jquery";
	import select2 from "select2";
	import "imports-loader?jQuery=jquery!../../../common/fork/select2/zh-CN";

	export default{
		data(){
			return {
				$userSelections: null
			}
		},
		props: {
			users: {
				type: Array,
				required: true
			}
		},
		watch: {},
		methods: {},
		components: {},
		mounted(){

			let that = this;
			let url = this.$http.options.root + "/user/page";
			let pageSize = 10;


			this.$userSelections = $(".user-selections");

			this.$userSelections.select2({
				language: "zh-CN",
				ajax: {
					url: url,
					dataType: 'json',
					delay: 250,
					data: function (params) {
						return {
							keyword: params.term,
							autoComplate: true,
							page: params.page,
							pageSize: pageSize
						};
					},
					processResults: function (data, params) {
						params.page = params.page || 0;

						return {
							results: data.pager.users,
							pagination: {
								more: (params.page + 1) * pageSize < data.pager.totalItems
							}
						};
					},
					cache: true
				},
				escapeMarkup: function (markup) {
					return markup;
				},
				minimumInputLength: 1,
				templateResult: function (user) {
					if (user.loading) {
						return user.text;
					}

					return "" + user.nickname + "&lt;" + user.email + "&gt;";
				},
				templateSelection: function (user) {

					return "" + user.nickname + "&lt;" + user.email + "&gt;";
				}
			});

			this.$userSelections.on('select2:select', function (evt) {


				let user = new User();
				user.render(evt.params.data);
				that.users.push(user);

			});
			this.$userSelections.on('select2:unselect', function (evt) {

				let user = evt.params.data;

				for (let i = 0; i < that.users.length; i++) {
					let u = that.users[i];
					if (user.id === u.id || user.id === u.id + "") {
						that.users.splice(i, 1);
						break;
					}
				}

			});


		}
	}
</script>
