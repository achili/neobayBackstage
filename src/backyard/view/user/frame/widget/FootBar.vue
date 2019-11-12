<template>
  <div class="lb-user-login-bottom-foot">
    <div class="container">
      <div class="row text-center">
        <nav class="foot-navigation">
          <span class="pointer" @click.stop.prevent="open('/')">
            <nobr>首页</nobr>
          </span>
          |
          <span class="pointer" @click.stop.prevent="open('/home/about')">
            <nobr>关于我们</nobr>
          </span>
          |
          <span class="pointer" @click.stop.prevent="open('/home/entry')">
            <nobr>入驻零号湾</nobr>
          </span>
          |
          <span class="pointer" @click.stop.prevent="open('/home/article')">
            <nobr>资讯动态</nobr>
          </span>
          |
          <span class="pointer" @click.stop.prevent="open('/transition/index')">
            <nobr>创业无忧</nobr>
          </span>
        </nav>
      </div>

      <div class="row text-center foot-contact">
        <nobr class="mr18">地址：{{$store.state.address}}</nobr>
        <nobr>邮编：{{$store.state.ipCode}}</nobr>
        <nobr>邮箱：<span class="pointer" @click="openMail('mailto:'+$store.state.email)">{{$store.state.email}}</span></nobr>
        <nobr>电话：{{$store.state.Telephone}}</nobr>
        <div class="foot-contact-ico">
          <i class="fa fa-weixin pointer weixin-button" :title="$store.state.weiboLink">
            <div class="two-dimension">
              <img src="../../../../common/assets/img/qr_code.png">
            </div>
          </i>
        </div>
      </div>

      <div class="text-center foot-icp mt15 mb45">
        <span>{{$store.state.copyright}}</span>
        <nobr class="ml5 pointer" @click="open('http://www.miitbeian.gov.cn')">{{$store.state.filling}}</nobr>
      </div>
    </div>
  </div>
</template>

<style lang="less" rel="stylesheet/less">
  .lb-user-login-bottom-foot {
    color: #838383;
    background-color: white;
    .foot-navigation {
      padding: 52px 0px;
      nobr {
        font-size: 15px;
        color: #838383;
        padding: 15px;
      }
    }
    .foot-contact {
      position: relative;
      nobr {
        margin-right: 18px;
        font-size: 14px;
      }
      .foot-contact-ico {
        font-size: 22px;
        margin-top: 10px;
        @media (min-width: 992px) {
          position: absolute;
          right: 0px;
          top: -15px;
        }
        i {
          padding: 4px;
          border: 1px solid;
          border-radius: 100px;
        }
        .weixin-button {
          .two-dimension {
            display: none;
            transition: 0.5s;
            position: absolute;
            bottom: 40px;
            right: -80px;
            width: 200px;
            height: 200px;
            opacity: 0;
            border: 5px solid rgba(255,255,255,0.5);
            @media (min-width: 992px) {
              right: 0px;
            }
          }
          &:hover {
            .two-dimension {
              display: block;
              opacity: 1;
            }
          }
        }
      }
    }
    .foot-icp {
      nobr {
        font-size: 10px;
        a {
          color: #838383;
        }
      }
    }
    .pointer {
      cursor: pointer;
      &:hover {
        color: #444444;
      }
    }
  }

</style>

<script>
  export default{
    data(){
      return {}
    },
    components: {},
    methods: {
      openMail(url){
        window.location.href = url;
      },
      open(url){
        window.open(url);
      }
    },
    mounted(){}
  }
</script>
