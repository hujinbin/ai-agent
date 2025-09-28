const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProduction = argv.mode === 'production';
  
  // 基本配置，将被不同的构建目标扩展
  const baseConfig = {
    entry: './src/ai-agent.ts',
    mode: isProduction ? 'production' : 'development',
    resolve: {
      extensions: ['.ts', '.js']
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env']
              }
            },
            {
              loader: 'ts-loader'
            }
          ]
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        }
      ]
    },
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
          terserOptions: {
            format: {
              comments: false,
            },
          },
        }),
      ],
    },
    devtool: isProduction ? false : 'source-map',
  };

  // 开发服务器配置
  if (!isProduction) {
    return {
      ...baseConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ai-agent.js',
        library: 'AIAgent',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'this'
      },
      devServer: {
        static: {
          directory: path.join(__dirname, 'dist'),
        },
        hot: true,
        port: 9000,
        open: true,
      },
      plugins: [
        new HtmlWebpackPlugin({
          template: './dev/index.html',
          filename: 'index.html',
          inject: 'head'
        })
      ]
    };
  }
  
  // 生产环境下创建多种格式
  return [
    // UMD版本 - 用于浏览器和Node.js
    {
      ...baseConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ai-agent.js',
        library: 'AIAgent',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'this'
      },
    },
    // 压缩的UMD版本
    {
      ...baseConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ai-agent.min.js',
        library: 'AIAgent',
        libraryTarget: 'umd',
        libraryExport: 'default',
        umdNamedDefine: true,
        globalObject: 'this'
      },
    },
    // ESM版本 - 用于支持ES模块的环境
    {
      ...baseConfig,
      output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ai-agent.esm.js',
        library: {
          type: 'module'
        },
        libraryExport: 'default',
        module: true,
        environment: {
          module: true,
        },
      },
      experiments: {
        outputModule: true,
      },
    }
  ];
};