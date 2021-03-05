module.exports = {
    mode: "production",
    entry: {
         "prac6-1": './src/prac6-1.js',
         "prac6-2": './src/prac6-2.js',
         "prac6-3": './src/prac6-3.js',
         "prac6-4": './src/prac6-4.js',
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