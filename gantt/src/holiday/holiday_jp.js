//import * as holidays from './holidays.js';
import * as hd from './holidays.js';
import format from './format.js';

//export default  holiday_jp;

export function between(start, last) {
    var selected = [];
    var d;
    start = new Date(format(start));
    last = new Date(format(last));
    Object.keys(holidays).forEach(function (date) {
      d = new Date(holidays[date]['date']);
      if (start <= d && d <= last) {
        holidays[date]['date'] = d;
        selected.push(holidays[date]);
      }
    });
    return selected;
  };

export default function isHoliday(date) {
    //console.log("isHolidays");
    //console.log(hd.holidays);
    
    if (date instanceof Date) {
      date = format(date);
    }
    if (hd.holidays[date]) {
    //if (holidays.hasOwnProperty(date) ) {
      return true;
    }
    return false;
};

//module.exports = holiday_jp;
