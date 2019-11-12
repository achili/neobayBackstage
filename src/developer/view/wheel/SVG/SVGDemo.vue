<template>
  <div>
    <div class="row">
      <div class="col-xs-12">
        <h1>SVG演示</h1>
      </div>
      <div class="col-xs-12">
        <div ref="rectangle" class="rectangle"></div>
        <button @click="rectangleStop">点击停止</button>
        <button @click="heartbeatRectangle.play()">点击开始</button>
        <button @click="heartbeatRectangle.pause()">点击暂停</button>
        <button @click="heartbeatRectangle.setSpeed(3)">3倍速</button>
        <button @click="heartbeatRectangle.setSpeed(1)">1倍速</button>

      </div>

      <div class="col-xs-12">
        <div ref="circle" class="circle"></div>
        <button @click="activeCircle.setSpeed(3)">3倍速</button>
      </div>
    </div>
  </div>
</template>
<script>
  import Bodymovin from 'bodymovin'

  export default{
    data(){
      return {
        heartbeatRectangle: null,
        activeCircle: null
      }
    },
    watch: {},
    methods: {
      rectangleStop() {
        this.heartbeatRectangle.stop();
      }
    },
    components: {},
    mounted(){
      this.heartbeatRectangle  = Bodymovin.loadAnimation({
        wrapper: this.$refs.rectangle,
        animType: 'svg',
        loop: true,
        animationData: require("./heartbeatRectangle.json")
      });

      this.activeCircle  = Bodymovin.loadAnimation({
        wrapper: this.$refs.circle,
        animType: 'svg',
        loop: true,
        animationData: require("./activeCircle.json")
      });
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .rectangle {
    height: 300px;
    width: 300px;
  }
  .circle {
    height: 400px;
    width: 200px;
  }
</style>
