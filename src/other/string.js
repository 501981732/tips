/**
 * 集合
 * 生成字符串的所有字谜 (包含重复项)。
 */
const anagrams = str => {
    if (str.length <= 2) return str.length === 2 ? [str, str[1] + str[0]] : [str];
    return str.split('').reduce((acc, letter, i) =>
        acc.concat(anagrams(str.slice(0, i) + str.slice(i + 1)).map(val => letter + val)), []);
};

/**
 * Capitalize
 * 将字符串的第一个字母大写。
 */
const capitalize = ([first,...rest],lowerRest = false) => first.toUpperCase() + (lowerRest ? rest.join('').toLowerCase() : rest.join(''));

/**
 * 将字符串中每个单词的首字母大写。
 */
const capitalizeEveryWord = str => str.replace(/\b[a-z]/g, char => char.toUpperCase());

/**
 * 转义要在正则表达式中使用的字符串。
 */
const escapeRegExp = str => str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// escapeRegExp('(test)') -> \\(test\\)

/**
 * 从匹配转换字符串。
 */
const fromCamelCase = (str, separator = '_') =>
str.replace(/([a-z\d])([A-Z])/g, '$1' + separator + '$2')
.replace(/([A-Z]+)([A-Z][a-z\d]+)/g, '$1' + separator + '$2').toLowerCase();
// fromCamelCase('someDatabaseFieldName', ' ') -> 'some database field name'
// fromCamelCase('someLabelThatNeedsToBeCamelized', '-') -> 'some-label-that-needs-to-be-camelized'
// fromCamelCase('someJavascriptProperty', '_') -> 'some_javascript_property'

/**
 * 将字符串转换为匹配。
 */
const toCamelCase = str =>
str.replace(/^([A-Z])|[\s-_]+(\w)/g, (match, p1, p2, offset) =>  p2 ? p2.toUpperCase() : p1.toLowerCase());
// toCamelCase("some_database_field_name") -> 'someDatabaseFieldName'
// toCamelCase("Some label that needs to be camelized") -> 'someLabelThatNeedsToBeCamelized'
// toCamelCase("some-javascript-property") -> 'someJavascriptProperty'
// toCamelCase("some-mixed_string with spaces_underscores-and-hyphens") -> 'someMixedStringWithSpacesUnderscoresAndHyphens'

/**
 * 翻转字符串
 */
const reverseString = str => [...arr] => arr.reverse().join()

/**
 * 按字母顺序对字符串中的字符进行排序。
 */
const sortCharactersInString = str => str.split('').sort((a,b) => a.localeCompare(b)).join('')

/**
 * 将字符串截断为指定长度。
 */
const truncateString = (str, num) => str.length > num ? str.slice(0, num > 3 ? num - 3 : num) + '...' : str;
// truncateString('boomerang', 7) -> 'boom...'











