module.exports = {
    mode: "production",
    entry: {
         "prac2-1": './src/prac2-1.js',
         "prac2-2": './src/prac2-2.js',
         "prac2-3": './src/prac2-3.js',
         "prac2-4": './src/prac2-4.js',
         "prac2-5": './src/prac2-5.js',
    },
    devServer: {
        writeToDisk: true
    }
};