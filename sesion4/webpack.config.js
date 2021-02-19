module.exports = {
    mode: "production",
    entry: {
         "prac4-1": './src/prac4-1.js',
         "prac4-2": './src/prac4-2.js',
         "prac4-3": './src/prac4-3.js',
         "prac4-4": './src/prac4-4.js',

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