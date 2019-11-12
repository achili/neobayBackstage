<template>
  <div>
    <div class="back_image">
      <div class="nb-logo-banner"  @click="open('/home/index')">
        <div class="nav-bar1" >
          <span class="neo-white f30 "><b>neo</b><span class="neo-blue"><b>Bay</b></span></span>
        </div>
        <div class="nav-bar1 neo-white f10" style="margin-top: 17px;">
          <div class="nav-bar2">
            FOR YOUR DREAM
          </div>
          <div class="nav-bar2" style="line-height: 10px">
            为梦同行
          </div>
         </div>
        <div class="nav-bar1 nav-bar2">
          <span class="neo-white f30">零号<span class="neo-blue">湾</span></span>
        </div>
      </div>
      <div class="code_image">
        <img class="code_img" src="../../common/assets/img/qr_code.png"/>
        <span class="code_word">关注我们</span>
      </div>

      <div class="update_subject_form">
        <div class="form_update_form">
          <span class="app_name">零号湾App</span>
          <div class="update_form_logo">
            <img class="logo_img" src="../../common/assets/img/update_logo.png"/>
          </div>
          <div class="login-subject-banner text-center">
           <div class="subject-banner-title">从<span class="banner-title-big">零</span>启航</div>
          </div>
          <div class="update_download_button">
            <button class="form_download_button" style="color: white;" @click="download">立即下载</button>
            <img class="down_img" src="../../common/assets/img/download_logo_code.png" @mouseout="hidecode" @mouseover="showcode"/>
            <span class="down_code" v-if="show">
              <div class="down_code_div">
                <img class="down_code_img" src="../../common/assets/img/download_code.png" />
              </div>
            </span>
          </div>
          <div class="update_form_note">
            <p class="update_note">
              版本：1.3.0
              <span>  |  </span>
              大小30.0M
            </p>
            <span class="update_time">
              发布时间：2018-11-16
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script>
  export default{
    data(){
      return {
        show: false
      }
    },
    components: {},
    methods: {
      open(url){
        window.open(url);
      },
      download(){
        window.open("https://itunes.apple.com/cn/app/neobay/id1438371021?mt=8");
      },
      hidecode(){
        this.show = false
      },
      showcode() {
        this.show = true
      }
    },
    mounted(){}
  }
</script>
<style lang="less" rel="stylesheet/less">
  .back_image {
    background: url(../../common/assets/img/login_background.jpg) 30% 0;
    background-size: cover;
    min-height: 100vh;
    width: auto;
    .code_image{
      height: 160px;
      width: 126px;
      position:absolute;
      left:0;
      bottom:0;
      border-style:solid;
      border-width:1px;
      border-color:#ffffcc;
      background-size:cover;
      text-align: center;
    }
    .code_img{
      height: 100px;
      width: 100px;
      margin:13px 12px;
      position:relative;
      border:1px solid #333;
    }
    .code_word{
      font-family:"宋体";
      font-size:18px;
    }
    .nb-logo-banner {
      text-align: center;
      cursor: pointer;
      margin-left: 160px;
      .nav-bar1 {
        float: left;
      }
      @media (max-width: 466px) {
        .nav-bar2 {
          display: none;
        }
      }
      .neo-white {
        color: #ffffcc;
      }

      .neo-blue {
        color: #1773C3;
      }
    }
    .update_subject_form {
      width: 500px;
      height: 500px;
      right:15%;
      top:28%;
      position: absolute;
      @media (max-width: 768px) {
        right:3%;
      }
      .form_update_form{
        width: 500px;
        height: 500px;
        position: absolute;
        left:10px;
        top:10px;
        background-size:cover;
        .app_name{
          font-family:"华文琥珀";
          font-size: 75px;
          right: 20px;
          top:10px;
          color: white;
          font-weight: 500;
          position:absolute;
        }
        .update_form_logo{
          left: 20px;
          width: 100px;
          height: 100px;
          position:absolute;
          left:20px;
          top:10px;
          border-radius: 10px;
          overflow: hidden;
          .code_img{
            width: auto;
            height: auto;
          }
        }
        .login-subject-banner {
          margin-top: 120px;
          .subject-banner-title {
            color: #2d79bc;
            font-family: '华文行楷', serif;
            font-size: 50px;
            font-weight: 900;
            opacity: 0.8;
            .banner-title-big {
              font-size: 75px;
            }
          }
        }
        .update_download_button{
          width: 400px;
          height: 200px;
          margin-top:-4%;
          margin-left:30%;
          position:absolute;
          @media (max-width: 768px) {
            margin-top: 10px;
          }
          .form_download_button{
            height: 60px;
            width: 150px;
            margin-top: 11%;
            border-top-left-radius:28px;
            border-top-right-radius:28px;
            border-bottom-left-radius:28px;
            border-bottom-right-radius:28px;
            background-color:#ffc60c;
            box-shadow:0px 3px 2px rgba(135, 31, 15, 0.21);/*给按钮增加阴影*/
            border: none;
            font-size: 30px;
            font-family:'华文行楷';
            outline: none;
          }
          .down_img{
            margin-left:5%;
            cursor: pointer
          }
          .down_code{
            margin-left: 20px;
            display: inline-block;
            .down_code_div{
              margin-left: 20px;
              width: 150px;
              height: 150px;
              .down_code_img{
                margin-left: -21%;
                border:5px solid white;
                width: auto;
                height: auto;
              }
            }
            .down_code_div:after {
              content: "";
              width: 0;
              height: 0;
              border-top:13px solid transparent;
              border-bottom:13px solid transparent;
              border-right:13px solid white;
              position: absolute;
              left: 51%;
              top: 40%;
              margin-top: -10px;
            }
          }

        }
        .update_form_note{
          margin-top: 160px;
          font-size: 16px;
          color:#1773C3 ;
          float: right;
          text-align: left;
          margin-right: 30%;
          .update_note{
            margin: 0;
            padding: 0;
            outline: none;
            box-sizing: border-box;
          }
          .update_time{
            display: inline-block;
            margin-top: 10px;
          }
        }
      }
    }
  }


</style>
