<template>
  <div>

    <select class="project-selections form-control" multiple="multiple" style="width: 100%">
    </select>

  </div>

</template>
<script>
  import "select2/dist/css/select2.min.css";
  import $ from "jquery";
  import select2 from "select2";
  import "imports-loader?jQuery=jquery!../../../common/fork/select2/zh-CN";
  import Project from "../../../common/model/project/Project";
  import SpaceRegional from "../../../common/model/space/SpaceRegional";

  export default{
    data(){
      return {
        $projectSelections: null
      }
    },
    props: {
      projects: {
        type: Array,
        required: true
      },
      spaceRegional:{
        type: SpaceRegional,
        required: false
      }
    },
    watch: {
      "spaceRegional.id"(newVal, oldVal){
        if(newVal !== oldVal && oldVal > 0){
        // this.refresh();
        }
        this.refresh();
        this.unselect();

      },
      "projects"(){
        console.log("iiii")
        console.log(this.projects)
        // console.log(evt.params.data)
        // this.select()
      }
    },
    methods: {
      refresh(){
        let that = this;
        let url = this.$http.options.root + "/project/page";
        let pageSize = 10;
        let space = [];
        space.push(this.spaceRegional.id);
        this.$projectSelections = $(".project-selections");

        this.$projectSelections.select2({
          language: "zh-CN",
          ajax: {
            url: url,
            dataType: 'json',
            delay: 250,
            data: function (params) {
              return {
                keyword: params.term,
                autoComplate: true,
                page: params.page,
                pageSize: pageSize,
                spaceRegionalIds:space
              };
            },
            processResults: function (data, params) {
              params.page = params.page || 0;

              return {
                results: data.pager.projects,
                pagination: {
                  more: (params.page + 1) * pageSize < data.pager.totalItems
                }
              };
            },
            cache: true
          },
          escapeMarkup: function (markup) {
            return markup;
          },
          minimumInputLength: 1,
          templateResult: function (project) {
            if (project.loading) {
              return project.text;
            }

            return "" + project.name + "&lt;" + project.leader + "&gt;";
          },
          templateSelection: function (project) {
            // if(project.select){
            //   return project
            // }else{
            //   return "" + project.name + "&lt;" + project.leader + "&gt;";
            // }
            return "" + project.name + "&lt;" + project.leader + "&gt;";
          }
        });

      },
      select(){
        let that = this;
        this.$projectSelections.on('select2:select', function (evt) {

          let project = new Project();
          project.render(evt.params.data);
          that.projects.push(project);

        });
      },
      select2(){
        this.$projectSelections.on('select2:select', function (evt) {

        });
      },
      unselect(){
        let that = this;
        this.$projectSelections.on('select2:unselect', function (evt) {

          let project = evt.params.data;
          for (let i = 0; i < that.projects.length; i++) {
            let p = that.projects[i];
            if (project.id === p.id || project.id === p.id + "") {
              // that.projects.splice(i, 1);
              break;
            }
          }
        });
      }

    },
    components: {},
    mounted(){

      this.refresh();
      this.select();
      this.unselect()
    }
  }
</script>
