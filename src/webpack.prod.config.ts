import * as path from "path"
import * as webpack from "webpack"
import { projectCwd, getDllName, getDllDir, getProjectConfig, cliCwd } from './utils/webpack-runtime-helper'
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin'

// 项目配置
const projectConfig = getProjectConfig()

const webpackConfig = {
  entry: projectConfig.entrys,

  output: {
    path: path.join(projectCwd, "build"),
    filename: "bundle.js",
    libraryTarget: "umd"
  },

  module: {
    rules: [
      {
        test: /\.(jsx|js)?$/,
        exclude: [/node_modules/],
        use: ['babel-loader']
      }, {
        test: /\.(tsx|ts)?$/,
        exclude: [/node_modules/],
        use: ['babel-loader', 'ts-loader']
      }, {
        test: /\.json$/,
        use: ['json-loader']
      }, {
        test: /\.md$/,
        use: ['text-loader']
      }
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("production")
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new UglifyJSPlugin(),
  ],

  resolve: {
    modules: [
      path.join(projectCwd),
      path.join(projectCwd, 'node_modules'),
      'node_modules'
    ],
    extensions: ['.js', '.jsx', '.ts', '.tsx']
  },

  performance: {
    // 关闭性能提示
    hints: false,
  }
}

export default webpackConfig
