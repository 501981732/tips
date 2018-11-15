/**
 * 验证邮箱
 * @Author   wm
 * @DateTime 2018-09-05
 * @param    {string}   str [description]
 * @return   {boolean}       [description]
 */
const validateEmail = str => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(str);

/**
 * 验证数字
 * @Author   wm
 * @DateTime 2018-09-05
 * @param    {[type]}   n [description]
 * @return   {[type]}     [description]
 */
const validateNumber = n => !isNaN(parseFloat(n)) && isFinite(n) && Number(n) == n;

/**
 * 验证电话
 * @Author   wm
 * @DateTime 2018-09-05
 * @param    {[type]}   n [description]
 * @return   {[type]}     [description]
 */
const validataPhone = (n) => /^[1][3,4,5,7,8,9][0-9]{9}$/.test(n);

const validataFixedLineTelephone = (n) => /\d{2,5}-\d{7,8}/.test(n);
