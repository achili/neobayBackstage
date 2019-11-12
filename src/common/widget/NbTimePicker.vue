<template>
	<div ref="clockpicker" class="input-group clockpicker">

		<input readonly ref="input" type="text" class="form-control" :value="val">
		<span class="input-group-addon">
        <span class="fa fa-clock-o"></span>
    </span>
	</div>
</template>

<script>

	import $ from "jquery"
	import ClockPicker from "../fork/clockpicker/clockpicker-vue"
	import {simpleDateTime, simpleDate, simpleMinute, str2Date} from "../filter/time";
	import "clockpicker/dist/bootstrap-clockpicker.css";

	ClockPicker($);


	export default {
		data(){
			return {
				val: null
			}
		},
		props: {
			value: {
				type: Date,
				required: false,
				"default": null
			}
		},
		computed: {

			$clockpicker(){
				return $(this.$refs.clockpicker);
			},
			$input(){
				return $(this.$refs.input);
			}
		},
		watch: {
			"val"(){
				let str = simpleDate(new Date()) + " " + this.val + ":00";
				this.$emit("input", new Date(str));
			}
		},
		methods: {},
		mounted(){
			let that = this;

			if (this.value) {
				this.val = simpleMinute(this.value);
			} else {
				this.val = simpleMinute(new Date());
			}

			this.$clockpicker.clockpicker({
				afterDone: function () {
					that.val = that.$input.val();
				}
			});
		}
	}
</script>



