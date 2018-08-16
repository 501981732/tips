/**
 *返回两个日期之间的差异
 *@param{Date} start time
 *@param{Date} end time
 *@return{Number} 
 */ 
const getDaysDiffBetweenDates = (dateInitial, dateFinal) => (dateFinal - dateInitial) / (1000 * 3600 * 24);
// getDaysDiffBetweenDates(new Date("2017-12-13"), new Date("2017-12-22")) -> 9



// 使用Date(), 将 JSON 格式的日期转换为可读格式 (dd/mm/yyyy日)).
const JSONToDate = arr => {
const dt = new Date(parseInt(arr.toString().substr(6)));
return `${ dt.getDate() }/${ dt.getMonth() + 1 }/${ dt.getFullYear() }`
};
// JSONToDate(/Date(1489525200000)/) -> "14/3/2017"


/**
 *将日期从美国格式转换为英文格式
 *@param{String} 09/21/2010
 *@return{String} 21/09/2010
 */ 

const toEnglishDate  = (time) =>
{try{return new Date(time).toISOString().split('T')[0].replace(/-/g, '/')}catch(e){return}};
// toEnglishDate('09/21/2010') -> '21/09/2010'