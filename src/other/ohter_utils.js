/**
 * 第一个非null/undefined的参数
 */
const  coalesce = (...arg) => arg.find(i => ![null,undefined].includes(i))


const coalesceFactory = valid => (...args) => args.find(valid);
// const customCoalesce = coalesceFactory(_ => ![null, undefined, "", NaN].includes(_))
// customCoalesce(undefined, null, NaN, "", "Waldo") //-> "Waldo"


/**
 * 返回类型
 */

const getType = v => v === 'undefined' ? undefined : v === null ? null : v.constructor.name.toLowerCase();
// getType(new Set([1,2,3])) -> "set"

/**
 * hexToRGB
 * 将 colorcode 转换为rgb()字符串。
 */
const hexToRgb = hex => {
const extendHex = shortHex =>
'#' + shortHex.slice(shortHex.startsWith('#') ? 1 : 0).split('').map(x => x+x).join('');
const extendedHex = hex.slice(hex.startsWith('#') ? 1 : 0).length === 3 ? extendHex(hex) : hex;
return `rgb(${parseInt(extendedHex.slice(1), 16) >> 16}, ${(parseInt(extendedHex.slice(1), 16) & 0x00ff00) >> 8}, ${parseInt(extendedHex.slice(1), 16) & 0x0000ff})`;
}
// hexToRgb('#27ae60') -> 'rgb(39, 174, 96)'
// hexToRgb('#acd') -> 'rgb(170, 204, 221)'


const isArray = v => !!v &&Array.isArray(val)

const isBoolean = v => typeof v === 'boolean'

const ifFunction = v => v && typeof v === 'function'

const isNumber = v => v && typeof v === 'number'

const isString = val => typeof val === 'string'

const isSymbol = val => typeof val === 'symbol';



/**
 * 测函数执行时间
 * @Author   wm
 * @DateTime 2018-09-05
 * @param    {Function} callback [description]
 * @return   {[type]}            [description]
 */
const timeTaken = callback => {
console.time('timeTaken');  const r = callback();
console.timeEnd('timeTaken');  return r;
};


/**
 * 
 */
const toOrdinalSuffix = num => {
const int = parseInt(num), digits = [(int % 10), (int % 100)],
ordinals = ['st', 'nd', 'rd', 'th'], oPattern = [1, 2, 3, 4],
tPattern = [11, 12, 13, 14, 15, 16, 17, 18, 19];
return oPattern.includes(digits[0]) && !tPattern.includes(digits[1]) ? int + ordinals[digits[0] - 1] : int + ordinals[3];
};
// toOrdinalSuffix("123") -> "123rd"

/**
 * 生成 UUID。使用cryptoAPI 生成 UUID, 符合RFC4122版本4。
 * @Author   wm
 * @DateTime 2018-09-05
 * @return   {[type]}   [description]
 */
const UUIDGenerator = () =>
([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
);



