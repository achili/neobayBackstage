<template>
  <div class="nb-logo-banner" @click="open('/home/index')">
    <div class="nav-bar1">
      <span class="neo-yellow f30 "><b>neo</b><span class="neo-blue"><b>Bay</b></span></span>
    </div>
    <div class="nav-bar1 neo-yellow f10" style="margin-top: 17px;">
      <div class="nav-bar2">
        FOR YOUR DREAM
      </div>
      <div class="nav-bar2" style="line-height: 10px">
        为梦同行
      </div>
    </div>
    <div class="nav-bar1 nav-bar2">
      <span class="neo-yellow f30">零号<span class="neo-blue">湾</span></span>
    </div>
  </div>
</template>

<script>
  export default {
    data () {
      return {}
    },
    components: {},
    props: {},
    methods: {
      open(url){
        window.open(url);
      }
    },
    mounted(){}
  }

</script>

<style lang="less" rel="stylesheet/less">
  .nb-logo-banner {
    text-align: center;
    cursor: pointer;
    margin-left: 20px;
    .nav-bar1 {
      float: left;
      /*margin-right: 7px;*/
      /*margin-top: 10px;*/
    }
    @media (max-width: 466px) {
      .nav-bar2 {
        display: none;
      }
    }
    .neo-yellow {
      color: #F5A722;
    }

    .neo-blue {
      color: #1773C3;
    }
  }
</style>
