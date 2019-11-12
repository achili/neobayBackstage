<template>
  <div class="nb-photo-frame" :style="'width:' + width + 'px' ">
    <div class="support" :style="'margin-top:'+proportion+'%'"></div>
    <div class="min-support" :style="'margin-top:'+minProportion"></div>
    <div class="img" :style="'background-image:url(\''+picture+'\')'"></div>
  </div>
</template>

<script>
  export default {
    data(){
      return {}
    },
    props: {
      proportion: {
        type: Number,
        required: true
      },
      width: {
        type: Number,
        required: true
      },
      minProportion: {
        type: String,
        required: false,
        "default": "0px"
      },
      picture: {
        type: String,
        required: true
      }
    },
    mounted(){}
  }
</script>

<style lang="less" rel="stylesheet/less">
  .nb-photo-frame{
    position:relative;
    overflow:hidden;
    .img{
      position:absolute;
      top:0;
      right: 0;
      left: 0;
      bottom: 0;
      background-position: center;
      background-size: cover;
    }
  }
</style>
