const path = require("path");
const defaultConfig = require("@wordpress/scripts/config/webpack.config");
const postcssPresetEnv = require("postcss-preset-env");

const devMode = process.env.NODE_ENV !== "production";

const scssUse = [
  {
    loader: "file-loader",
    options: {
      name: "blocks.[name].build.css",
    },
  },
  {
    loader: "extract-loader",
  },
  {
    loader: "css-loader",
  },
  {
    loader: "sass-loader",
  },
  {
    loader: "postcss-loader",
    options: {
      ident: "postcss",
      plugins: () => [postcssPresetEnv(/* pluginOptions */)]
    }
  }
];

module.exports = {
  ...defaultConfig,
  context: __dirname,
  devtool: devMode ? "inline-sourcemap" : false,
  mode: devMode ? "development" : "production",
  entry: {
    blocks: "./src/blocks/index.js",
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].build.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "build"),
          path.resolve(__dirname, "vendor"),
        ],
        use: [
          {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              //presets: ["@babel/preset-react"], -- Prod?
            },
          },
        ],
      },
      {
        test: /editor\.scss/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "build"),
          path.resolve(__dirname, "vendor"),
        ],
        use: scssUse,
      },
      {
        test: /styles\.scss/,
        exclude: [
          path.resolve(__dirname, "node_modules"),
          path.resolve(__dirname, "build"),
          path.resolve(__dirname, "vendor"),
        ],
        use: scssUse,
      },
    ],
  },
};
