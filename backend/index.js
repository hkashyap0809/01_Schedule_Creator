let inputData = {
  startTime: '09:00',
  endTime: '23:30',
  eventDate: '2022-10-27',
  events: [
    {
      description: 'theory of mechanics',
      category: 'academic',
      eventStartTime: '17:00',
      duration: 60,
      afterBreak: 15,
    },
    {
      description: 'Hockey',
      category: 'sports',
      eventStartTime: '23:59',
      duration: 100,
      afterBreak: 0,
    },
    {
      description: 'Seminar by Jay black',
      category: 'seminar',
      eventStartTime: '13:20',
      duration: 60,
      afterBreak: 15,
    },
    {
      description: 'High Tea',
      category: 'others',
      eventStartTime: '16:00',
      duration: 25,
      afterBreak: 15,
    },
    {
      description: 'Cult Night',
      category: 'cultural',
      eventStartTime: '21:00',
      duration: 180,
      afterBreak: 15,
    },
    {
      description: 'Automata Theory',
      category: 'academic',
      eventStartTime: '23:59',
      duration: 60,
      afterBreak: 0,
    },
    {
      description: 'Cricket',
      category: 'sports',
      eventStartTime: '14:00',
      duration: 120,
      afterBreak: 15,
    },
    {
      description: 'Seminar by frank',
      category: 'seminar',
      eventStartTime: '11:00',
      duration: 60,
      afterBreak: 15,
    },
    {
      description: 'Open House Discussion',
      category: 'other',
      eventStartTime: '10:00',
      duration: 90,
      afterBreak: 0,
    },
    {
      description: 'Rangoli',
      category: 'cultural',
      eventStartTime: '09:00',
      duration: 30,
      afterBreak: 15,
    },
    {
      description: 'Design thinking',
      category: 'academic',
      eventStartTime: '10:00',
      duration: 60,
      afterBreak: 15,
    },
    {
      description: 'Pattern thinking',
      category: 'academic',
      eventStartTime: '23:59',
      duration: 80,
      afterBreak: 15,
    },
    {
      description: 'Night Cricket',
      category: 'sports',
      eventStartTime: '10:00',
      duration: 60,
      afterBreak: 15,
    },
    {
      description: 'Tradition dress Ramp Walk',
      category: 'cultural',
      eventStartTime: '15:30',
      duration: 30,
      afterBreak: 15,
    },
    {
      description: 'Seminar on Simple science',
      category: 'seminar',
      eventStartTime: '20:00',
      duration: 60,
      afterBreak: 15,
    },
  ],
};

// GLOBAL VARIABLES
let timeSlot;

// UTILITY FUNCTIONS
// all values are equal or not
const allEqual = (arr, val) => arr.every((v) => v === val);

// event comparator
function compare(a, b) {
  if (a.eventStartTime < b.eventStartTime) {
    return -1;
  }
  if (a.eventStartTime > b.eventStartTime) {
    return 1;
  }

  if (a.eventStartTime == b.eventStartTime) {
    if (a.totalDuration < b.totalDuration) {
      return -1;
    } else {
      return 1;
    }
  }
  return 0;
}

function processInput(inputData) {
  let events = inputData.events;
  if (events.length === 0 || events.length === undefined) return;

  for (let i = 0; i < events.length; i++) {
    events[i]['duration'] = Math.ceil(Number(events[i].duration) / 5) * 5;
    events[i]['afterBreak'] = Math.ceil(Number(events[i].afterBreak) / 5) * 5;

    events[i]['totalDuration'] =
      events[i]['duration'] + events[i]['afterBreak'];
  }
}

function CREATESCHEDULE(inputData) {
  processInput(inputData);
  // console.log(inputData);

  // time calculation
  dayStartTimeHour = parseInt(inputData.startTime.split(':')[0]);
  dayEndTimeHour = parseInt(inputData.endTime.split(':')[0]);

  dayStartTimeMin = parseInt(inputData.startTime.split(':')[1]);
  dayEndTimeMin = parseInt(inputData.endTime.split(':')[1]);

  totaHours = (dayEndTimeHour - dayStartTimeHour) * 60;
  totalMin = dayEndTimeMin - dayStartTimeMin;
  totalTime = totaHours + totalMin;

  slots = totalTime / 5;

  // creating slot array for indexing and mapping purpose
  timeSlot = new Array(slots);
  timeSlot[0] = inputData.startTime;

  for (let i = 1; i < slots; i++) {
    let hour = parseInt(timeSlot[i - 1].split(':')[0]);
    let min = parseInt(timeSlot[i - 1].split(':')[1]);

    min = min + 5;
    if (min == 60) {
      min = 0;
      hour = hour + 1;
    }
    let minStr = '';
    let hourStr = '';
    if (min < 10) {
      minStr = '0' + min.toString();
    } else {
      minStr = min.toString();
    }
    if (hour < 10) {
      hourStr = '0' + hour.toString();
    } else {
      hourStr = hour.toString();
    }
    timeSlot[i] = hourStr + ':' + minStr;
  }

  // for (let i = 0; i < slots; i++) {
  //   console.log(i + ' - ' + timeSlot[i]);
  // }

  academics = [];
  sports = [];
  seminar = [];
  others = [];
  cultural = [];

  // separate events category wise
  for (let i = 0; i < inputData.events.length; i++) {
    if (inputData.events[i].category === 'academic')
      academics.push(inputData.events[i]);
    else if (inputData.events[i].category === 'sports')
      sports.push(inputData.events[i]);
    else if (inputData.events[i].category === 'seminar')
      seminar.push(inputData.events[i]);
    else if (inputData.events[i].category === 'others')
      others.push(inputData.events[i]);
    else if (inputData.events[i].category === 'cultural')
      cultural.push(inputData.events[i]);
  }

  // sorting the events
  if (academics.length) academics.sort(compare);
  if (sports.length) sports.sort(compare);
  if (seminar.length) seminar.sort(compare);
  if (others.length) others.sort(compare);
  if (cultural.length) cultural.sort(compare);

  let finalSchedule = {
    academics: [],
    sports: [],
    seminar: [],
    others: [],
    cultural: [],
  };

  // creating the schedule
  if (academics.length > 0)
    finalSchedule.academics = createEventSchedule(inputData, academics);
  if (sports.length > 0)
    finalSchedule.sports = createEventSchedule(inputData, sports);
  if (seminar.length > 0)
    finalSchedule.seminar = createEventSchedule(inputData, seminar);
  if (others.length > 0)
    finalSchedule.others = createEventSchedule(inputData, others);
  if (cultural.length > 0)
    finalSchedule.cultural = createEventSchedule(inputData, cultural);

  // console.log(finalSchedule);
  return finalSchedule;
}

// MAIN LOGIC FUNCTION
function createEventSchedule(inputData, eventList) {
  if (eventList.length === 0) return;

  // console.log(eventList);
  // eventList.sort(compare);

  // console.log(eventList);
  let scheduleSlots = new Array(slots).fill(-1);

  // lunch break
  // if (inputData.lunchBreak) {
  //   let lunchStartIdx = timeSlot.indexOf(inputData.lunchStartime);
  //   let lunchEndIdx = lunchStartIdx + inputData.durationOfLunchBreak / 5;
  //   for (let i = lunchStartIdx; i < lunchEndIdx; i++) {
  //     scheduleSlots[i] = 100;
  //   }
  // }

  // for (let i = 0; i < slots; i++) {
  //   console.log(timeSlot[i] + ' : ' + scheduleSlots[i]);
  // }

  for (let i = 0; i < eventList.length; i++) {
    let startIdx = timeSlot.indexOf(eventList[i].eventStartTime);
    let occupyIdx = eventList[i].totalDuration / 5;
    let endIdx = startIdx + occupyIdx;
    // console.log('i :' + i);
    if (startIdx != -1) {
      // console.log('startIdx : ' + startIdx);
      // console.log('endIdx : ' + endIdx);
    }
    // console.log('occupyIdx : ' + occupyIdx);
    // console.log('starTime : ' + eventList[i].eventStartTime);
    // console.log('duration : ' + eventList[i].duration);

    if (startIdx == -1) {
      // star Time is not mentioned
      // check for empty slots
      startIdx = scheduleSlots.indexOf(-1);
      endIdx = startIdx + occupyIdx;

      let emptySlot = scheduleSlots.slice(startIdx, endIdx);
      let checkStartPos = endIdx;
      while (!allEqual(emptySlot, -1)) {
        startIdx = scheduleSlots.indexOf(-1, checkStartPos);
        endIdx = startIdx + occupyIdx;
        emptySlot = scheduleSlots.slice(startIdx, endIdx);
        checkStartPos = endIdx;
      }
      // console.log('final start Idx : ' + startIdx);
      // console.log('final end Idx : ' + endIdx);
      for (let j = startIdx; j < endIdx; j++) {
        scheduleSlots[j] = i;
      }
      // console.log('startIdx : ' + startIdx);
      // console.log('endIdx : ' + endIdx);
    } else {
      // start Time is mentioned
      let emptySlot = scheduleSlots.slice(startIdx, startIdx + occupyIdx);
      let checkStartPos = endIdx;
      while (!allEqual(emptySlot, -1)) {
        startIdx = scheduleSlots.indexOf(-1, checkStartPos);
        endIdx = startIdx + occupyIdx;
        emptySlot = scheduleSlots.indexOf(startIdx, endIdx);
      }
      checkStartPos = endIdx;
      // console.log('final start Idx : ' + startIdx);
      // console.log('final end Idx : ' + endIdx);
      for (let j = startIdx; j < startIdx + occupyIdx; j++) {
        scheduleSlots[j] = i;
      }
    }
  }

  // for (let i = 0; i < slots; i++) {
  //   console.log('i : ' + i + '|  ' + timeSlot[i] + ' : ' + scheduleSlots[i]);
  // }

  scheduleArr = [];
  let idx = 0;
  for (let i = 0; i < slots; i++) {
    if (scheduleSlots[idx] != scheduleSlots[i]) {
      arr = [];
      arr.push(scheduleSlots[idx]);
      arr.push(timeSlot[idx]);
      arr.push(timeSlot[i]);
      scheduleArr.push(arr);
      idx = i;
    }
  }
  // console.log(scheduleArr);
  // console.log(scheduleArr.length);

  let finalSchedule = [];
  for (let i = 0; i < scheduleArr.length; i++) {
    if (scheduleArr[i][0] == -1 || scheduleArr[i][0] == 100) continue;
    let newSchedule = {};
    newSchedule.startTime = scheduleArr[i][1];
    newSchedule.endTime = scheduleArr[i][2];
    newSchedule.description = eventList[scheduleArr[i][0]].description;
    newSchedule.category = eventList[scheduleArr[i][0]].category;
    newSchedule.duration = eventList[scheduleArr[i][0]].duration;
    newSchedule.afterBreak = eventList[scheduleArr[i][0]].afterBreak;
    newSchedule.totalDuration = eventList[scheduleArr[i][0]].totalDuration;
    finalSchedule.push(newSchedule);
  }

  let finalScheduleWithBreak = [];
  for (let i = 0; i < finalSchedule.length; i++) {
    if (finalSchedule[i].afterBreak === 0) {
      finalScheduleWithBreak.push(finalSchedule[i]);
    } else {
      let newEvent = {};
      let newBreak = {};

      newEvent.startTime = finalSchedule[i].startTime;
      let newEndTimeIndex =
        timeSlot.indexOf(finalSchedule[i].endTime) -
        finalSchedule[i].afterBreak / 5;

      newEvent.endTime = timeSlot[newEndTimeIndex];
      newEvent.description = finalSchedule[i].description;
      newEvent.duration = finalSchedule[i].duration;
      newEvent.category = finalSchedule[i].category;

      newBreak.startTime = timeSlot[newEndTimeIndex];
      newBreak.endTime = finalSchedule[i].endTime;
      newBreak.description = finalSchedule[i].description + ' -  break';
      newBreak.duration = finalSchedule[i].afterBreak;
      newBreak.category = 'break';

      finalScheduleWithBreak.push(newEvent);
      finalScheduleWithBreak.push(newBreak);
    }
  }

  finalScheduleWithBreak.sort(compare);
  return finalScheduleWithBreak;
}

function giveStartDayHour(inputData) {
  return Number(inputData.startTime.split(':')[0]);
}

function giveEndDayHour(inputData) {
  return Number(inputData.endTime.split(':')[0]);
}

function generateForCalender(inputData, eventList) {
  let eventDate = inputData.eventDate;
  let startTime = inputData.startTime;
  let endTime = inputData.endTime;
  // console.log(eventDate);
  // console.log(startTime);
  // console.log(endTime);

  const eventCalenderData = [];

  for (let i = 0; i < eventList.length; i++) {
    let calenderschedule = {};
    calenderschedule.startDate = eventDate + 'T' + eventList[i].startTime;
    calenderschedule.endDate = eventDate + 'T' + eventList[i].endTime;
    calenderschedule.title = eventList[i].description;

    eventCalenderData.push(calenderschedule);
  }
  // console.log(eventCalenderData);
  return eventCalenderData;
}

function giveEventDate(inputData) {
  return inputData.eventDate;
}

let schedule = CREATESCHEDULE(inputData);
let startDayHour = giveStartDayHour(inputData);
let endDayHour = giveEndDayHour(inputData);

let academicsCalender = generateForCalender(inputData, schedule.academics);
let sportsCalender = generateForCalender(inputData, schedule.sports);
let culturalCalender = generateForCalender(inputData, schedule.cultural);
let othersCalender = generateForCalender(inputData, schedule.others);
let seminarCalender = generateForCalender(inputData, schedule.seminar);

console.log(startDayHour);
console.log(endDayHour);
console.log(academicsCalender);
console.log(sportsCalender);
console.log(culturalCalender);
console.log(othersCalender);
console.log(seminarCalender);
