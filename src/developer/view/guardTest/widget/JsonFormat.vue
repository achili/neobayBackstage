<template>
  <div class="json-format">
    <textarea v-model="jsonStr" readonly class="wv100 h-200"></textarea>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    computed: {
      jsonStr() {
        return this.formatJson(JSON.stringify(this.json));
      }
    },
    props: {
      json: {
        required: false,
        default: "{}"
      }
    },
    methods: {
      repeat(s, count) {
        return new Array(count + 1).join(s);
      },
      formatJson(json) {
        let i = 0;  //定义的时候必须加let
        let len = 0;
        let tab = " ";
        let targetJson = "";
        let indentLevel = 0;
        let inString = false;
        let currentChar = null;

        for (i = 0, len = json.length; i < len; i += 1) {
          currentChar = json.charAt(i);

          switch (currentChar) {
            case '{':
            case '[':
              if (!inString) {
                targetJson += currentChar + "\n" + this.repeat(tab, indentLevel + 1);   //里面函数相互调用时，要加this
                indentLevel += 1;
              } else {
                targetJson += currentChar;
              }
              break;
            case '}':
            case ']':
              if (!inString) {
                indentLevel -= 1;
                targetJson += "\n" + this.repeat(tab, indentLevel) + currentChar;
              } else {
                targetJson += currentChar;
              }
              break;
            case ',':
              if (!inString) {
                targetJson += ",\n" + this.repeat(tab, indentLevel);
              } else {
                targetJson += currentChar;
              }
              break;
            case ':':
              if (!inString) {
                targetJson += ": ";
              } else {
                targetJson += currentChar;
              }
              break;
            case ' ':
            case "\n":
            case "\t":
              if (inString) {
                targetJson += currentChar;
              }
              break;
            case '"':
              if (i > 0 && json.charAt(i - 1) !== '\\') {
                inString = !inString;
              }
              targetJson += currentChar;
              break;
            default:
              targetJson += currentChar;
              break;
          }
        }
        return targetJson;
      }
    },

    mounted() {
    }
  }
</script>

<style lang="less">
  .json-format {
    .wv100 {
      width: 100%;
    }
  }
</style>

