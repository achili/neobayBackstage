<template>
  <div class="ispace-energy-frame">
    <div class="nb-tabs yellow-theme">
      <!--栏目栏-->
      <div class="type-bar">
        <span v-for="tab in tabs">
          <span class="type" :class="{ 'active': isActive(tab) }" @click="tabClick(tab)">{{tab.name}}</span>
        </span>
      </div>

      <!--内容栏-->
      <div class="content-block">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
  import NbTabs from "../../../../common/widget/NbTabs.vue";
  import NbTabPanel from "../../../../common/widget/NbTabPanel.vue";
  export default{
    data(){
      return {
        tabs: [
          {name: "打印机列表", path: "/by/ispace/print/list"},
          {name: "添加打印文件", path: "/by/ispace/print/printhistorycreate"}
        ]
      }
    },
    watch: {},
    methods: {
      openMore() {
        window.open("https://eiot.energyiot.cn/service/login");
      },
      isActive(tab) {
        return tab.path === this.$route.path;
      },
      tabClick(tab) {
        if(tab.path) {
          this.$router.push(tab.path)
        }
      }
    },
    components: {
      NbTabs,
      NbTabPanel
    },
    mounted(){

    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../common/assets/css/global/variables";
  .ispace-energy-frame {

  }
  .nb-tabs(@main-color) {
    .type-bar {

      border-bottom: 1px solid @main-color;

      .type {
        display: inline-block;
        padding: 10px 15px;
        cursor: pointer;
        transition: border 0.4s, box-shadow 0.4s, background-color 0.2s;

        &:hover, &.active {
          background-color: @main-color;
          color: white;
        }

      }

      .more {
        display: inline-block;
        float: right;
        padding: 10px 0;
        cursor: pointer;
      }
    }

    &.border-style {
      .type-bar {
        border-bottom: none;
        .type {
          border-top: 1px solid @main-color;
          border-left: 1px solid @main-color;
          border-bottom: 1px solid @main-color;
          &:last-child {
            border-right: 1px solid @main-color;
          }
        }

      }

    }
  }

  .nb-tabs {
    &.yellow-theme {
      .nb-tabs(@neobay-yellow);
    }
  }


</style>
