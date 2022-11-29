import React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

export const Schedule = (props) => {
  return (
    <>
      <h2>YOUR {props.category} SCHEDULE</h2>
      <table>
        <tr>
          <th>Event No.</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Description </th>
          <th>Duration</th>
          <th>Category</th>
        </tr>
        {props.events.map((singleEvent, index) => (
          <>
            <tr key={index}>
              <th>{index + 1}</th>
              <th>{singleEvent.startTime}</th>
              <th>{singleEvent.endTime}</th>
              <th>{singleEvent.description}</th>
              <th>{singleEvent.duration}</th>
              <th>{singleEvent.category}</th>
            </tr>
          </>
        ))}
      </table>
      {/* <ScheduleCalender /> */}
    </>
  );
};
