<template>
  <div ref="timeline" class="m3" >
    <div>

    </div>
    <div class="meetinGrooMlinE" >
      <span v-if="instruction === 1" class="meetinGrooMlinEiteMdatE" style="opacity: 0">{{month}}.{{date}}</span>
      <span v-if="instruction === 1" class="meetinGrooMlinEiteMTime" style="text-align: left">8:00</span>
      <span v-if="instruction === 1" class="meetinGrooMlinEiteMTime" style="text-align: right;">24:00</span>
      <span v-if="instruction !== 1" class="meetinGrooMlinEiteMdatE">{{month}}.{{date}}</span>
      <button v-if="instruction !== 1" class="meetinGrooMlinEiteM" style="background-color: #c1f9ae" v-for="n in 32" @click.prevent.stop="choose(n)"></button>
    </div>
  </div>

</template>

<script>
  import $ from "jquery"
  import TimeLine from "./TimeLine"

  TimeLine($);

  export default {


    props: {
      screenings: {
        type: Array,
        required: true
      },
      month: {
        type: Number,
        required: true
      },
      date: {
        type: Number,
        required: true
      },
      callback: {
        type: Function,
        required: false
      },
      instruction: {
        type: Number,
        required: true
      }
    },

    watch:{
      screenings: function (oldValue, newValue){
        this.$timeline.timeline(this.screenings);
      }
    },

    computed: {
      $timeline(){
        return $(this.$refs.timeline);
      }
    },

    methods: {
      choose(n){
        this.callback(n,this.date,this.month);
      }
    },

    mounted() {
      this.$timeline.timeline(this.screenings);
    }

  }

</script>
<style>
  @media (min-width: 350px)
  {
    .meetinGrooMlinEiteM{
      height: 100%;
      width: 2.5%;
      padding: 0;
      margin: 0;
      border-width: 0;
    }
    .meetinGrooMlinEiteMTime {
      height: 100%;
      line-height: 25px;
      width: 40%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
    }

    .meetinGrooMlinEiteMdatE {
      height: 100%;
      line-height: 25px;
      width: 20%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
      text-align: center;
    }
  }

  @media (min-width: 768px)
  {
    .meetinGrooMlinEiteM{
      height: 100%;
      width: 2.75%;
      padding: 0;
      margin: 0;
      border-width: 0;
    }
    .meetinGrooMlinEiteMTime {
      height: 100%;
      line-height: 25px;
      width: 44%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
    }
    .meetinGrooMlinEiteMdatE {
      height: 100%;
      line-height: 25px;
      width: 12%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
      text-align: center;
    }
  }

  @media (min-width: 1200px)
  {
    .meetinGrooMlinEiteM{
      height: 100%;
      width: 2.85%;
      padding: 0;
      margin: 0;
      border-width: 0;
    }
    .meetinGrooMlinEiteMTime {
      height: 100%;
      line-height: 25px;
      width: 45.7%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
    }
    .meetinGrooMlinEiteMdatE {
      height: 100%;
      line-height: 25px;
      width: 8.5%;
      padding: 0;
      margin: 0;
      border-width: 0;
      background-color: #FFFFFF;
      text-align: center;
    }
  }


  .meetinGrooMlinE{
    height: 25px;
    margin: 1px;
    background-color: #ffffff;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    -webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: center;
    justify-content: center;

  }
</style>
