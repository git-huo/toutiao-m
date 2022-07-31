module.exports = {
    plugins: {
        'postcss-pxtorem': {
            //根节点的rem大小
            //rootValue: 37.5

            //如果不是vant的文件37.5
            //如果不是，75
            rootValue: ({ file }) => (/vant/i.test(file) ? 37.5 : 75),

            // rootValue: 37.5,
            propList: ['*']
        }
    }
}