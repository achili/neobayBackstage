<template>
  <div class="row home-message-list-cell">

    <div class="col-xs-12">
      <div class="media">
        <div class="media-body">
          <div class="cell-content f16" @click.stop.prevent="open('/user/message/letter/list/detail?id=' + messageLetter.id)">
            <span class="mr20">
						  {{messageLetter.createTime | simpleDateTime}}
						</span>

            <span>
							{{messageLetter.subject}}
						</span>

            <span class="pull-right" style="color: red;" v-if="!messageLetter.read">
              未读
            </span>
            <span class="pull-right" style="color: green;" v-else>
              已读
            </span>
          </div>
        </div>

      </div>

    </div>
  </div>
</template>
<script>
  import NbTank from "../../../../common/widget/NbTank.vue";
  import NbSlidePanel from "../../../../common/widget/NbSlidePanel.vue";
  import MessageLetter from "../../../../common/model/message/letter/MessageLetter";

  export default {
    data () {
      return {}
    },
    components: {
      NbTank,
      NbSlidePanel
    },
    props: {
      messageLetter: {
        type: MessageLetter,
        required: true
      }
    },
    methods: {
      open(href){
        window.open(href);
      }
    },
    mounted(){
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  @import "../../../../common/assets/css/global/variables";

  .home-message-list-cell {

    .media {
      .cell-content{
        border-bottom: 1px solid #ccc;
        padding: 10px 0;
        cursor: pointer;
        &:hover {
          color: @neobay-yellow;
        }
      }
    }

  }

</style>
