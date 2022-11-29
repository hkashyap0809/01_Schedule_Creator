import React from 'react';

export const Schedule = (props) => {
  return (
    <>
      <h2 id='your-schedule'>YOUR {props.category} SCHEDULE</h2>
      <table id='table-styling'>
        <tr key={-1}>
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
    </>
  );
};
