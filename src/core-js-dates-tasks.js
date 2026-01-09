/** ********************************************************************************************
 *                                                                                             *
 * Please read the following tutorial before implementing tasks:                               *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date       *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Numbers_and_dates#date_object *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl       *
 *                                                                                             *
 ********************************************************************************************* */

/**
 * By the passed date returns the number of seconds elapsed since 00:00 01.01.1970.
 *
 * @param {string} date - date and time.
 * @return {number} milliseconds in timestamp.
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 0
 * '04 Dec 1995 00:12:00 UTC' => 818035920000
 */
function dateToTimestamp( date ) {  
  return new Date(date).valueOf();
}

/**
 * Returns the time in hh:mm:ss format from the received date.
 *
 * @param {Date} date - date.
 * @return {string} time in hh:mm:ss format.
 *
 * @example:
 * Date(2023, 5, 1, 8, 20, 55) => '08:20:55'
 * Date(2015, 10, 20, 23, 15, 1) => '23:15:01'
 */
function getTime( date ) {  
  return date.toLocaleTimeString();
}

/**
 * Returns the name of the day of the week for a given date string.
 *
 * @param {string} date - date and time.
 * @return {string} the name of the day of the week
 *
 * @example:
 * '01 Jan 1970 00:00:00 UTC' => 'Thursday'
 * '03 Dec 1995 00:12:00 UTC' => 'Sunday'
 * '2024-01-30T00:00:00.000Z' => 'Tuesday'
 */
function getDayName( date ) {  
  return new Date(date).toLocaleDateString("en-US", {weekday: "long"});
}

/**
 * Returns the date of the next Friday from a given date.
 *
 * @param {Date} date
 * @return {Date}
 *
 * @example:
 * Date('2024-02-03T00:00:00Z') => Date('2024-02-09T00:00:00Z')
 * Date('2024-02-13T00:00:00Z') => Date('2024-02-16T00:00:00Z')
 * Date('2024-02-16T00:00:00Z') => Date('2024-02-23T00:00:00Z')
 */
function getNextFriday( date ) {    
  let dayName = date.getDay();
  let day = date.getDate();
  date.setDate(++day);
  dayName = date.getDay();
  while(dayName !== 5){
    date.setDate(day++);
    dayName = date.getDay();
  }
  return date;
}

/**
 * Returns the number of days in a specified month and year.
 *
 * @param {number} month - The month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The year as a four-digit number.
 * @return {number}
 *
 * @example:
 * 1, 2024 => 31
 * 2, 2024 => 29
 */
function getCountDaysInMonth( month, year ) {  
  return new Date(year, month, 0).getDate();
}

/**
 * Returns the total number of days between two dates, including both the start and end dates.
 *
 * @param {string} dateStart - The start date of the period in ISO 8601 format.
 * @param {string} dateEnd - The end date of the period in ISO 8601 format.
 * @return {number} - The total count of days in the period.
 *
 * @example:
 * '2024-02-01T00:00:00.000Z', '2024-02-02T00:00:00.000Z'  => 2
 * '2024-02-01T00:00:00.000Z', '2024-02-12T00:00:00.000Z'  => 12
 */
function getCountDaysOnPeriod( dateStart, dateEnd ) {  
  return (new Date(dateEnd).valueOf() - new Date(dateStart).valueOf())/(1000*60*60*24) + 1;
}

/**
 * Returns true if a given date is within a specified range, including both the start and end dates.
 *
 * @typedef {{
 * start: string, // The start date in ISO 8601 format (e.g., 'YYYY-MM-DD').
 * end: string    // The end date in ISO 8601 format.
 * }} DatePeriod
 *
 * @param {string} date - The date to check, in ISO 8601 format.
 * @param {DatePeriod} period - The period to check against.
 * @return {boolean} - True if the date is within the range, false otherwise.
 *
 * @example:
 * '2024-02-01', { start: '2024-02-02', end: '2024-03-02' } => false
 * '2024-02-02', { start: '2024-02-02', end: '2024-03-02' } => true
 * '2024-02-10', { start: '2024-02-02', end: '2024-03-02' } => true
 */
function isDateInPeriod( date, period ) {  
  let obj = new Date(date);
  return obj.valueOf() >= new Date(period.start).valueOf() && obj.valueOf() <= new Date(period.end).valueOf();
}

/**
 * Returns the date formatted in 'M/D/YYYY, hh:mm:ss a'.
 *
 * @param {string} date - The date to be formatted, in ISO 8601 format (e.g., 'YYYY-MM-DDTHH:mm:ss.sssZ').
 * @return {string} - The date formatted in 'Month/Day/Year, Hour:Minute:Second AM/PM'.
 *
 * @example:
 * '2024-02-01T15:00:00.000Z' => '2/1/2024, 3:00:00 PM'
 * '1999-01-05T02:20:00.000Z' => '1/5/1999, 2:20:00 AM'
 * '2010-12-15T22:59:00.000Z' => '12/15/2010, 10:59:00 PM'
 */
function formatDate( date ) {  
  const options = {
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZone: "Africa/Dakar",    
  };
  return new Date(date).toLocaleDateString("en-US", options);
}

/**
 * Returns the total number of weekend days (Saturdays and Sundays) in a specified month and year.
 *
 * @param {number} month - The source month as a number (1 for January, 2 for February, etc.).
 * @param {number} year - The source year as a four-digit number.
 * @return {number} - The total count of weekend days in the month.
 *
 * @example:
 * 5, 2022 => 9
 * 12, 2023 => 10
 * 1, 2024 => 8
 */
function getCountWeekendsInMonth( month, year ) {    
  let count = 0;
  let days = new Date(year, month, 0).getDate();
  console.log(days);
  let date = new Date(year, month-1);  
  for(let i=2;i<=days;i++){    
    if(date.getDay() === 0 || date.getDay() === 6)
      count++;
    date.setDate(i);
  }
  if(date.getDay() === 0 || date.getDay() === 6)
    count++;
  return count;
}

/**
 * Returns the week number of the year for a given date.
 * The first week is the one that falls on January 1.
 * The first day of the week is Monday.
 *
 * @param {Date} date - The date for which to find the week number.
 * @return {number} - The week number of the year.
 *
 * @example:
 * Date(2024, 0, 3) => 1
 * Date(2024, 0, 31) => 5
 * Date(2024, 1, 23) => 8
 */
function getWeekNumberByDate( date ) {
  //throw new Error('Not implemented');
  /*const year = date.getFullYear();
  const start = new Date(year, 0, 0).valueOf();
  const end = date.valueOf();
  const days = (end - start)/(1000*60*60*24);
  console.log(days);  
  //return  new Date(year, 0, 1).getDay() === 1 ? Math.trunc(days/7) + 1 : Math.trunc(days/7) + 2;
  return days/7 < 1 ? Math.trunc(days/7) + 1 : Math.trunc(days/7);*/
  const year = date.getFullYear();
  const month = date.getMonth();
  let d = new Date(year, 0, 1);
  let dayName = d.getDay();
  let count = dayName != 1 ? 1 : 0;
  console.log(count, dayName);
  /*if(month === 0){  
  let days = date.getDate();
  for(let i=2;i<=days;i++){
    //d.setDate(i);
    if(d.getDay() === 1)
      count++;
    d.setDate(i);
  }
  if(d.getDay() === 1)
    count++;
  }*/  
  //else{
    //d = new Date(year, 0, 1);
    for(let i=0;i<month;i++){
      d = new Date(year, i, 1);
      //if(d.getDay() > 1)
        //count++;
      days = new Date(year, i+1, 0).getDate();
      //d.setMonth(i);
      
      for(let j=2;j<=days;j++){
        //d.setDate(j);
        if(d.getDay() === 1)
          count++;
        d.setDate(j);
      }
      if(d.getDay() === 1)
        count++;
      //d = new Date(year, i, 1);
      //d.setMonth(i);
      console.log(count);
    }
    days = date.getDate();
    d = new Date(year, month, 1);
    //if(d.getDay() > 1)
      //count++;
    for(let j=2;j<=days;j++){
      //d.setDate(j);
      if(d.getDay() === 1)
        count++;
      d.setDate(j);
    }
    if(d.getDay() === 1)
      count++;
  //}
  return count;
}

/**
 * Returns the date of the next Friday the 13th from a given date.
 * Friday the 13th is considered an unlucky day in some cultures.
 *
 * @param {Date} date - The starting date to search from.
 * @return {Date} - The date of the next Friday the 13th.
 *
 * @example:
 * Date(2024, 0, 13) => Date(2024, 8, 13)
 * Date(2023, 1, 1) => Date(2023, 9, 13)
 */
function getNextFridayThe13th( date ) {  
  let copy = new Date(date.valueOf());
  let day = date.getDate();  
  let days = new Date(date.getFullYear(), date.getMonth()+1, 0).getDate();
  for(let i=day+1;i<=days;i++){
    date.setDate(i);
    let dayName = date.getDay();   
    if(dayName === 5 && i === 13)
      return date;
  }
  let month = copy.getMonth();  
  for(let i=month+1;i<11;i++){
    let days = new Date(copy.getFullYear(), copy.getMonth(), 0).getDate();
    copy.setMonth(i);    
    for(let j=1;j<=days;j++){
      copy.setDate(j);
      let dayName = copy.getDay();      
      if(dayName === 5 && j === 13)
        return copy;
    }
  }
}

/**
 * Returns the quarter of the year for a given date.
 *
 * @param {Date} date - The date for which to find the quarter.
 * @return {number} - The quarter of the year (1-4).
 *
 * @example:
 * Date(2024, 1, 13) => 1
 * Date(2024, 5, 1) => 2
 * Date(2024, 10, 10) => 4
 */
function getQuarter( date ) {  
  const year = date.getFullYear();
  const quarter = new Date(year, 2, 31).valueOf();
  console.log(quarter, date.valueOf());  
  if(date.valueOf() <= quarter)
    return 1;
  else if(date.valueOf() > quarter && date.valueOf() <= new Date(year, 5, 31).valueOf())
    return 2;
  else if(date.valueOf() > new Date(year, 5, 31).valueOf() && date.valueOf() <= new Date(year, 8, 31).valueOf())
    return 3;
  else
    return 4;
}

/**
 * Generates an employee's work schedule within a specified date range, based on a pattern of working and off days.
 * The start and end dates of the period are inclusive.
 *
 * @typedef {{
 * start: string, // The start date in 'DD-MM-YYYY' format.
 * end: string    // The end date in 'DD-MM-YYYY' format.
 * }} DatePeriod
 *
 * @param {DatePeriod} period - The start and end dates of the period.
 * @param {number} countWorkDays - The number of consecutive working days.
 * @param {number} countOffDays - The number of consecutive days off.
 * @return {Array<string>} - An array of dates in 'DD-MM-YYYY' format representing the work schedule.
 *
 * @example:
 * { start: '01-01-2024', end: '15-01-2024' }, 1, 3 => ['01-01-2024', '05-01-2024', '09-01-2024', '13-01-2024']
 * { start: '01-01-2024', end: '10-01-2024' }, 1, 1 => ['01-01-2024', '03-01-2024', '05-01-2024', '07-01-2024', '09-01-2024']
 */
function getWorkSchedule( period, countWorkDays, countOffDays ) {
  //throw new Error('Not implemented');
  let schedule = [];
  let sch = [];
  let start = Number(period.start.split("-")[0]);
  let end = Number(period.end.split("-")[0]);
  let year = Number(period.end.split("-")[2]);
  let month = period.end.split("-")[1];
  let monthStart = period.start.split("-")[1];
  let count = 0;
  monthStart = monthStart[0] == 0 ? Number(monthStart) - 1 : Number(monthStart); 
  month = month[0] == "0" ? Number(month) - 1 : Number(month);
  let days = new Date(year, month+1,0).getDate();
  let d = new Date(year, month, 1);
  for(let i=monthStart;i<month;i++){
    //count = 0;
    d = new Date(year, i, start);
    days = new Date(year, i+1, 0).getDate();
    for(let j=start;j<=days;j++){
      /*count++;
      if(count > countWorkDays){
        count = 0;
        j = j + countOffDays;
      }*/
      schedule.push(String(j).padStart(2,"0") + "-" + String(i>=10 ? i : i+1).padStart(2, "0") + "-" + year);
      //d.setDate(j);
      count++;
      if(count >= countWorkDays){
        count = 0;
        j = j + countOffDays;
        if(j > days)
          start = start + (j - days);
      }  
    }
    //return schedule;
  }
  //if(schedule.length != 0)
    //return schedule;
  for(let i=start;i<=end;i++){
    //if(d.getDay() == 0)
      //continue;
    /*count++;
    if(count >= countWorkDays){
      count = 0;
      i = i + countOffDays;
    }*/  
    sch.push(String(i).padStart(2,"0") + "-" + String(month>=10 ? month : month+1).padStart(2, "0") + "-" + year);
    //d.setDate(i);
    count++;
    if(count >= countWorkDays){
      count = 0;
      i = i + countOffDays;
    }  
    console.log(i);
  }
  return schedule.concat(sch);
}

/**
 * Determines whether the year in the provided date is a leap year.
 * A leap year is a year divisible by 4, but not by 100, unless it is also divisible by 400.
 *
 * @param {Date} date - The date from which the year will be checked.
 * @return {boolean} - True if the year is a leap year, false otherwise.
 *
 * @example:
 * Date(2024, 2, 1) => true
 * Date(2022, 2, 1) => false
 * Date(2020, 2, 1) => true
 */
function isLeapYear( date ) {  
  const year = date.getFullYear();
  if (year % 4 !== 0) return false;
  if (year % 100 !== 0) return true;
  if (year % 400 !== 0) return false;
  return true;
}

module.exports = {
  dateToTimestamp,
  getTime,
  getDayName,
  getNextFriday,
  getCountDaysInMonth,
  getCountDaysOnPeriod,
  isDateInPeriod,
  formatDate,
  getCountWeekendsInMonth,
  getWeekNumberByDate,
  getNextFridayThe13th,
  getQuarter,
  getWorkSchedule,
  isLeapYear,
};
