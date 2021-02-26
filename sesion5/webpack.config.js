module.exports = {
    mode: "production",
    entry: {
         "prac5-1": './src/prac5-1.js',
         "prac5-2": './src/prac5-2.js',

    },
    devServer: {
        writeToDisk: true
    },
    module: {
        rules: [
          {
            test: /\.glsl$/,
            use: {
              loader: 'webpack-glsl-loader'
            }
          }
        ]
      }
};