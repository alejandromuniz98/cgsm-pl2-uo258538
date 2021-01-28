module.exports = {
    mode: "production",
    entry: {
        "prac1-1": './src/prac1-1.js',
        "prac1-2": './src/prac1-2.js',
        "prac1-3": './src/prac1-3.js',
        "prac1-4": './src/prac1-4.js'
      },
    devServer: {
        writeToDisk: true
    }
};