### Cli 升级手册


### `build/webpack.base.conf.js`

添加`.json`,`.less`的loader. png的limit设为1（因为富文本编辑框中的图片必须是地址。）

```
{
    test: /\.json$/,
    loader: 'json-loader'
},
{
    test: /\.less$/,
    use: [
        'style-loader',
        {loader: 'css-loader', options: {importLoaders: 1}},
        'less-loader'
    ]
},
{
    test: /\.less$/,
    use: ["style-loader", "css-loader", "sass-loader"]
},
{
    test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
        limit: 1,
        name: utils.assetsPath('img/[name].[hash:7].[ext]')
    }
}


```

### `build/webpack.dev.conf.js`

添加favicon

```
new HtmlWebpackPlugin({
   ...
  favicon: 'src/common/assets/img/logo.png'
})

```

### `build/webpack.prod.conf.js`

添加favicon

```

new HtmlWebpackPlugin({
    ...
    favicon: 'src/common/assets/img/logo.png'
})

```


### `类名不要压缩掉了`

`UglifyJsPlugin`配置处添加

```
mangle: {
		    except: ['$super', '$', 'exports', 'require', 'angular'],
		    keep_fnames: true
	    }
```
最终效果：

```
new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      sourceMap: true,
	    mangle: {
		    except: ['$super', '$', 'exports', 'require', 'angular'],
		    keep_fnames: true
	    }
    })
 ```

### `config/index.js`

添加两个loaders，端口改为需要的,移除一个打印警告。

```
delete process.env["DEBUG_FD"];


module: {
    loaders: [
        {
            test: /\.scss$/,
            loaders: ["style", "css", "sass"]
        },
        {
            test: /\.less$/,
            loader: "style!css!less"
        }
    ]
},
port: 8200

```

## 以下内容是 package.json中的dev部分

### 启用less支持

1. `npm install --save-dev less-loader less`


2. `webpack.config.js`


``` javascript

module.exports = {
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'less-loader'
        ]
      }
    ]
  }
}


```

### 启用imports-loader

1. `npm install --save-dev imports-loader`

在select2有用到


### 添加 babel-preset-es2015

升级之后 babel-preset-es2015好像没有了

1. `npm install --save-dev babel-preset-es2015`