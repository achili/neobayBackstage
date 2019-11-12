<template>
  <nav ref="menuNav" class="side-navigation" :class="{'show-drawer':showDrawer}" @click.stop.prevent="eatClick">
    <div class="sidebar-collapse">

      <div class="menu-header">
        <div class="logo-area" @click="goToProfile">
          <img alt="image" class="img-circle w80" :src="user.getAvatarUrl()"/>
        </div>
        <div class="text-area">
          <div class="nickname">
            {{user.nickname}}

          </div>
          <div class="role">
            <AvatarSideNaviDropdown :name="user.role.name"/>
          </div>

        </div>
      </div>

      <ul class="nav">
        <SideMenu v-for="menu in menus" :key="menu.name" :menu="menu"/>

      </ul>
    </div>
  </nav>
</template>
<script>
  import {mapGetters} from 'vuex'
  import SideMenu from "./SideMenu.vue"
  import AvatarSideNaviDropdown from "./widget/AvatarSideNaviDropdown.vue";

  import PerfectScrollbar from "perfect-scrollbar";
  import "perfect-scrollbar/dist/css/perfect-scrollbar.css";
  import $ from "jquery";

  export default {

    data () {
      return {
        user: this.$store.state.user
      }
    },
    props: {
      menus: {
        required: true
      }
    },
    computed: {
      showDrawer () {
        return this.$store.state.config.showDrawer;
      },
      mobile () {
        return this.$store.state.config.mobile;
      }

    },

    components: {
      SideMenu,
      AvatarSideNaviDropdown
    },
    methods: {
      goToProfile(){
        this.$router.push("/by/user/profile/" + this.user.id);
      },
      eatClick(){
      },
      updateBody(){
        if (this.showDrawer && this.mobile) {
          //$("body").addClass("overflow-hidden");
        } else {
          //$("body").removeClass("overflow-hidden");
        }
      }
    },
    watch: {
      "showDrawer"(newVal, oldVal){
        this.updateBody();
      },
      "mobile"(newVal, oldVal){
        this.updateBody();
      },
      "$route"() {
        //监视$route 变一次就改一次
        this.menus.forEach(eachMenu => {
          eachMenu.refreshChildrenActivity(this.$route.path);
        })
      }
    },
    mounted(){
      let that = this;

      PerfectScrollbar.initialize(that.$refs.menuNav);

      this.updateBody();
      setTimeout(function () {
        that.menus.forEach(eachMenu => {
          eachMenu.refreshChildrenActivity(that.$route.path);
        })
      }, 300);

    }
  }
</script>

<style lang="less" rel="stylesheet/less">

  @import "../assets/css/global/variables";

  //@nav-bg: @neobay-blue;
  //@nav-bg: @neobay-yellow;
  @nav-bg: #0074BD;
  //@nav-bg: white;
  @nav-text-color: white;
  @font-highlight-color: #FFB74E;
  @left-border-color: #FFB74E;

  //大屏幕
  @media (min-width: @screen-lg-min) {
    .menu-header {
      display: none;
    }
  }

  //中屏幕
  @media (min-width: @screen-md-min) and (max-width: @screen-md-max) {
    .menu-header {
      display: none;
    }
  }

  //小屏幕
  @media (min-width: @screen-sm-min) and (max-width: @screen-sm-max) {
    .menu-header {
      display: none;
    }
  }

  //手机屏幕
  @media (max-width: @screen-xs-max) {

  }

  //左侧菜单block.
  .side-navigation {

    overflow: auto;

    -webkit-transition: all 0.4s;
    -moz-transition: all 0.4s;
    -o-transition: all 0.4s;
    transition: all 0.4s;

    position: fixed;
    width: @sidebar-width;

    left: -@sidebar-width;
    top: @top-navigation-height;
    bottom: 0;
    z-index: 2001;

    background: darken(@nav-bg, 3%);

    &.show-drawer {
      left: 0;
    }

    .sidebar-collapse {
      padding-top: 20px;
      padding-bottom: 40px;
    }

    //放头像和用户名的地方。
    .menu-header {

      border-bottom: 1px solid #2F4458;
      padding-bottom: 20px;
      .logo-area {
        cursor: pointer;
        text-align: center;
        padding: 20px 0;
      }

      .text-area {
        .nickname {
          text-align: center;
          color: @nav-text-color;
          font-weight: bold;
        }
        .role {
          text-align: center;
          color: @nav-text-color;
        }
      }

    }

    .nav {
      li {

        &.active {
          border-left: 4px solid darken(@left-border-color, 2%);

          //只有紧接的这一层a才会高亮。
          > a {
            color: @font-highlight-color;
          }
        }

        a {
          background-color: darken(@nav-bg, 3%);
          color: @nav-text-color;

          padding: 12px 20px;
          &:hover, &:focus {
            color: @font-highlight-color;
          }

          i {
            margin-right: 6px;
          }
        }
      }
      &.nav-first-level {
        &.active {
        }
      }
      &.nav-second-level {
        padding-left: 15px;
        li {
          &.active {
            border: none;
          }
        }
      }
      &.nav-third-level {
        padding-left: 15px;
      }
      &.nav-fourth-level {
        padding-left: 15px;
      }
    }
  }


</style>
