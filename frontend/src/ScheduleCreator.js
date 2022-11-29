import React from 'react';
import { useContext } from 'react';
import { EventContext } from './App';
import { Schedule } from './Schedule';

// GLOBAL VARIABLES
let timeSlot;
let slots;

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

  if (a.eventStartTime === b.eventStartTime) {
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
  if (events.length === 0) return;
  for (let i = 0; i < events.length; i++) {
    events[i]['duration'] = Math.ceil(Number(events[i].duration) / 5) * 5;
    events[i]['afterBreak'] = Math.ceil(Number(events[i].afterBreak) / 5) * 5;

    events[i]['totalDuration'] =
      events[i]['duration'] + events[i]['afterBreak'];
  }
}

function createEventSchedule(inputData, eventList) {
  if (eventList.length === 0) return;

  eventList.sort(compare);
  let scheduleSlots = new Array(slots).fill(-1);

  // // lunch break
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
    if (startIdx !== -1) {
      // console.log('startIdx : ' + startIdx);
      // console.log('endIdx : ' + endIdx);
    }
    // console.log('occupyIdx : ' + occupyIdx);
    // console.log('starTime : ' + eventList[i].eventStartTime);
    // console.log('duration : ' + eventList[i].duration);

    if (startIdx === -1) {
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

  let scheduleArr = [];
  let idx = 0;
  for (let i = 0; i < slots; i++) {
    if (scheduleSlots[idx] !== scheduleSlots[i]) {
      let arr = [];
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
    if (scheduleArr[i][0] === -1 || scheduleArr[i][0] === 100) continue;
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
      newBreak.description = finalSchedule[i].description + ' - break';
      newBreak.duration = finalSchedule[i].afterBreak;
      newBreak.category = 'break';

      finalScheduleWithBreak.push(newEvent);
      finalScheduleWithBreak.push(newBreak);
    }
  }

  // console.log(finalSchedule);
  finalScheduleWithBreak.sort(compare);
  return finalScheduleWithBreak;
}

function CREATESCHEDULE(inputData) {
  processInput(inputData);

  // time calculation
  let dayStartTimeHour = parseInt(inputData.startTime.split(':')[0]);
  let dayEndTimeHour = parseInt(inputData.endTime.split(':')[0]);

  let dayStartTimeMin = parseInt(inputData.startTime.split(':')[1]);
  let dayEndTimeMin = parseInt(inputData.endTime.split(':')[1]);

  let totaHours = (dayEndTimeHour - dayStartTimeHour) * 60;
  let totalMin = dayEndTimeMin - dayStartTimeMin;
  let totalTime = totaHours + totalMin;

  slots = totalTime / 5;

  // creating slot array for indexing and mapping purpose
  timeSlot = new Array(slots);
  timeSlot[0] = inputData.startTime;

  for (let i = 1; i < slots; i++) {
    let hour = parseInt(timeSlot[i - 1].split(':')[0]);
    let min = parseInt(timeSlot[i - 1].split(':')[1]);

    min = min + 5;
    if (min === 60) {
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

  let academics = [];
  let sports = [];
  let seminar = [];
  let others = [];
  let cultural = [];

  // separate events category wise
  for (let i = 0; i < inputData.events.length; i++) {
    if (inputData.events[i].category === 'academics')
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
    finalSchedule.cultural = createEventSchedule(cultural);

  // console.log(finalSchedule);
  return finalSchedule;
}

export const ScheduleCreator = () => {
  const eventDetails = useContext(EventContext);
  let schedule = CREATESCHEDULE(eventDetails);

  return (
    <>
      {schedule.academics.length > 0 && (
        <Schedule category='ACADEMIC' events={schedule.academics} />
      )}
      {schedule.sports.length > 0 && (
        <Schedule category='SPORTS' events={schedule.sports} />
      )}

      {schedule.cultural.length > 0 && (
        <Schedule category='CULTURAL' events={schedule.cultural} />
      )}

      {schedule.seminar.length > 0 && (
        <Schedule category='SEMINAR' events={schedule.seminar} />
      )}

      {schedule.others.length > 0 && (
        <Schedule category='OTHERS' events={schedule.others} />
      )}
    </>
  );
  // return (
  //   <>
  //     <h2>YOUR SCHEDULE</h2>
  //     <table>
  //       <tr>
  //         <th>Event No.</th>
  //         <th>Start Time</th>
  //         <th>End Time</th>
  //         <th>Description </th>
  //         <th>Duration</th>
  //         <th>Category</th>
  //       </tr>
  //       {schedule.academic.map((singleEvent, index) => (
  //         <>
  //           <tr>
  //             <th>{index + 1}</th>
  //             <th>{singleEvent.startTime}</th>
  //             <th>{singleEvent.endTime}</th>
  //             <th>{singleEvent.description}</th>
  //             <th>{singleEvent.duration}</th>
  //             <th>{singleEvent.category}</th>
  //           </tr>
  //         </>
  //       ))}
  //     </table>
  //     {/* {JSON.stringify(schedule)} */}
  //   </>
  // );
};