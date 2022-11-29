import * as React from 'react';
import Paper from '@mui/material/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  DayView,
  Appointments,
} from '@devexpress/dx-react-scheduler-material-ui';

export default (props) => (
  <Paper id='calender'>
    <Scheduler data={props.data}>
      <ViewState currentDate={props.currentDate} />
      <DayView
        startDayHour={props.startDayHour}
        endDayHour={props.endDayHour}
      />
      <Appointments />
    </Scheduler>
  </Paper>
);
