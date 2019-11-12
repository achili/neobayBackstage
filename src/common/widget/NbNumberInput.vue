<template>
	<div class="nb-number-input">
		<input class="form-control" ref="input" maxlength="16" :value="value" @input="updateValue($event.target.value)"/>
		<span>
      <button class="up btn btn-white" @click="clickUp" @mouseup="mouseUpAdd"
              @mousedown="mouseDownAdd" @mouseover="mouseOverAdd">
        <i class="fa fa-chevron-up"></i>
      </button>
      <button class="down btn btn-white" @click="clickDown" @mouseup="mouseUpSub"
              @mousedown="mouseDownSub" @mouseover="mouseOverSub">
        <i class="fa fa-chevron-down"></i>
      </button>
    </span>
	</div>
</template>


<script>

	export default {
		data () {
			return {
				increment: 1,
        judgeCount: 0,
        judgeLimit: 4,
        interval: 100,
        time: null,
        isLongPressed: false
			}
		},
		props: {
			value: {
				required: false,
				"default": "0"
			},
			allowedNegative: {
				type: Boolean,
				required: false,
				"default": false
			}
		},
		watch: {},
		computed: {},
		methods: {
			updateValue(value){
				let no;
				no = parseInt(value);
				if (isNaN(no)) {
					no = 0;
				}
				if (this.$refs.input.value !== no.toString()) {
					this.$refs.input.value = no.toString();
				}
				this.$emit('input', no.toString());
			},
			clickUp(){
				if (!this.isLongPressed) {
					this.add();
				}
				this.isLongPressed = false;
			},
			clickDown(){
				if (!this.isLongPressed) {
					this.sub();
				}
				this.isLongPressed = false;
			},
			//ADD
			mouseDownAdd(){
				this.time = setInterval(this.longPressAdd, this.interval);
			},
			mouseUpAdd(){
				clearInterval(this.time);
				this.judgeCount = 0;
			},
			mouseOverAdd(){
				clearInterval(this.time);
				this.judgeCount = 0;
			},
			longPressAdd(){
				if (this.judgeCount <= this.judgeLimit) {
					this.judgeCount++;
				} else {
					this.add();
					this.isLongPressed = true;
				}
			},
			//SUB
			mouseDownSub(){
				this.time = setInterval(this.longPressSub, this.interval);
			},
			mouseUpSub(){
				clearInterval(this.time);
				this.judgeCount = 0;
			},
			mouseOverSub(){
				clearInterval(this.time);
				this.judgeCount = 0;
			},
			longPressSub(){
				if (this.judgeCount <= this.judgeLimit) {
					this.judgeCount++;
				} else {
					this.sub();
					this.isLongPressed = true;
				}
			},
			add(){
				let no;
				no = parseInt(this.value);
				if (isNaN(no)) {
					no = 0;
				}
				no += this.increment;
				this.updateValue(no.toString());
			},
			sub(){
				let no;
				no = parseInt(this.value);
				if (isNaN(no)) {
					no = 0;
				}
				if (!this.allowedNegative && no <= 0) {
					no = 0;
				} else {
					no -= this.increment;
				}
				this.updateValue(no.toString());
			}
		}
	}
</script>

<style lang="less" rel="stylesheet/less">
	.nb-number-input {
		display: table;
		input {
			z-index: 3;
			position: relative;
		}
		span {
			vertical-align: middle;
			display: table-cell;
			button {
				display: block;
				width: 100%;
				padding: 8px 10px;
				margin-left: -1px;
				position: relative;
				&.up {
					border-radius: 0;
					border-top-right-radius: 4px;
				}
				&.down {
					margin-top: -2px;
					border-radius: 0;
					border-bottom-right-radius: 4px;
				}
				i {
					position: absolute;
					top: 3px;
					left: 4px;
					font-size: 9px;
				}
			}
		}
	}
</style>



