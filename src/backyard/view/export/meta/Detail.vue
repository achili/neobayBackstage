
<template>
  <div class="exportMeta-detail animated fadeIn">

    <div class="row">
      <div class="col-xs-12 text-right">
        <a title="编辑" class="btn btn-success"
           @click.stop.prevent="$router.push('/by/export/meta/edit/'+exportMeta.id)">
          <i class="fa fa-pencil"></i>
          编辑
        </a>
      </div>
    </div>
    <div>
      <span class="f20 ml5">{{exportMeta.name}}</span>
    </div>
    <div class="mt20">
      <p>
        <strong>创建于：</strong>
      </p>
      <p>
        <span>{{exportMeta.createTime | simpleDateTime}}</span>
      </p>
    </div>



    <div class="mt20">
      <p>
        <strong>描述：</strong>
      </p>
      <p>
        <span>{{exportMeta.description}}</span>
      </p>
    </div>
    <div class="mt20">
      <div>
        <a href="javascript:void(0)" v-show="!typeShow" @click.stop.prevent="typeShow=true">显示属性</a>
        <a href="javascript:void(0)" v-show="typeShow" @click.stop.prevent="typeShow=false">隐藏属性</a>
      </div>
      <NbExpanding>
        <div v-show="typeShow">
          <NbAttribute :attributes="exportMeta.attributes" :editMode="false"/>
        </div>
      </NbExpanding>
    </div>

  </div>

</template>
<script>
  import ExportMeta from '../../../../common/model/export/meta/ExportMeta'
  import NbAttribute from '../../../../common/widget/attribute/NbAttribute.vue'
  import NbExpanding from '../../../../common/widget/NbExpanding'

  export default{
    data () {
      return {
        exportMeta: new ExportMeta(),
        typeShow: false
      }
    },

    components: {
      NbAttribute,
      NbExpanding
    },

    mounted() {
      this.exportMeta.id = this.$store.state.route.params.id;
      this.exportMeta.httpDetail();
    }


  }
</script>
