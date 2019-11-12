require('./check-versions')()

var config = require('../config')
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

var opn = require('opn')
var path = require('path')
var express = require('express')
var webpack = require('webpack')
var proxyMiddleware = require('http-proxy-middleware')
var webpackConfig = process.env.NODE_ENV === 'testing'
  ? require('./webpack.prod.conf')
  : require('./webpack.dev.conf')

// default port where dev server listens for incoming traffic
var port = process.env.PORT || config.dev.port
// automatically open browser, if not set will be false
var autoOpenBrowser = !!config.dev.autoOpenBrowser
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware
var proxyTable = config.dev.proxyTable

var app = express()
var compiler = webpack(webpackConfig)

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: webpackConfig.output.publicPath,
  quiet: true
})

var hotMiddleware = require('webpack-hot-middleware')(compiler, {
  log: () => {}
})
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

// proxy api requests
Object.keys(proxyTable).forEach(function (context) {
  var options = proxyTable[context]
  if (typeof options === 'string') {
    options = { target: options }
  }
  app.use(proxyMiddleware(options.filter || context, options))
})

// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')())

// serve webpack bundle output
app.use(devMiddleware)

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware)

// serve pure static assets
var staticPath = path.posix.join(config.dev.assetsPublicPath, config.dev.assetsSubDirectory)
app.use(staticPath, express.static('./static'))

//var uri = 'http://localhost:' + port
//nginx反向代理后的域名
//var uri = "http://nb.com/by"
var uri = "http://localhost:8200/by"

var _resolve
var readyPromise = new Promise(resolve => {
  _resolve = resolve
})

console.log('> Starting dev server...')
devMiddleware.waitUntilValid(() => {
  console.log('> Listening at ' + uri + '\n')
  // when env is testing, don't need open it
  if (autoOpenBrowser && process.env.NODE_ENV !== 'testing') {
    opn(uri)
  }
  _resolve()
})

var server = app.listen(port)

module.exports = {
  ready: readyPromise,
  close: () => {
    server.close()
  }
}



////////////////////////////以下
var chokidar = require('chokidar');
var fs = require('fs');

var watcher = chokidar.watch(process.cwd() + "/src/common/model", {
    ignoreInitial: true,
    interval: 100
  }
);

function refreshModels_() {
  console.log("Refresh Models_...");
  //定义一个遍历函数
  function walk(dir) {
    var children = [];
    fs.readdirSync(dir).forEach(function(filename){
      var path = dir+"/"+filename;
      var stat = fs.statSync(path);
      if (stat && stat.isDirectory()) {
        children = children.concat(walk(path))
        }
      else {
        children.push(path)
      }
    });
    return children
  }
  //循环数组生成文件内容
  var list = walk(process.cwd() + "/src/common/model");

  var w_data_object = '\r\nlet models = {\r\n';
  var w_data_object_end = '};\r\n' + "export default models\r\n";
  var w_data = '/*\r\n';
  w_data += '该文件属于自动生成,请勿手动修改\r\n';
  w_data += ' */\r\n';
  for(var i = 1;i<list.length;i++ ) {
    var className = list[i].substring(list[i].lastIndexOf("/") + 1, list[i].lastIndexOf("."));
    if(className.endsWith("Type") || className.endsWith("Status") || className === 'Action') {
      //KeeperBusinessType 比较特殊！！
      if(className !== 'KeeperBusinessType') {
        continue;
      }
    }
    list[i] = ".." + list[i].substring(list[i].indexOf("/model"), list[i].lastIndexOf("."));
    w_data += "import " + className + " from \"" + list[i] + "\"" + "\r\n";

    if(i === list.length - 1) {
      w_data_object += "  " + className + ": " + className + "\r\n";
    } else {
      w_data_object += "  " + className + ": " + className + ",\r\n";
    }

  }

  fs.writeFile(process.cwd() + "/src/common/model_/models.js",
    w_data + w_data_object + w_data_object_end,
    function (err) {
      if(err) {
        console.error(err);
      }
      else {
        console.log('Refresh Success!');
      }
    });
}

watcher.on('unlink', function(event, path) {
  console.log(event + path);
  refreshModels_();
});
watcher.on('add', function(event, path) {
  console.log(event + path);
  refreshModels_();
});





//https://www.npmjs.com/package/chokidar
// Node.js fs.watch:
//   •不会再OSX上显示文件名
//   •当你在OSX用编辑器编辑文件的时候不会触发事件
//   •经常会连续触发两次事件
//   •没有提供一个好的接口去递归文件
//   •等等
// Node.js fs.watchFile:
//   •经常在处理事件的时候会挂掉
//   •没法递归文件
//   •过高的CPU占用率
////////////////////////////以上
