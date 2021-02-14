module.exports = {
    mode: "production",
    entry: {
         "prac3-1": './src/prac3-1.js',
         "prac3-2": './src/prac3-2.js',
         "prac3-3": './src/prac3-3.js',
         "prac3-4": './src/prac3-4.js',
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