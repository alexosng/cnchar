const tradDict = require('./trad-simple.json');
const sparkDict = require('./spark-simple.json');

const type = {trad: 'trad', simple: 'simple', spark: 'spark'};

function convert (str, to, from) {
    if (typeof to === 'undefined' || !type[to]) {
        throw new Error('convert 参数类型错误： to=' + to);
    }
    if (typeof from === 'undefined' || !type[from]) {
        throw new Error('convert 参数类型错误： from=' + from);
    }
    let toDict = '', fromDict = '';
    if (to === type.simple) {
        if (from === type.trad) { // 繁体 => 简体
            toDict = tradDict.simple;
            fromDict = tradDict.trad;
        } else { // 火星 => 简体
            toDict = sparkDict.simple;
            fromDict = sparkDict.spark;
        }
    } else if (to === type.trad) {
        if (from === type.simple) { // 简体 => 繁体
            toDict = tradDict.trad;
            fromDict = tradDict.simple;
        } else { // 火星 => 繁体
            return convert(convert(str, type.simple, type.spark), type.trad, type.simple);
        }
    } else {
        if (from === type.trad) { // 繁体 => 火星
            return convert(convert(str, type.simple, type.trad), type.spark, type.simple);
        } else { // 简体 => 火星
            toDict = sparkDict.spark;
            fromDict = sparkDict.simple;
        }
    }
    let res = '';
    for (var i = 0; i < str.length; i++) {
        let index = fromDict.indexOf(str[i]);
        res += ((index !== -1) ? toDict[index] : str[i]);
    }
    return res;
}

module.exports = {
    type: type,
    simpleToTrad: function (str) { return convert(str, type.trad, type.simple); },
    simpleToSpark: function (str) { return convert(str, type.spark, type.simple); },
    tradToSimple: function (str) { return convert(str, type.simple, type.trad); },
    tradToSpark: function (str) { return convert(str, type.spark, type.trad); },
    sparkToSimple: function (str) { return convert(str, type.simple, type.spark); },
    sparkToTrad: function (str) { return convert(str, type.trad, type.spark); }
};
