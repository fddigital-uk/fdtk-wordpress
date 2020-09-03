const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const postcssPresetEnv = require("postcss-preset-env");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const devMode = process.env.NODE_ENV !== "production";

// const frontEndStyles = new MiniCssExtractPlugin({
//   filename: "blocks.styles.build.css",
//   chunkFilename: "blocks.styles.[id].chunk.css"
// });
//
// const editorStyles = new MiniCssExtractPlugin({
//   filename: "blocks.editor.build.css",
//   chunkFilename: "blocks.editor.[id].chunk.css"
// });
//
// const plugins = [frontEndStyles, editorStyles];

const scssUse = [
  MiniCssExtractPlugin.loader,
  {
    loader: "css-loader"
  },
  {
    loader: "sass-loader",
    options: {
      additionalData: "@import \"./src/blocks/common.scss\";\n"
    }
  },
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [postcssPresetEnv(/* pluginOptions */)]
    }
  }
];

const excludePaths = [
  path.resolve(__dirname, "node_modules"),
  path.resolve(__dirname, "build"),
  path.resolve(__dirname, "vendor")
];

module.exports = {
  ...defaultConfig,
  context: __dirname,
  devtool: devMode ? "inline-sourcemap" : false,
  mode: devMode ? "development" : "production",
  entry: {
    blocks: "./src/blocks/index.js"
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].build.js"
  },
  // optimization: {
  //   ...defaultConfig.optimization,
  //   splitChunks: {
  //     ...defaultConfig.optimization.splitChunks,
  //     cacheGroups: {
  //       ...defaultConfig.optimization.splitChunks.cacheGroups,
  //       editor: {
  //         name: "editor",
  //         test: /editor\.scss$/,
  //         chunks: "all",
  //         enforce: true
  //       },
  //       styles: {
  //         name: "styles",
  //         test: /styles\.scss$/,
  //         chunks: "all",
  //         enforce: true
  //       }
  //     }
  //   }
  // },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: excludePaths,
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              presets: ["@babel/preset-react"], // -- Prod?
            }
          }
        ]
      },
      {
        test: /(editor)|(styles)\.scss/,
        exclude: excludePaths,
        use: scssUse
      },
      // {
      //   test: /styles\.scss/,
      //   exclude: excludePaths,
      //   use: scssUse
      // }
    ]
  },
  plugins: [
    ...defaultConfig.plugins,
    new MiniCssExtractPlugin({
      moduleFilename: (props) => {
        console.log("CALLED");
        return "blocks.[name].build.css";
      }
    })
  ]
};
